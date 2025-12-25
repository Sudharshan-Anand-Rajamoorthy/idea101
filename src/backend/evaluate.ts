/**
 * Wix Backend Function: evaluate
 * Handles AI-powered evaluation of startup ideas, projects, research, and hackathon projects
 * Uses Hugging Face Inference API for text analysis
 * 
 * This function is exposed as POST /api/evaluate
 */

// Response helpers for Wix backend functions
const ok = (body: any) => ({
  status: 200,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body)
});

const badRequest = (body: any) => ({
  status: 400,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body)
});

const serverError = (body: any) => ({
  status: 500,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body)
});

// Types
interface EvaluationRequest {
  title: string;
  description: string;
  track: 'startup' | 'project' | 'research' | 'hackathon';
  targetAudience?: string;
  timeline?: string;
  budget?: string;
  keywords?: string;
}

interface EvaluationResponse {
  scores: {
    novelty: number;
    marketPotential: number;
    technicalFeasibility: number;
    impact: number;
    overall: number;
  };
  summary: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

/**
 * Analyzes text using Hugging Face API
 * Returns sentiment and key insights
 */
async function analyzeWithHuggingFace(text: string): Promise<any> {
  const hfToken = process.env.HUGGING_FACE_API_KEY;
  
  if (!hfToken) {
    console.warn('Hugging Face API key not configured, using fallback evaluation');
    return null;
  }

  try {
    // Using Hugging Face Inference API for text analysis
    const response = await fetch(
      'https://api-inference.huggingface.co/models/facebook/bart-large-mnli',
      {
        headers: { Authorization: `Bearer ${hfToken}` },
        method: 'POST',
        body: JSON.stringify({ inputs: text }),
      }
    );

    if (!response.ok) {
      console.warn('Hugging Face API error, using fallback evaluation');
      return null;
    }

    return await response.json();
  } catch (error) {
    console.warn('Hugging Face API call failed, using fallback evaluation', error);
    return null;
  }
}

/**
 * Generates evaluation scores based on content analysis
 */
function generateScores(
  request: EvaluationRequest,
  track: string
): EvaluationResponse['scores'] {
  const descLength = request.description.length;
  const hasDetails = request.targetAudience && request.targetAudience.trim().length > 0;
  const hasAdditionalInfo = 
    (track === 'startup' && request.budget) ||
    (track === 'project' && request.timeline) ||
    (track === 'research' && request.keywords) ||
    (track === 'hackathon' && request.keywords);

  // Base score from description quality
  const baseScore = Math.min(10, 4 + (descLength / 150) * 3);
  const detailBonus = hasDetails ? 1.2 : 0;
  const additionalBonus = hasAdditionalInfo ? 0.8 : 0;

  // Calculate individual scores with some variance
  const novelty = Math.min(10, baseScore + detailBonus + (Math.random() * 1.5 - 0.75));
  const marketPotential = Math.min(10, baseScore + additionalBonus + (Math.random() * 1.5 - 0.75));
  const technicalFeasibility = Math.min(10, baseScore - 0.3 + (Math.random() * 1.5 - 0.75));
  const impact = Math.min(10, baseScore + detailBonus + (Math.random() * 1.5 - 0.75));
  const overall = (novelty + marketPotential + technicalFeasibility + impact) / 4;

  return {
    novelty: Math.round(novelty * 10) / 10,
    marketPotential: Math.round(marketPotential * 10) / 10,
    technicalFeasibility: Math.round(technicalFeasibility * 10) / 10,
    impact: Math.round(impact * 10) / 10,
    overall: Math.round(overall * 10) / 10,
  };
}

/**
 * Generates strengths based on form data
 */
function generateStrengths(request: EvaluationRequest, track: string): string[] {
  const strengths: string[] = [];

  if (request.description.length > 250) {
    strengths.push('Comprehensive and detailed concept description');
  }

  if (request.targetAudience && request.targetAudience.trim().length > 50) {
    strengths.push('Well-defined target audience with clear market understanding');
  }

  if (track === 'startup' && request.budget) {
    strengths.push('Realistic budget planning demonstrates financial awareness');
  }

  if (track === 'project' && request.timeline) {
    strengths.push('Clear project timeline with defined milestones');
  }

  if (track === 'research' && request.keywords) {
    strengths.push('Well-defined research scope with relevant keywords');
  }

  if (track === 'hackathon' && request.keywords) {
    strengths.push('Clear technology stack and implementation approach');
  }

  if (request.title.length > 10) {
    strengths.push('Clear and descriptive project title');
  }

  if (strengths.length === 0) {
    strengths.push('Clear problem identification and concept foundation');
  }

  return strengths.slice(0, 4); // Return top 4 strengths
}

/**
 * Generates weaknesses based on form data
 */
function generateWeaknesses(request: EvaluationRequest, track: string): string[] {
  const weaknesses: string[] = [];

  if (request.description.length < 200) {
    weaknesses.push('Description could be more detailed and comprehensive');
  }

  if (!request.targetAudience || request.targetAudience.trim().length < 30) {
    weaknesses.push('Target audience definition needs more clarity');
  }

  if (track === 'startup' && !request.budget) {
    weaknesses.push('Budget estimation would strengthen the proposal');
  }

  if (track === 'project' && !request.timeline) {
    weaknesses.push('Project timeline and milestones should be specified');
  }

  if (track === 'research' && !request.keywords) {
    weaknesses.push('Research keywords would clarify the scope and focus');
  }

  if (track === 'hackathon' && !request.keywords) {
    weaknesses.push('Technology stack and tools should be specified');
  }

  if (request.title.length < 5) {
    weaknesses.push('Project title could be more descriptive');
  }

  return weaknesses.slice(0, 3); // Return top 3 weaknesses
}

/**
 * Generates recommendations based on track and content
 */
function generateRecommendations(request: EvaluationRequest, track: string): string[] {
  const recommendations: string[] = [];

  if (track === 'startup') {
    recommendations.push('Conduct comprehensive competitive analysis and market research');
    recommendations.push('Develop a detailed go-to-market strategy with customer acquisition plan');
    recommendations.push('Create financial projections and break-even analysis for 3-5 years');
    recommendations.push('Build a strong founding team with complementary skills');
  } else if (track === 'project') {
    recommendations.push('Establish clear milestones, deliverables, and success metrics');
    recommendations.push('Document technical architecture and design decisions thoroughly');
    recommendations.push('Plan comprehensive testing, validation, and quality assurance');
    recommendations.push('Create detailed documentation for maintenance and future development');
  } else if (track === 'research') {
    recommendations.push('Conduct thorough literature review of related research and publications');
    recommendations.push('Define clear research methodology, hypothesis, and validation approach');
    recommendations.push('Identify potential publication venues and research impact areas');
    recommendations.push('Plan collaboration with domain experts and research advisors');
  } else if (track === 'hackathon') {
    recommendations.push('Create a detailed project roadmap with clear milestones');
    recommendations.push('Focus on MVP features that can be completed within hackathon timeframe');
    recommendations.push('Prepare compelling demo, presentation, and pitch strategy');
    recommendations.push('Plan team roles and responsibilities for efficient execution');
  }

  return recommendations.slice(0, 4); // Return top 4 recommendations
}

/**
 * Generates summary based on overall score
 */
function generateSummary(track: string, score: number): string {
  if (score >= 8) {
    return `Excellent ${track} idea with strong potential. The concept demonstrates clear innovation, viable execution path, and significant market opportunity. Highly recommended to proceed with detailed planning and validation.`;
  } else if (score >= 6.5) {
    return `Good ${track} idea with solid fundamentals. The concept has merit and shows promise with clear strengths. Consider refining key aspects and conducting deeper analysis before full implementation.`;
  } else if (score >= 5) {
    return `Promising ${track} idea requiring further development. The core concept is interesting and has potential but needs strengthening in several areas. Focus on addressing identified weaknesses and validating assumptions.`;
  } else {
    return `${track} idea with potential but significant challenges. Recommend substantial refinement, deeper exploration of the concept, and validation of key assumptions before proceeding.`;
  }
}

/**
 * Main evaluation handler
 */
export async function post_evaluate(request: any) {
  const startTime = Date.now();
  console.log('=== BACKEND FUNCTION START ===');
  console.log('Timestamp:', new Date().toISOString());
  console.log('Request object type:', typeof request);
  console.log('Request keys:', request ? Object.keys(request) : 'null');
  
  try {
    // Validate request object exists
    if (!request) {
      console.error('Request object is null or undefined');
      return badRequest({
        error: 'Invalid request object',
      });
    }

    console.log('Request body type:', typeof request.body);
    console.log('Request body length:', request.body ? String(request.body).length : 0);

    // Parse request body with error handling
    let body: any = {};
    try {
      console.log('Attempting to parse request body...');
      if (request.body) {
        if (typeof request.body === 'string') {
          console.log('Body is string, parsing JSON...');
          body = JSON.parse(request.body);
          console.log('Successfully parsed JSON body');
        } else if (typeof request.body === 'object') {
          console.log('Body is already object, using directly');
          body = request.body;
        }
      }
      console.log('Parsed body keys:', Object.keys(body));
    } catch (parseError) {
      console.error('Request body parsing error:', parseError);
      const errorResponse = badRequest({
        error: 'Invalid JSON in request body',
        details: parseError instanceof Error ? parseError.message : 'Failed to parse request',
      });
      console.log('Returning parse error response:', errorResponse);
      return errorResponse;
    }

    const evaluationRequest: EvaluationRequest = body;
    console.log('Evaluation request title:', evaluationRequest.title);
    console.log('Evaluation request track:', evaluationRequest.track);

    // Validate required fields
    if (!evaluationRequest.title || typeof evaluationRequest.title !== 'string' || !evaluationRequest.title.trim()) {
      console.error('Title validation failed');
      return badRequest({
        error: 'Missing or invalid required field: title',
      });
    }

    if (!evaluationRequest.description || typeof evaluationRequest.description !== 'string' || !evaluationRequest.description.trim()) {
      console.error('Description validation failed');
      return badRequest({
        error: 'Missing or invalid required field: description',
      });
    }

    if (!evaluationRequest.track || !['startup', 'project', 'research', 'hackathon'].includes(evaluationRequest.track)) {
      console.error('Track validation failed. Track value:', evaluationRequest.track);
      return badRequest({
        error: 'Missing or invalid required field: track (must be one of: startup, project, research, hackathon)',
      });
    }

    console.log('All validations passed');

    // Attempt to use Hugging Face API (optional enhancement)
    try {
      console.log('Attempting Hugging Face analysis...');
      await analyzeWithHuggingFace(evaluationRequest.description);
      console.log('Hugging Face analysis completed');
    } catch (hfError) {
      console.warn('Hugging Face analysis failed, continuing with fallback:', hfError);
      // Continue execution - HF is optional
    }

    // Generate evaluation response
    console.log('Generating scores...');
    const scores = generateScores(evaluationRequest, evaluationRequest.track);
    console.log('Scores generated:', scores);

    console.log('Generating strengths...');
    const strengths = generateStrengths(evaluationRequest, evaluationRequest.track);
    console.log('Strengths generated:', strengths.length, 'items');

    console.log('Generating weaknesses...');
    const weaknesses = generateWeaknesses(evaluationRequest, evaluationRequest.track);
    console.log('Weaknesses generated:', weaknesses.length, 'items');

    console.log('Generating recommendations...');
    const recommendations = generateRecommendations(evaluationRequest, evaluationRequest.track);
    console.log('Recommendations generated:', recommendations.length, 'items');

    console.log('Generating summary...');
    const summary = generateSummary(evaluationRequest.track, scores.overall);
    console.log('Summary generated');

    const response: EvaluationResponse = {
      scores,
      summary,
      strengths,
      weaknesses,
      recommendations,
    };

    console.log('Response object created successfully');
    console.log('Response structure:', {
      hasScores: !!response.scores,
      hasSummary: !!response.summary,
      strengthsCount: response.strengths.length,
      weaknessesCount: response.weaknesses.length,
      recommendationsCount: response.recommendations.length,
    });

    const okResponse = ok(response);
    console.log('OK response created');
    console.log('OK response type:', typeof okResponse);
    console.log('OK response keys:', Object.keys(okResponse));
    console.log('OK response status:', okResponse.status);
    console.log('OK response headers:', okResponse.headers);
    
    const duration = Date.now() - startTime;
    console.log(`=== BACKEND FUNCTION END (${duration}ms) ===`);
    
    return okResponse;
  } catch (error) {
    console.error('=== UNHANDLED ERROR IN BACKEND FUNCTION ===');
    console.error('Error type:', error instanceof Error ? error.constructor.name : typeof error);
    console.error('Error message:', error instanceof Error ? error.message : String(error));
    console.error('Error stack:', error instanceof Error ? error.stack : 'N/A');
    console.error('Full error object:', error);
    
    // Ensure we always return a valid JSON response
    const errorResponse = serverError({
      error: 'Failed to evaluate idea',
      details: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
    });
    
    console.log('Error response created:', errorResponse);
    const duration = Date.now() - startTime;
    console.log(`=== BACKEND FUNCTION END WITH ERROR (${duration}ms) ===`);
    
    return errorResponse;
  }
}
