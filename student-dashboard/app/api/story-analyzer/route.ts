import { NextRequest, NextResponse } from 'next/server';
import { analyzeStory } from '../../lib/openai';

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();
    
    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Invalid request. Text is required.' }, { status: 400 });
    }
    
    const result = await analyzeStory(text);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in story analyzer API:', error);
    return NextResponse.json({ error: 'Failed to analyze story' }, { status: 500 });
  }
} 