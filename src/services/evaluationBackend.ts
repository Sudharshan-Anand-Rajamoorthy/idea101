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
  const startTime = Date.now();
  console.log('=== FRONTEND SERVICE START ===');
  console.log('Sending evaluation request to Wix backend');
  console.log('Request:', {
    title: request.title,
    descriptionLength: request.description.length,
    track: request.track,
    hasTargetAudience: !!request.targetAudience,
    hasTimeline: !!request.timeline,
    hasBudget: !!request.budget,
    hasKeywords: !!request.keywords,
  });
  
  try {
    console.log('Fetching from /_functions/post_evaluate...');
    
    // Use the Wix backend function endpoint (matches post_evaluate function name)
    const response = await fetch('/_functions/post_evaluate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    console.log('Response received');
    console.log('Response status:', response.status, response.statusText);
    console.log('Response headers:', {
      contentType: response.headers.get('content-type'),
      contentLength: response.headers.get('content-length'),
    });

    // Get the raw response text first for debugging
    const responseText = await response.text();
    console.log('Response text length:', responseText.length);
    console.log('Response text (first 500 chars):', responseText.substring(0, 500));
    
    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Non-JSON response received');
      console.error('Content-Type:', contentType);
      console.error('Response text:', responseText.substring(0, 500));
      throw new Error(`Server returned non-JSON response (${response.status}): ${responseText.substring(0, 200)}`);
    }

    if (!response.ok) {
      console.error('Response not OK');
      try {
        const errorData = JSON.parse(responseText);
        console.error('Response error data:', errorData);
        throw new Error(errorData.error || `Evaluation failed: ${response.statusText}`);
      } catch (parseError) {
        console.error('Failed to parse error response as JSON');
        throw new Error(`Evaluation failed: ${response.statusText} - ${responseText.substring(0, 200)}`);
      }
    }

    console.log('Parsing response as JSON...');
    let data;
    try {
      data = JSON.parse(responseText);
      console.log('Successfully parsed response');
      console.log('Response object keys:', Object.keys(data));
      console.log('Response object structure:', {
        hasBody: 'body' in data,
        hasStatus: 'status' in data,
        hasHeaders: 'headers' in data,
        bodyType: typeof data.body,
      });
    } catch (parseError) {
      console.error('Failed to parse response as JSON:', parseError);
      throw new Error(`Invalid JSON response: ${parseError instanceof Error ? parseError.message : String(parseError)}`);
    }
    
    // Validate response structure
    console.log('Validating response structure...');
    if (!data.body) {
      console.error('Response missing body property');
      console.error('Response keys:', Object.keys(data));
      throw new Error('Invalid response structure from server - missing body');
    }
    
    console.log('Extracting response body...');
    // Parse the body if it's a string (Wix backend functions return wrapped responses)
    let responseBody;
    if (typeof data.body === 'string') {
      console.log('Body is string, parsing JSON...');
      try {
        responseBody = JSON.parse(data.body);
        console.log('Successfully parsed body JSON');
      } catch (parseError) {
        console.error('Failed to parse body as JSON:', parseError);
        throw new Error(`Invalid JSON in response body: ${parseError instanceof Error ? parseError.message : String(parseError)}`);
      }
    } else if (typeof data.body === 'object') {
      console.log('Body is already object');
      responseBody = data.body;
    } else {
      console.error('Body has unexpected type:', typeof data.body);
      throw new Error(`Response body has unexpected type: ${typeof data.body}`);
    }
    
    console.log('Validating response body structure...');
    console.log('Response body keys:', Object.keys(responseBody));
    console.log('Response body structure:', {
      hasScores: !!responseBody.scores,
      hasSummary: !!responseBody.summary,
      hasStrengths: Array.isArray(responseBody.strengths),
      hasWeaknesses: Array.isArray(responseBody.weaknesses),
      hasRecommendations: Array.isArray(responseBody.recommendations),
    });
    
    if (!responseBody.scores || !responseBody.summary || !Array.isArray(responseBody.strengths) || !Array.isArray(responseBody.weaknesses) || !Array.isArray(responseBody.recommendations)) {
      console.error('Response body validation failed');
      throw new Error('Invalid response structure from server');
    }
    
    console.log('Response validation successful');
    const duration = Date.now() - startTime;
    console.log(`=== FRONTEND SERVICE END (${duration}ms) ===`);
    
    return responseBody;
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error('=== FRONTEND SERVICE ERROR (${duration}ms) ===');
    console.error('Error type:', error instanceof Error ? error.constructor.name : typeof error);
    console.error('Error message:', error instanceof Error ? error.message : String(error));
    console.error('Error stack:', error instanceof Error ? error.stack : 'N/A');
    console.error('Full error:', error);
    throw error;
  }
}
