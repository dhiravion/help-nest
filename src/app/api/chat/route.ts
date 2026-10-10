import { createOllama } from 'ollama-ai-provider';
import { streamText } from 'ai';

const ollama = createOllama({
  baseURL: 'http://127.0.0.1:11434/api',
});

export async function OPTIONS(req: Request) {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST(req: Request) {

  try {
    const { messages, model } = await req.json();
    
    const selectedModel = model || 'gemma4';

    const result = await streamText({
      model: ollama(selectedModel),
      system: "You are a helpful IT support assistant named HelpNest. Help the user diagnose and fix their technical issues. Be friendly, concise, and explain things clearly.",
      messages,
    });

    const response = result.toDataStreamResponse();
    // Add CORS headers to the stream response
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
  } catch (error) {
    console.error('Error generating chat response:', error);
    return new Response(JSON.stringify({ error: 'Failed to process request.' }), { 
      status: 500, 
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      } 
    });
  }
}

