import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize the OpenAI client with the API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { passage, title, author, numQuestions = 5 } = await request.json();
    
    if (!passage || typeof passage !== 'string') {
      return NextResponse.json({ error: 'Invalid request. Passage text is required.' }, { status: 400 });
    }
    
    // Call OpenAI to generate AP-style MCQs
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `
            You are an AP Literature exam question creator. Generate authentic AP Literature-style multiple choice questions based on the provided prose passage.
            
            Follow these guidelines:
            - Create exactly ${numQuestions} multiple-choice questions that reflect actual AP Literature exam questions
            - Questions should assess understanding of literary elements, narrative techniques, tone, theme, etc.
            - Each question should have 5 answer choices (A through E)
            - Clearly mark the correct answer for each question
            - Include a brief explanation for why each answer is correct
            - Questions should range in difficulty from straightforward to challenging
            - Include line references when appropriate
            
            Format your response as a JSON object matching this structure:
            {
              "passage_summary": "A brief summary of the passage",
              "passage_analysis": "A short analysis highlighting key literary elements and themes",
              "questions": [
                {
                  "question": "Question text",
                  "choices": [
                    {"letter": "A", "text": "Option A text"},
                    {"letter": "B", "text": "Option B text"},
                    {"letter": "C", "text": "Option C text"},
                    {"letter": "D", "text": "Option D text"},
                    {"letter": "E", "text": "Option E text"}
                  ],
                  "correct_answer": "The correct letter (A-E)",
                  "explanation": "Explanation of why this is the correct answer",
                  "skill_tested": "The AP skill being tested (e.g., 'Literary technique identification')"
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
            
            Passage:
            ${passage}
          `
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 3000,
    });

    return NextResponse.json(JSON.parse(response.choices[0].message.content || "{}"));
  } catch (error) {
    console.error('Error in prose practice API:', error);
    return NextResponse.json({ error: 'Failed to generate practice questions' }, { status: 500 });
  }
} 