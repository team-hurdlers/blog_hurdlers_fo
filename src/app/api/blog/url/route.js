// app/api/blog/url/route.js
import OpenAI from 'openai'
import { NextResponse } from 'next/server'

// OpenAI 클라이언트 초기화
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req) {
  try {
    const { title } = await req.json()
    // GPT API를 호출하여 한글 제목을 영어로 번역
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            '한국어 텍스트를 영어로 번역해주세요. 번역만 제공하고 다른 설명은 추가하지 마세요.',
        },
        {
          role: 'user',
          content: title,
        },
      ],
    })

    const englishTitle = response.choices[0].message.content.trim()

    const slugified = englishTitle
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')

    // 성공 응답 반환
    return NextResponse.json(slugified)
  } catch (error) {
    console.error('번역 중 오류 발생:', error)
    // 에러 응답 반환
    return NextResponse.json(
      { error: 'Failed to translate title' },
      { status: 500 },
    )
  }
}
