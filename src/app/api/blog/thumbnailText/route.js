// app/api/blog/thumbnailStyle.route.js
import OpenAI from 'openai'
import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs/promises'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req) {
  try {
    const { body } = await req.json()

    // public 디렉토리의 이미지 경로 설정
    const imagePath = path.join(
      process.cwd(),
      'public',
      'ai-image.png',
    )

    // 이미지 파일 읽고 base64 인코딩
    const imageBuffer = await fs.readFile(imagePath)
    const base64Image = imageBuffer.toString('base64')

    // Vision 모델에게 스타일 추출 요청
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are an AI prompt engineer. Describe this image as a detailed prompt for DALL·E 3.
Focus on visual style, composition, lighting, emotion, and elements to guide AI image generation.
At the end, combine this style with the following blog content to create a full prompt.`,
        },
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: {
                url: `data:image/png;base64,${base64Image}`,
              },
            },
            {
              type: 'text',
              text: `Blog content: ${body}`,
            },
          ],
        },
      ],
      max_tokens: 800,
    })

    const fullPrompt = response.choices[0].message.content.trim()
    return NextResponse.json({ prompt: fullPrompt })
  } catch (err) {
    console.error('Vision 오류:', err)
    return NextResponse.json(
      { error: 'Failed to generate prompt from image and text' },
      { status: 500 },
    )
  }
}
