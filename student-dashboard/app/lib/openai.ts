'use server';

import OpenAI from 'openai';

// Initialize the OpenAI client with the API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function analyzeStory(storyText: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `
            You are a literary analysis assistant. Analyze the provided text and extract the following elements:
            - Themes (primary and secondary)
            - Tone and mood
            - Narrative structure
            - Characters (main and secondary)
            - Literary devices used (with examples from the text)
            
            Format your response as a JSON object matching this structure:
            {
              "themes": {
                "primary": "string",
                "secondary": ["string", "string", "string"],
                "explanation": "string"
              },
              "tone": {
                "primary": "string",
                "secondary": ["string", "string"],
                "explanation": "string"
              },
              "structure": {
                "type": "string",
                "explanation": "string"
              },
              "characters": {
                "main": ["string", "string"],
                "secondary": ["string", "string"],
                "analysis": "string"
              },
              "literary_devices": [
                {
                  "name": "string",
                  "example": "string",
                  "explanation": "string"
                }
              ]
            }
          `
        },
        {
          role: "user",
          content: storyText
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 2000,
    });

    return JSON.parse(response.choices[0].message.content || "{}");
  } catch (error) {
    console.error("Error analyzing story:", error);
    throw new Error("Failed to analyze story");
  }
}

export async function generateThesis(params: {
  essayType: "analytical" | "argumentative" | "expository";
  topic: string;
  stance: string;
  reasons: string[];
}) {
  try {
    const { essayType, topic, stance, reasons } = params;
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `
            You are a thesis statement generator for high school students. 
            Generate a strong, focused thesis statement based on the provided information.
            You should generate a thesis for a ${essayType} essay.
            
            Format your response as a single string containing just the thesis statement.
          `
        },
        {
          role: "user",
          content: `
            Essay type: ${essayType}
            Topic: ${topic}
            Main point/stance: ${stance}
            Supporting reasons: ${reasons.filter(Boolean).join(", ")}
            
            Please generate a thesis statement that is clear, specific, and debatable.
          `
        }
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    return response.choices[0].message.content?.trim();
  } catch (error) {
    console.error("Error generating thesis:", error);
    throw new Error("Failed to generate thesis");
  }
}

export async function checkGrammar(text: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `
            You are a grammar checker for students. Analyze the provided text for grammar, spelling, 
            punctuation, and style errors. Format your response as a JSON object matching this structure:
            {
              "errorCount": number,
              "errors": [
                {
                  "type": "string", // e.g., "Subject-verb agreement", "Run-on sentence", etc.
                  "position": "string", // e.g., "Sentence 2", "Paragraph 1", etc.
                  "text": "string", // The problematic text
                  "suggestion": "string" // Suggestion for improvement
                }
              ],
              "correctedText": "string" // The full text with all corrections applied
            }
            
            If there are no errors, return an object with errorCount: 0 and an empty errors array.
          `
        },
        {
          role: "user",
          content: text
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
      max_tokens: 2000,
    });

    return JSON.parse(response.choices[0].message.content || "{}");
  } catch (error) {
    console.error("Error checking grammar:", error);
    throw new Error("Failed to check grammar");
  }
}

export async function analyzeLiterature(params: {
  text: string;
  title?: string;
  author?: string;
  analysisTypes: string[];
}) {
  try {
    const { text, title, author, analysisTypes } = params;
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `
            You are a sophisticated literary analysis assistant for students. Analyze the provided text based on the requested analysis types.
            
            Format your response as a JSON object with the following structure:
            {
              "overallInsights": {
                "summary": "Concise overall analysis of the text",
                "significance": "Literary significance of the work",
                "criticalPerspectives": "How the work might be interpreted through different critical lenses"
              }
            }

            Additionally, include the following sections based on the requested analysis types:
            
            ${analysisTypes.includes('themes') ? `
            "themes": {
              "primaryThemes": [
                {
                  "name": "Theme name",
                  "description": "Brief description of the theme",
                  "evidence": ["Textual evidence 1", "Textual evidence 2", "Textual evidence 3"]
                }
              ],
              "motifs": ["Motif 1", "Motif 2", "Motif 3"]
            },` : ''}
            
            ${analysisTypes.includes('symbolism') ? `
            "symbolism": [
              {
                "symbol": "Symbol name",
                "meaning": "What the symbol represents in the text",
                "occurrences": ["Context 1", "Context 2", "Context 3"]
              }
            ],` : ''}
            
            ${analysisTypes.includes('character') ? `
            "characters": [
              {
                "name": "Character name",
                "analysis": "Analysis of the character's role and significance",
                "traits": ["Trait 1", "Trait 2", "Trait 3"],
                "development": "How the character changes throughout the text",
                "relationships": "Key relationships with other characters"
              }
            ],` : ''}
            
            ${analysisTypes.includes('narrative') ? `
            "narrative": {
              "structure": "Analysis of the narrative structure",
              "perspective": "Point of view and narrative voice",
              "techniques": ["Technique 1", "Technique 2", "Technique 3"],
              "arc": "Analysis of the overall narrative arc"
            },` : ''}
            
            ${analysisTypes.includes('literary-devices') ? `
            "literaryDevices": [
              {
                "device": "Device name",
                "examples": ["Example 1", "Example 2", "Example 3"]
              }
            ]` : ''}
          `
        },
        {
          role: "user",
          content: `
            Please analyze the following ${title ? `work titled "${title}"` : 'text'}${author ? ` by ${author}` : ''}.
            
            Analysis types requested: ${analysisTypes.join(', ')}
            
            TEXT:
            ${text}
          `
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 2500,
    });

    return JSON.parse(response.choices[0].message.content || "{}");
  } catch (error) {
    console.error("Error analyzing literature:", error);
    throw new Error("Failed to analyze literature");
  }
}

export async function paraphraseText(params: {
  text: string;
  sourceTitle?: string;
  sourceAuthor?: string;
  style: "academic" | "simplified" | "creative" | "formal";
  complexity: number; // 1-10
  lengthPreference: "shorter" | "similar" | "longer";
  keepStructure: boolean;
  vocabularyLevel: "basic" | "intermediate" | "advanced";
}) {
  try {
    const { text, sourceTitle, sourceAuthor, style, complexity, lengthPreference, keepStructure, vocabularyLevel } = params;
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `
            You are an academic paraphrasing assistant that helps students rewrite text in their own words 
            while maintaining the original meaning. Your task is to paraphrase the provided text according 
            to the specified parameters:
            
            - Style: ${style} (academic = scholarly language with formal tone; simplified = clearer, easier to understand; 
              creative = more expressive and engaging; formal = highly professional and proper)
            
            - Complexity Level: ${complexity}/10 (higher means more complex sentence structures and vocabulary)
            
            - Length Preference: ${lengthPreference} (shorter = more concise than original; similar = approximately same length; 
              longer = more detailed explanation)
            
            - Structure Preservation: ${keepStructure ? "Yes" : "No"} (if yes, maintain similar paragraph breaks and structure)
            
            - Vocabulary Level: ${vocabularyLevel} (basic = common words; intermediate = moderately advanced terms; 
              advanced = specialized academic vocabulary)
            
            Format your response as a JSON object with the following structure:
            {
              "paraphrasedText": "The paraphrased content",
              "originalLength": number,
              "newLength": number,
              "readabilityScore": number, // 1-100 score, higher is more readable
              "academicWordsCount": number, // count of academic terms used
              "changedWordsPercentage": number, // percentage of words changed
              "originalToNew": [
                {"original word": "new word"},
                {"original phrase": "new phrase"}
              ]
            }
            
            Ensure the paraphrasing:
            1. Completely changes the wording while preserving meaning
            2. Doesn't simply rearrange words or use simple synonyms
            3. Maintains proper citations if present in the original
            4. Restructures sentences appropriately for the chosen style
            5. Adjusts complexity based on the specified level
            6. Includes examples of word changes in the originalToNew field (at least 5 examples)
          `
        },
        {
          role: "user",
          content: `
            Please paraphrase the following ${sourceTitle ? `text from "${sourceTitle}"` : 'text'}${sourceAuthor ? ` by ${sourceAuthor}` : ''}.
            
            TEXT TO PARAPHRASE:
            ${text}
          `
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 2500,
    });

    return JSON.parse(response.choices[0].message.content || "{}");
  } catch (error) {
    console.error("Error paraphrasing text:", error);
    throw new Error("Failed to paraphrase text");
  }
} 