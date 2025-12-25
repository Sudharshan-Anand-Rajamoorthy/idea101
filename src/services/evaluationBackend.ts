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
    console.log('Sending evaluation request to Wix backend:', request);
    
    // Use the Wix backend function endpoint
    const response = await fetch('/_functions/evaluate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    console.log('Response status:', response.status, response.statusText);
    console.log('Response content-type:', response.headers.get('content-type'));

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const errorText = await response.text();
      console.error('Non-JSON response received:', errorText);
      throw new Error(`Server returned non-JSON response (${response.status}): ${errorText.substring(0, 200)}`);
    }

    if (!response.ok) {
      try {
        const errorData = await response.json();
        console.error('Response error:', errorData);
        throw new Error(errorData.error || `Evaluation failed: ${response.statusText}`);
      } catch (parseError) {
        const errorText = await response.text();
        console.error('Response error (non-JSON):', errorText);
        throw new Error(`Evaluation failed: ${response.statusText} - ${errorText.substring(0, 200)}`);
      }
    }

    const data = await response.json();
    console.log('Evaluation response:', data);
    
    // Validate response structure
    if (!data.body) {
      throw new Error('Invalid response structure from server');
    }
    
    // Parse the body if it's a string (Wix backend functions return wrapped responses)
    const responseBody = typeof data.body === 'string' ? JSON.parse(data.body) : data.body;
    
    if (!responseBody.scores || !responseBody.summary || !Array.isArray(responseBody.strengths) || !Array.isArray(responseBody.weaknesses) || !Array.isArray(responseBody.recommendations)) {
      throw new Error('Invalid response structure from server');
    }
    
    return responseBody;
  } catch (error) {
    console.error('Evaluation error:', error);
    throw error;
  }
}
