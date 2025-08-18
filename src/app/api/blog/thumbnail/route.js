// app/api/blog/thumbnail.route.js
import OpenAI from 'openai'
import { NextResponse } from 'next/server'

// OpenAI 클라이언트 초기화
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req) {
  try {
    const { body } = await req.json()

    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: body,
      size: '1024x1024',
      response_format: 'b64_json',
      style: 'vivid',
      n: 1,
    })

    const base64Image = response.data?.[0]?.b64_json

    if (!base64Image) {
      return NextResponse.json(
        { error: '이미지를 생성할 수 없습니다.' },
        { status: 500 },
      )
    }
    return NextResponse.json({ base64Image }) // 👈 배열로 반환
  } catch (error) {
    console.error('오류 발생:', error)
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 },
    )
  }
}
