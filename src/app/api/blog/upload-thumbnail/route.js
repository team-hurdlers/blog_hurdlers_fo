import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import supabaseClient from '../../../../../lib/supabase-client'

export async function POST(req) {
  const { blogId, base64Image } = await req.json()

  if (!blogId || !base64Image) {
    return NextResponse.json({ error: '필수 값 누락' }, { status: 400 })
  }

  try {
    const matches = base64Image.match(/^data:(.+);base64,(.+)$/)
    if (!matches) throw new Error('base64 포맷이 잘못됨')

    const mimeType = matches[1]
    const buffer = Buffer.from(matches[2], 'base64')
    const ext = mimeType.split('/')[1]
    const fileName = `blog-${blogId}/${uuidv4()}.${ext}`

    const { data, error: uploadError } = await supabaseClient.storage
      .from('thumbnails')
      .upload(fileName, buffer, {
        contentType: mimeType,
        upsert: true,
      })

    if (uploadError) throw uploadError

    const {
      data: { publicUrl },
    } = supabaseClient.storage.from('thumbnails').getPublicUrl(fileName)

    await supabaseClient
      .from('blog')
      .update({ thumbnail: publicUrl })
      .eq('id', blogId)

    return NextResponse.json({ url: publicUrl })
  } catch (err) {
    console.error('썸네일 업로드 실패:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
