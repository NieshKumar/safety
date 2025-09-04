// src/app/api/chat/route.js
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export async function POST(request) {
  try {
    const { message, language = 'English', location = 'Paris' } = await request.json();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
You are a helpful travel assistant for tourists. You specialize in:
- Local food recommendations 
- Safety guidance
- Cultural tips
- Emergency information
- Language barriers help

Current location: ${location}
Response language: ${language}

User question: ${message}

Please respond in ${language} and provide practical, safety-focused advice for tourists.
Keep responses concise but helpful (max 200 words).
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return Response.json({ reply: text });

  } catch (error) {
    console.error('Gemini API error:', error);
    return Response.json({ 
      reply: "I'm having trouble connecting right now. Please try again later." 
    }, { status: 500 });
  }
}
