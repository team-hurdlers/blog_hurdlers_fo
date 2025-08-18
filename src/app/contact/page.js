import Footer from '@/components/shared/footer'
import ContactForm from '@/components/contact/contact-form'
import Image from 'next/image'
import { createMetadata } from '@/utils/createMetadata'
import { getContactPointJSONLD } from '@/utils/createJSONLD'

export const metadata = createMetadata({
  title: 'AX 마케팅 플랫폼 | 문의 | 허들러스101',
  description:
    '허들러스101 AX 마케팅 플랫폼에 대해 궁금한 점이 있으면 언제든지 문의하세요. AI 기반 마케팅 자동화 및 데이터 분석 솔루션에 대해 전문가가 상세히 답변드립니다.',
  path: '/contact',
})

export default function ContactPage() {
  const contactPointStructuredData = getContactPointJSONLD()

  return (
    <>
      {/* <Header /> */}
      <main className="min-h-screen mb-10 md:mb-20">
        {/* ContactPoint 구조화된 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(contactPointStructuredData),
          }}
        />

        <div className="container mx-auto px-4 py-12">
          {/* Contact Us Label */}
          <div className="flex justify-center mb-10 md:mb-16">
            <div className="inline-block px-4 py-2 border border-black rounded-md font-medium text-base text-black bg-gray-50">
              Contact Us
            </div>
          </div>

          {/* Contact Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
            {/* Left Column - Text and Form */}
            <div className="max-w-xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Small talks.
                <br />
                Big meanings.
              </h1>
              <p className="text-gray-500 text-md mb-10 md:text-lg md:mb-12">
                우리는 만남을 단순한 연결이 아닌, 가능성의 시작이라고 믿습니다.
                <br />
                작은 대화로, 큰 변화를 허들러스101과 함께하세요.
              </p>

              <ContactForm />
            </div>

            {/* Right Column - Image */}
            <div className="hidden lg:block">
              <Image
                width={500}
                height={500}
                src="/contact-image.jpg"
                alt="Shelves with terracotta vases"
                className="w-full h-auto rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
