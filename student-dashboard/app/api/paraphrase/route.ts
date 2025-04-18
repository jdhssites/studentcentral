import { NextRequest, NextResponse } from 'next/server';
import { paraphraseText } from '../../lib/openai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      text, 
      sourceTitle, 
      sourceAuthor, 
      style,
      complexity,
      lengthPreference,
      keepStructure,
      vocabularyLevel 
    } = body;

    if (!text || !style) {
      return NextResponse.json(
        { error: 'Text and style are required' },
        { status: 400 }
      );
    }

    const result = await paraphraseText({
      text,
      sourceTitle,
      sourceAuthor,
      style,
      complexity,
      lengthPreference,
      keepStructure,
      vocabularyLevel
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in paraphrase API:', error);
    return NextResponse.json(
      { error: 'Failed to paraphrase text' },
      { status: 500 }
    );
  }
} 