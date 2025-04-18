import { NextRequest, NextResponse } from 'next/server';
import { checkGrammar } from '../../lib/openai';

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();
    
    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Invalid request. Text is required.' }, { status: 400 });
    }
    
    const result = await checkGrammar(text);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in grammar checker API:', error);
    return NextResponse.json({ error: 'Failed to check grammar' }, { status: 500 });
  }
} 