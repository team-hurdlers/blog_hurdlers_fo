import { put, del, list } from '@vercel/blob'

export async function uploadImage(base64Data, id) {
  try {
    // Base64 데이터에서 실제 이미지 데이터 추출
    const base64Image = base64Data.replace(/^data:image\/\w+;base64,/, '')
    const imageBuffer = Buffer.from(base64Image, 'base64')

    // Vercel Blob에 이미지 업로드
    const { url } = await put(`instagram/${id}.png`, imageBuffer, {
      access: 'public',
      contentType: 'image/png',
    })

    return url
  } catch (error) {
    console.error('이미지 업로드 중 오류:', error)
    throw error
  }
}

export async function deleteImage(id) {
  try {
    // Blob 목록에서 해당 이미지 찾기
    const { blobs } = await list({ prefix: `instagram/${id}.png` })

    // 해당하는 이미지가 있다면 삭제
    if (blobs.length > 0) {
      await del(blobs[0].url)
    }
  } catch (error) {
    console.error('이미지 삭제 중 오류:', error)
    throw error
  }
}

export async function renameImage(originalUrl, newId) {
  try {
    // 원본 이미지의 내용을 가져오기
    const response = await fetch(originalUrl)
    const imageBuffer = Buffer.from(await response.arrayBuffer())

    // 새로운 이름으로 업로드
    const { url } = await put(`instagram/${newId}.png`, imageBuffer, {
      access: 'public',
      contentType: 'image/png',
    })

    // 원본 이미지 삭제
    try {
      await del(originalUrl)
    } catch (error) {
      console.error('원본 이미지 삭제 중 오류:', error)
      // 원본 삭제 실패는 무시하고 진행
    }

    return url
  } catch (error) {
    console.error('이미지 이름 변경 중 오류:', error)
    return originalUrl // 실패 시 원래 URL 반환
  }
}
