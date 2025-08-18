'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { useAlert } from '@/context/AlertContext' // useAlert 훅 추가

export default function CTASection() {
  const { showAlert } = useAlert() // useAlert 훅 사용

  // Contact Us 버튼 클릭 핸들러
  const handleContactClick = (e) => {
    e.preventDefault()
    showAlert('준비중입니다.')
  }

  return (
    <section className="py-12 md:py-20 bg-gray-100 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex flex-col items-center text-center relative z-10">
          {/* Optimized heading with better spacing and line breaks */}
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 text-black max-w-4xl">
            성공적인 AX조직으로의 전환으로
            <br />
            혁신적인 생산성을 경험하세요.
          </h2>

          {/* Improved button container with consistent spacing */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
            <Link
              href="/service/data-intelligence"
              className="flex items-center justify-center bg-gray-100 text-base py-3 px-6 rounded-lg border border-gray-300 hover:bg-gray-200 transition-colors"
            >
              Learn More
              <ArrowUpRight className="ml-2 h-4 w-4 flex-shrink-0" />
            </Link>
            {/* Contact Us 버튼을 Link에서 button으로 변경하거나, Link에 onClick 핸들러 추가 */}
            <button
              onClick={handleContactClick}
              className="flex items-center justify-center bg-gray-100 text-base py-3 px-6 rounded-lg border border-gray-300 hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Contact Us
              <ArrowUpRight className="ml-2 h-4 w-4 flex-shrink-0" />
            </button>
          </div>
        </div>

        {/* Improved image positioning */}
        <div className="absolute bottom-0 right-0 md:right-16 lg:right-32 h-24 md:h-64 lg:h-72 w-auto z-0 overflow-hidden">
          <Image
            src="/v3/main/feature/person.png"
            alt="Person silhouette"
            width={400}
            height={800}
            className="h-full w-auto object-contain"
            priority
          />
        </div>
      </div>
    </section>
  )
}
