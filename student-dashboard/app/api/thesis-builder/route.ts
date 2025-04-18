import { NextRequest, NextResponse } from 'next/server';
import { generateThesis } from '../../lib/openai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.topic || !body.essayType) {
      return NextResponse.json({ error: 'Invalid request. Topic and essayType are required.' }, { status: 400 });
    }
    
    const result = await generateThesis({
      essayType: body.essayType,
      topic: body.topic,
      stance: body.stance || '',
      reasons: body.reasons || []
    });
    
    return NextResponse.json({ thesis: result });
  } catch (error) {
    console.error('Error in thesis builder API:', error);
    return NextResponse.json({ error: 'Failed to generate thesis' }, { status: 500 });
  }
} 