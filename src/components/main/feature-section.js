import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

function Feature({ title, description, imageSrc, imageAlt, path }) {
  return (
    <div className="py-16">
      <div className="flex flex-col md:flex-row gap-12 items-start">
        <div className="w-full md:w-2/5 lg:w-1/3">
          <h3 className="text-3xl md:text-4xl font-normal mb-8 text-black">
            {title}
          </h3>
          <p className="text-base text-black mb-8 whitespace-pre-line leading-relaxed">
            {description}
          </p>
        </div>
        <div className="w-full md:w-3/5 lg:w-2/3">
          <div className="rounded-lg overflow-hidden">
            <Image
              src={imageSrc || '/placeholder.svg'}
              alt={imageAlt}
              width={800}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
      <div className="mt-10">
        <Link
          href={path}
          className="inline-flex items-center text-base font-normal text-black"
        >
          Learn More <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}

export default function FeaturesSection() {
  const features = [
    {
      title: 'AX Data Intelligence',
      description:
        '데이터 통합, 파이프라인 설계, 시각화,\n자연어 기반의 분석 및 인사이트 추출,\nML 모델을 활용한 예측분석까지\n데이터 분석을 위한 모든 솔루션',
      imageSrc: '/v3/main/feature/feature-1.png',
      imageAlt: 'Wooden posts extending into misty water',
      path: '/service/data-intelligence',
    },
    {
      title: 'AX Marketing Intelligence',
      description:
        '검색광고, SEO, AEO, 미디어 분석,\n퍼포먼스 최적화, 콘텐츠 지출 생산까지,\n마케팅을 위한 모든 솔루션',
      imageSrc: '/v3/main/feature/feature-2.png',
      imageAlt: 'Bridge structure',
      path: '/service/marketing-intelligence',
    },
    {
      title: 'AX Commerce Brain',
      description:
        '오픈마켓 가격 설정, 경쟁사 분석,\n상세페이지 최적화, 상세페이지 차트 제작,\n커머스를 위한 모든 솔루션',
      imageSrc: '/v3/main/feature/feature-3.png',
      imageAlt: 'Staircase with geometric shadows',
      path: '/service/commerce-brain',
    },
  ]

  return (
    <section className="relative z-20 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex justify-center mb-16">
          <div className="inline-block px-6 py-2 border border-black rounded-md font-normal text-base text-black bg-gray-50">
            <span className="font-normal text-black">WHAT WE DO</span>
          </div>
        </div>

        <div className="space-y-0">
          {features.map((feature, index) => (
            <div key={index} className="relative">
              <Feature
                title={feature.title}
                description={feature.description}
                imageSrc={feature.imageSrc}
                imageAlt={feature.imageAlt}
                path={feature.path}
              />
              <div className="border-t border-gray-200 my-0"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
