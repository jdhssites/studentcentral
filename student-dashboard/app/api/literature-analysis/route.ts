import { NextRequest, NextResponse } from 'next/server';
import { analyzeLiterature } from '../../lib/openai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, title, author, analysisTypes } = body;

    if (!text || !analysisTypes || analysisTypes.length === 0) {
      return NextResponse.json(
        { error: 'Text and at least one analysis type are required' },
        { status: 400 }
      );
    }

    const analysis = await analyzeLiterature({
      text,
      title,
      author,
      analysisTypes,
    });

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Error in literature analysis API:', error);
    return NextResponse.json(
      { error: 'Failed to analyze literature' },
      { status: 500 }
    );
  }
} 