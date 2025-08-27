// utils/createMetadata.ts
export function createMetadata({ title, description, path, keywords, image }) {
  const fullUrl = `https://blog.hurdlers.kr${path}`
  const ogImage = image || '/metalogo.png'

  return {
    title,
    description,
    keywords: [
      '허들러스',
      'Hurdlers',
      'AI 마케팅',
      '인공지능',
      '창의력',
      '마케팅 솔루션',
      '디지털 마케팅',
    ],
    metadataBase: new URL('https://blog.hurdlers.kr'),
    alternates: {
      canonical: path,
    },
    openGraph: {
      siteName: 'Hurdlers',
      locale: 'ko_KR',
      type: 'article',
      title,
      description,
      url: fullUrl,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}
