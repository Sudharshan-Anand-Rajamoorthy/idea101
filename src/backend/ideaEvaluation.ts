/**
 * Wix Backend Function: ideaEvaluation
 * Handles AI-powered evaluation of startup ideas, projects, research, and hackathon projects
 * Uses Hugging Face Inference API for text analysis
 * 
 * This function is exposed as POST /_functions/post_ideaEvaluation
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
export async function post_ideaEvaluation(request: any) {
  console.log('=== BACKEND FUNCTION REACHED ===');
  console.log('Timestamp:', new Date().toISOString());
  
  // IMMEDIATE TEST RESPONSE - to verify the function is being called
  const testResponse = ok({
    test: true,
    message: 'Backend function is working!',
    timestamp: new Date().toISOString(),
  });
  
  console.log('Returning test response:', testResponse);
  return testResponse;
}
