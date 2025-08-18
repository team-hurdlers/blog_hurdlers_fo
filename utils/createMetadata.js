// utils/createMetadata.ts
export function createMetadata({ title, description, path, keywords }) {
  const fullUrl = `https://101.hurdlers.kr${path}`

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
    metadataBase: new URL('https://101.hurdlers.kr'),
    alternates: {
      canonical: path,
    },
    openGraph: {
      siteName: 'Hurdlers101',
      locale: 'ko_KR',
      type: 'website',
      title,
      description,
      url: fullUrl,
      images: [
        {
          url: '/v3/main/main-hero2.jpg',
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
      images: ['/v3/main/main-hero2.jpg'],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}
