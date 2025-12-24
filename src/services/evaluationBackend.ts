/**
 * Evaluation Backend Service
 * Handles communication with the Wix backend function for AI-powered evaluation
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
 * Call the backend evaluation function
 * This function communicates with the Wix backend to get AI-powered evaluation
 */
export async function evaluateIdea(request: EvaluationRequest): Promise<EvaluationResponse> {
  try {
    console.log('Sending evaluation request:', request);
    
    const response = await fetch('/api/evaluate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    console.log('Response status:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Response error:', errorText);
      throw new Error(`Evaluation failed: ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Evaluation response:', data);
    return data;
  } catch (error) {
    console.error('Evaluation error:', error);
    throw error;
  }
}
