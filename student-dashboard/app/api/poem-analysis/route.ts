import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize the OpenAI client with the API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { poem, title, author } = await request.json();
    
    if (!poem || typeof poem !== 'string') {
      return NextResponse.json({ error: 'Invalid request. Poem text is required.' }, { status: 400 });
    }
    
    // Call OpenAI to analyze the poem
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `
            You are an AP Literature poetry analysis assistant. Analyze the provided poem and extract the following elements:
            - Title and Author analysis (if provided)
            - Tone and mood
            - Poetic devices (metaphor, simile, alliteration, etc.) with examples from the text
            - Themes and meaning
            - Structure and form analysis
            - AP Literature-level insights
            
            Format your response as a JSON object matching this structure:
            {
              "title_analysis": "string",
              "tone": {
                "primary": "string",
                "secondary": ["string", "string"],
                "explanation": "string"
              },
              "poetic_devices": [
                {
                  "name": "string",
                  "example": "string",
                  "explanation": "string",
                  "effect": "string"
                }
              ],
              "themes": {
                "primary": "string",
                "secondary": ["string", "string"],
                "explanation": "string"
              },
              "structure": {
                "form": "string",
                "rhyme_scheme": "string",
                "meter": "string",
                "explanation": "string"
              },
              "ap_insights": [
                {
                  "topic": "string",
                  "explanation": "string"
                }
              ]
            }
          `
        },
        {
          role: "user",
          content: `
            ${title ? `Title: ${title}` : ''}
            ${author ? `Author: ${author}` : ''}
            
            Poem:
            ${poem}
          `
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 2000,
    });

    return NextResponse.json(JSON.parse(response.choices[0].message.content || "{}"));
  } catch (error) {
    console.error('Error in poem analysis API:', error);
    return NextResponse.json({ error: 'Failed to analyze poem' }, { status: 500 });
  }
} 