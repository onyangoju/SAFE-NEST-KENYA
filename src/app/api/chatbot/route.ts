import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { message } = await req.json()
  if (!message) {
    return NextResponse.json({ reply: 'No message provided.' }, { status: 400 })
  }
  try {
    console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY);
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are Safe Nest Support, a helpful, empathetic assistant for victims of gender-based violence. Always be supportive, non-judgmental, and privacy-focused.' },
          { role: 'user', content: message },
        ],
        max_tokens: 256,
        temperature: 0.7,
      }),
    })
    const data = await openaiRes.json()
    let reply = 'Sorry, I am unable to respond at the moment.'
    if (data && data.choices && data.choices[0]?.message?.content) {
      reply = data.choices[0].message.content.trim()
    }
    return NextResponse.json({ reply })
  } catch (e) {
    console.error('OpenAI error:', e);
    return NextResponse.json({ reply: 'Sorry, there was an error.' }, { status: 500 })
  }
} 