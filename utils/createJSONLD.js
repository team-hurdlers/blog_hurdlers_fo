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
  url: `https://101.hurdlers.kr/blog/detail/${url}`,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `https://101.hurdlers.kr/blog/detail/${url}`,
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
      url: 'https://101.hurdlers.kr/new-logo.png',
    },
  },
})

export const getBlogJSONLD = () => ({
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'AX 마케팅 플랫폼 | 블로그 | 허들러스',
  description:
    'AX 마케팅 플랫폼 허들러스 공식 블로그. AI와 데이터 기반 마케팅 인사이트, 고객 경험 최적화 전략, 실전 사례와 마케팅 트렌드를 제공합니다.',
  url: 'https://101.hurdlers.kr/blog',
  publisher: {
    '@type': 'Organization',
    name: 'AX 마케팅 플랫폼 | 허들러스',
    logo: {
      '@type': 'ImageObject',
      url: 'https://101.hurdlers.kr/new-logo.png',
    },
  },
})

export const getOrganizationJSONLD = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'AX 마케팅 플랫폼 | 허들러스',
  url: 'https://101.hurdlers.kr',
  logo: {
    '@type': 'ImageObject',
    url: 'https://101.hurdlers.kr/new-logo.png',
  },
  description:
    '허들러스 AX 마케팅 플랫폼으로 AI 기반 마케팅 자동화 및 데이터를 활용한 혁신적인 전략을 구현하세요. AI 기술로 마케팅 성과를 극대화하고 효율적인 캠페인 운영을 지원합니다.',
})

export const getContactPointJSONLD = () => ({
  '@context': 'https://schema.org',
  '@type': 'ContactPoint',
  contactType: 'customer service',
  areaServed: 'KR',
  availableLanguage: ['Korean', 'English'],
  description:
    '허들러스 AX 마케팅 플랫폼에 대해 궁금한 점이 있으면 언제든지 문의하세요. AI 기반 마케팅 자동화 및 데이터 분석 솔루션에 대해 전문가가 상세히 답변드립니다.',
  url: 'https://101.hurdlers.kr/contact',
})

export const getFAQPageJSONLD = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  name: 'AX 마케팅 플랫폼 | 108질문 | 허들러스',
  description:
    'AX 마케팅 플랫폼에 대한 108가지 질문을 통해 AI 마케팅 솔루션의 기능과 가능성에 대해 자세히 알아보세요. AI 기반의 효율적인 마케팅 전략을 경험하세요.',
  url: 'https://101.hurdlers.kr/108-question',
  publisher: {
    '@type': 'Organization',
    name: 'AX 마케팅 플랫폼 | 허들러스',
    logo: {
      '@type': 'ImageObject',
      url: 'https://101.hurdlers.kr/new-logo.png',
    },
  },
})

export const getAboutPageJSONLD = () => ({
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'AX 마케팅 플랫폼 | 회사소개 | 비전 | 허들러스',
  description:
    '허들러스의 비전과 AI 혁신을 소개합니다. AI 기술을 통해 고객의 마케팅 성공을 이끌어가는 우리의 미래 지향적인 목표를 확인하세요',
  url: 'https://101.hurdlers.kr/about/vision',
  publisher: {
    '@type': 'Organization',
    name: 'AX 마케팅 플랫폼 | 허들러스',
    logo: {
      '@type': 'ImageObject',
      url: 'https://101.hurdlers.kr/new-logo.png',
    },
  },
  mainEntity: {
    '@type': 'Organization',
    name: 'AX 마케팅 플랫폼 | 허들러스',
    description:
      '허들러스 AX 마케팅 플랫폼으로 AI 기반 마케팅 자동화 및 데이터를 활용한 혁신적인 전략을 구현하세요. AI 기술로 마케팅 성과를 극대화하고 효율적인 캠페인 운영을 지원합니다.',
  },
})

export const getJobPostingJSONLD = () => ({
  '@context': 'https://schema.org',
  '@type': 'JobPosting',
  title: 'AX 마케팅 플랫폼 | 회사소개 | 채용 | 허들러스',
  description:
    '허들러스에서 AI 기반 마케팅 솔루션을 함께 이끌어갈 인재를 찾습니다. AI 자동화와 혁신적인 기술을 활용해 성장할 열정적인 인재들의 지원을 기다립니다.',
  url: 'https://101.hurdlers.kr/about/career',
  employmentType: 'FULL_TIME',
  jobLocation: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'KR',
    },
  },
  hiringOrganization: {
    '@type': 'Organization',
    name: 'AX 마케팅 플랫폼 | 허들러스',
    sameAs: 'https://101.hurdlers.kr',
    logo: {
      '@type': 'ImageObject',
      url: 'https://101.hurdlers.kr/new-logo.png',
    },
  },
})

export const getBlogCategoryJSONLD = (categoryName) => ({
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: `AX 마케팅 플랫폼 | 블로그 | ${categoryName} | 허들러스`,
  description:
    'AX 마케팅 플랫폼 허들러스 공식 블로그. AI와 데이터 기반 마케팅 인사이트, 고객 경험 최적화 전략, 실전 사례와 마케팅 트렌드를 제공합니다.',
  url: `https://101.hurdlers.kr/blog/${categoryName}`,
  publisher: {
    '@type': 'Organization',
    name: 'AX 마케팅 플랫폼 | 허들러스',
    logo: {
      '@type': 'ImageObject',
      url: 'https://101.hurdlers.kr/new-logo.png',
    },
  },
})

export const getPrivacyPolicyJSONLD = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'AX 마케팅 플랫폼 | 개인정보처리방침 | 허들러스',
  description:
    '허들러스은 고객의 개인정보 보호를 최우선으로 합니다. 개인정보 수집 및 이용, 보관, 처리 방침을 투명하게 안내드립니다.',
  url: 'https://101.hurdlers.kr/privacy',
  publisher: {
    '@type': 'Organization',
    name: 'AX 마케팅 플랫폼 | 허들러스',
    logo: {
      '@type': 'ImageObject',
      url: 'https://101.hurdlers.kr/new-logo.png',
    },
  },
  mainEntity: {
    '@type': 'PrivacyPolicy',
    name: '개인정보처리방침',
    description:
      '허들러스은 고객의 개인정보 보호를 최우선으로 합니다. 개인정보 수집 및 이용, 보관, 처리 방침을 투명하게 안내드립니다.',
  },
})

export const getCommerceBrainJSONLD = () => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'AX 마케팅 플랫폼 | 서비스 | 커머스 고객 분석·전략 솔루션 | 허들러스',
  description:
    '허들러스의 AI 기반 커머스 고객 분석 및 전략 솔루션으로 고객 행동을 예측하고, AI를 활용한 맞춤형 전략으로 매출을 극대화하세요',
  brand: {
    '@type': 'Brand',
    name: 'AX 마케팅 플랫폼 | 허들러스',
    logo: 'https://101.hurdlers.kr/new-logo.png',
  },
  url: 'https://101.hurdlers.kr/service/commerce-brain',
})

export const getVideoCreationJSONLD = () => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'AX 마케팅 플랫폼 | 서비스 | AI영상 자동화 제작 크리에이션 | 허들러스',
  description:
    '허들러스의 AI 영상 자동화 제작 솔루션으로 기획부터 제작까지의 과정을 간소화하고, AI 기반 크리에이티브로 효율적이고 일관된 콘텐츠를 빠르게 제작하세요.',
  brand: {
    '@type': 'Brand',
    name: 'AX 마케팅 플랫폼 | 허들러스',
    logo: 'https://101.hurdlers.kr/new-logo.png',
  },
  url: 'https://101.hurdlers.kr/service/video-creation',
})

export const getDataIntelligenceJSONLD = () => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'AX 마케팅 플랫폼 | 서비스 | 데이터 통합·분석 솔루션 | 허들러스',
  description:
    '허들러스의 AI 기반 데이터 통합 및 분석 솔루션으로 마케팅 데이터를 효율적으로 관리하고, AI 분석을 통해 전략적 의사결정을 내리세요',
  brand: {
    '@type': 'Brand',
    name: 'AX 마케팅 플랫폼 | 허들러스',
    logo: 'https://101.hurdlers.kr/new-logo.png',
  },
  url: 'https://101.hurdlers.kr/service/data-intelligence',
})

export const getMarketingIntelligenceJSONLD = () => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'AX 마케팅 플랫폼 | 서비스 | 마케팅 자동화·성과 관리 솔루션 | 허들러스',
  description:
    '허들러스의 AI 마케팅 자동화 및 성과 관리 솔루션으로 AI 기술을 활용해 캠페인을 자동화하고, 실시간 성과 분석으로 최적의 결과를 도출하세요',
  brand: {
    '@type': 'Brand',
    name: 'AX 마케팅 플랫폼 | 허들러스',
    logo: 'https://101.hurdlers.kr/new-logo.png',
  },
  url: 'https://101.hurdlers.kr/service/marketing-intelligence',
})

export const getDemoDetailJSONLD = ({ name, description }) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: name,
  description: description,
  brand: {
    '@type': 'Brand',
    name: 'AX 마케팅 플랫폼 | 허들러스',
    logo: 'https://101.hurdlers.kr/new-logo.png',
  },
  url: 'https://101.hurdlers.kr/service/marketing-intelligence',
})

export const getDemoListJSONLD = () => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'AX 마케팅 플랫폼 | 데모 체험 | 모든 서비스 | 허들러스',
  description:
    '허들러스의 모든 AI 기반 마케팅 솔루션을 한 번에 체험할 수 있는 데모 페이지입니다. 데이터 분석부터 AI 자동화까지 다양한 솔루션을 직접 확인하세요',
  url: 'https://101.hurdlers.kr/demo/all-services',
})

export const getDemoJSONLD = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'AX 마케팅 플랫폼 | 데모 체험 | 허들러스',
  description:
    '허들러스의 AI 기술을 탑재한 AX 마케팅 플랫폼을 무료로 체험해 보세요. 다양한 AI 기반 기능을 직접 경험하고, 마케팅 혁신을 시작하세요',
  url: 'https://101.hurdlers.kr/demo',
  publisher: {
    '@type': 'Organization',
    name: 'AX 마케팅 플랫폼 | 허들러스',
    logo: {
      '@type': 'ImageObject',
      url: 'https://101.hurdlers.kr/new-logo.png',
    },
  },
})
