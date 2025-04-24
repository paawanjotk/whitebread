import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { content } = await request.json();

    if (!content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-r1:free',
        messages: [
          {
            role: 'user',
            content: `Please summarize the following text:\n\n${content}`,
          },
        ],
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to summarize note');
    }
    
    const data = await response.json();
    return NextResponse.json({ summary: data.choices[0].message.content });
  } catch (error) {
    console.error('Error summarizing note:', error);
    return NextResponse.json(
      { error: 'Failed to summarize note' },
      { status: 500 }
    );
  }
} 