/**
 * Mock Evaluation Backend Service
 * Provides simulated AI-powered evaluation without requiring a backend server
 * Perfect for prototyping and proof-of-concept development
 */

export interface EvaluationRequest {
  title: string;
  description: string;
  track: 'startup' | 'project' | 'research' | 'hackathon';
  targetAudience?: string;
  timeline?: string;
  budget?: string;
  keywords?: string;
}

export interface EvaluationResponse {
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
 * Generates a score based on content quality and length
 */
function generateScore(
  baseScore: number,
  contentLength: number,
  hasDetails: boolean,
  hasAdditionalInfo: boolean
): number {
  let score = baseScore;
  
  // Bonus for detailed content
  if (contentLength > 250) score += 1.5;
  else if (contentLength > 150) score += 0.8;
  
  // Bonus for additional details
  if (hasDetails) score += 1.2;
  if (hasAdditionalInfo) score += 0.8;
  
  // Add slight randomness for realism
  score += (Math.random() * 1.5 - 0.75);
  
  return Math.min(10, Math.max(1, Math.round(score * 10) / 10));
}

/**
 * Generates track-specific strengths
 */
function generateStrengths(request: EvaluationRequest, track: string): string[] {
  const strengths: string[] = [];
  const descLength = request.description.length;
  const hasDetails = request.targetAudience && request.targetAudience.trim().length > 50;

  if (descLength > 250) {
    strengths.push('Comprehensive and detailed concept description');
  }

  if (hasDetails) {
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

  return strengths.slice(0, 4);
}

/**
 * Generates track-specific weaknesses
 */
function generateWeaknesses(request: EvaluationRequest, track: string): string[] {
  const weaknesses: string[] = [];
  const descLength = request.description.length;
  const hasDetails = request.targetAudience && request.targetAudience.trim().length > 30;

  if (descLength < 200) {
    weaknesses.push('Description could be more detailed and comprehensive');
  }

  if (!hasDetails) {
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

  return weaknesses.slice(0, 3);
}

/**
 * Generates track-specific recommendations
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

  return recommendations.slice(0, 4);
}

/**
 * Generates a summary based on overall score
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
 * Mock evaluation function - simulates backend processing
 * Returns realistic evaluation results without requiring a server
 */
export async function evaluateIdea(request: EvaluationRequest): Promise<EvaluationResponse> {
  const startTime = Date.now();
  console.log('=== MOCK EVALUATION START ===');
  console.log('Processing evaluation for:', request.title);
  console.log('Track:', request.track);

  // Simulate network delay (500-1500ms for realistic UX)
  const delay = Math.random() * 1000 + 500;
  await new Promise((resolve) => setTimeout(resolve, delay));

  try {
    const descLength = request.description.length;
    const hasDetails = request.targetAudience && request.targetAudience.trim().length > 50;
    const hasAdditionalInfo =
      (request.track === 'startup' && !!request.budget) ||
      (request.track === 'project' && !!request.timeline) ||
      (request.track === 'research' && !!request.keywords) ||
      (request.track === 'hackathon' && !!request.keywords);

    // Generate scores based on content quality
    const novelty = generateScore(5.5, descLength, hasDetails, hasAdditionalInfo);
    const marketPotential = generateScore(5.2, descLength, hasDetails, hasAdditionalInfo);
    const technicalFeasibility = generateScore(5.8, descLength, hasDetails, hasAdditionalInfo);
    const impact = generateScore(5.4, descLength, hasDetails, hasAdditionalInfo);
    const overall = Math.round((novelty + marketPotential + technicalFeasibility + impact) / 4 * 10) / 10;

    const scores = {
      novelty,
      marketPotential,
      technicalFeasibility,
      impact,
      overall,
    };

    const strengths = generateStrengths(request, request.track);
    const weaknesses = generateWeaknesses(request, request.track);
    const recommendations = generateRecommendations(request, request.track);
    const summary = generateSummary(request.track, overall);

    const response: EvaluationResponse = {
      scores,
      summary,
      strengths,
      weaknesses,
      recommendations,
    };

    const duration = Date.now() - startTime;
    console.log('=== MOCK EVALUATION COMPLETE ===');
    console.log(`Duration: ${duration}ms`);
    console.log('Overall Score:', overall);

    return response;
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error('=== MOCK EVALUATION ERROR ===');
    console.error(`Duration: ${duration}ms`);
    console.error('Error:', error);
    throw new Error('Failed to evaluate idea. Please try again.');
  }
}
