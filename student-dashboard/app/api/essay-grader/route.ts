import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize the OpenAI client with the API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { essay, prompt, essayType = "Literary Analysis" } = await request.json();
    
    if (!essay || typeof essay !== 'string') {
      return NextResponse.json({ error: 'Invalid request. Essay text is required.' }, { status: 400 });
    }
    
    // Call OpenAI to grade the essay
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `
            You are an AP Literature essay grader using the College Board's 6-point rubric. Evaluate the provided essay and provide detailed feedback.
            
            College Board AP Literature Essay Rubric:
            - Score 6: Superior papers are specific in their references, cogent in their definitions, and free of plot summary that is not relevant to the prompt. These essays need not be without flaws, but they demonstrate the writer's ability to discuss literature with significant insight and understanding.
            - Score 5: These essays respond to the assigned task with precision and clarity, making a strong case for their interpretation. They may be less thorough or precise in their discussion of how literary devices contribute to meaning, and their analysis may not be as convincing as essays that merit a score of 6.
            - Score 4: These essays respond to the assigned task adequately. They contain analysis of the text, beyond mere summary, but they typically provide less thorough or convincing discussion than essays scored 5 or 6.
            - Score 3: These essays respond to the assigned task, but they do so simplistically or with uneven development. While they contain some analysis of the text, that analysis may be unclear, limited, or incomplete.
            - Score 2: These essays demonstrate less success in addressing the assigned task. The analysis may be partial, unconvincing, or irrelevant, or it may rely primarily on plot summary.
            - Score 1: These essays compound the weaknesses of essays scored 2. They often demonstrate minimal understanding of the text or the prompt.
            
            Format your response as a JSON object matching this structure:
            {
              "score": number,
              "overview": "General assessment of the essay's strengths and weaknesses",
              "thesis": {
                "score": number,
                "feedback": "Feedback on the thesis statement"
              },
              "evidence": {
                "score": number,
                "feedback": "Feedback on the use of evidence"
              },
              "analysis": {
                "score": number,
                "feedback": "Feedback on the quality of analysis"
              },
              "organization": {
                "score": number,
                "feedback": "Feedback on essay organization and structure"
              },
              "style": {
                "score": number,
                "feedback": "Feedback on writing style and mechanics"
              },
              "specific_suggestions": [
                "Suggestion 1",
                "Suggestion 2",
                "Suggestion 3"
              ]
            }
          `
        },
        {
          role: "user",
          content: `
            Essay Type: ${essayType}
            ${prompt ? `Prompt: ${prompt}` : ''}
            
            Essay:
            ${essay}
          `
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.5,
      max_tokens: 2500,
    });

    return NextResponse.json(JSON.parse(response.choices[0].message.content || "{}"));
  } catch (error) {
    console.error('Error in essay grader API:', error);
    return NextResponse.json({ error: 'Failed to grade essay' }, { status: 500 });
  }
} 