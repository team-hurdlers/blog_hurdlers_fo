// app/api/blog/url/route.js
import OpenAI from 'openai'
import { NextResponse } from 'next/server'

// OpenAI 클라이언트 초기화
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req) {
  try {
    const { body } = await req.json()
    // GPT API를 호출하여 한글 제목을 영어로 번역
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            '내용을 분석하여 설명을 생성해주세요. 설명은 100자 이내로 한글로 생성해주세요.',
        },
        {
          role: 'user',
          content: body,
        },
      ],
    })

    // 성공 응답 반환
    return NextResponse.json(response.choices[0].message.content.trim())
  } catch (error) {
    console.error('설명 생성 중 오류 발생:', error)
    // 에러 응답 반환
    return NextResponse.json(
      { error: 'Failed to generate description' },
      { status: 500 },
    )
  }
}
