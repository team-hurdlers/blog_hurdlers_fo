export const getBlogDetailJSONLD = ({
  url,
  title,
  description,
  image,
  datePublished,
  author,
}) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  url: `https://blog.hurdlers.kr/posts/${url}`,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `https://blog.hurdlers.kr/posts/${url}`,
  },
  headline: title,
  description: description,
  image: [image],
  datePublished: datePublished,
  dateModified: datePublished,
  author: {
    '@type': 'Person',
    name: author,
  },
  publisher: {
    '@type': 'Organization',
    name: 'AX 마케팅 플랫폼 | 허들러스',
    logo: {
      '@type': 'ImageObject',
      url: 'https://blog.hurdlers.kr/metalogo.png',
    },
  },
})

export const getBlogJSONLD = () => ({
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'AX 마케팅 플랫폼 | 블로그 | 허들러스',
  description:
    'AX 마케팅 플랫폼 허들러스 공식 블로그. AI와 데이터 기반 마케팅 인사이트, 고객 경험 최적화 전략, 실전 사례와 마케팅 트렌드를 제공합니다.',
  url: 'https://blog.hurdlers.kr',
  publisher: {
    '@type': 'Organization',
    name: 'AX 마케팅 플랫폼 | 허들러스',
    logo: {
      '@type': 'ImageObject',
      url: 'https://blog.hurdlers.kr/metalogo.png',
    },
  },
})

export const getOrganizationJSONLD = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'AX 마케팅 플랫폼 | 허들러스',
  url: 'https://blog.hurdlers.kr',
  logo: {
    '@type': 'ImageObject',
    url: 'https://blog.hurdlers.kr/metalogo.png',
  },
  description:
    '허들러스 AX 마케팅 플랫폼으로 AI 기반 마케팅 자동화 및 데이터를 활용한 혁신적인 전략을 구현하세요. AI 기술로 마케팅 성과를 극대화하고 효율적인 캠페인 운영을 지원합니다.',
})

export const getBlogCategoryJSONLD = (categoryName) => ({
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: `AX 마케팅 플랫폼 | 블로그 | ${categoryName} | 허들러스`,
  description:
    'AX 마케팅 플랫폼 허들러스 공식 블로그. AI와 데이터 기반 마케팅 인사이트, 고객 경험 최적화 전략, 실전 사례와 마케팅 트렌드를 제공합니다.',
  url: `https://blog.hurdlers.kr/${categoryName}`,
  publisher: {
    '@type': 'Organization',
    name: 'AX 마케팅 플랫폼 | 허들러스',
    logo: {
      '@type': 'ImageObject',
      url: 'https://blog.hurdlers.kr/metalogo.png',
    },
  },
})

export const getPrivacyPolicyJSONLD = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'AX 마케팅 플랫폼 | 개인정보처리방침 | 허들러스',
  description:
    '허들러스는 고객의 개인정보 보호를 최우선으로 합니다. 개인정보 수집 및 이용, 보관, 처리 방침을 투명하게 안내드립니다.',
  url: 'https://blog.hurdlers.kr/privacy',
  publisher: {
    '@type': 'Organization',
    name: 'AX 마케팅 플랫폼 | 허들러스',
    logo: {
      '@type': 'ImageObject',
      url: 'https://blog.hurdlers.kr/metalogo.png',
    },
  },
  mainEntity: {
    '@type': 'PrivacyPolicy',
    name: '개인정보처리방침',
    description:
      '허들러스는 고객의 개인정보 보호를 최우선으로 합니다. 개인정보 수집 및 이용, 보관, 처리 방침을 투명하게 안내드립니다.',
  },
})