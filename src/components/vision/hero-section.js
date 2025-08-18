'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function VisionHeroSection() {
  const [isMobile, setIsMobile] = useState(false)

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section className="relative py-10 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <h1 className="text-4xl md:text-7xl font-bold text-center mb-16">
            Perception is pattern.
          </h1>

          {/* Divider */}
          <div className="w-full h-px bg-gray-300 mb-16"></div>

          {/* Images */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
            <div className="md:col-span-3">
              <div className="rounded-2xl overflow-hidden bg-[#f5f5f5] h-[300px]">
                <Image
                  src="/v3/vision/pattern1.png"
                  alt="City view with Empire State Building"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="md:col-span-6">
              <div className="rounded-2xl overflow-hidden bg-[#f5f5f5] h-[300px]">
                <Image
                  src="/v3/vision/pattern2.png"
                  alt="Abstract wave pattern"
                  width={800}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="md:col-span-3">
              <div className="rounded-2xl overflow-hidden bg-[#f5f5f5] h-[300px]">
                <Image
                  src="/v3/vision/pattern3.png"
                  alt="Artistic profile illustration"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gray-300 mt-16 mb-16"></div>

          {/* Korean Text */}
          <div className="text-center text-gray-500 w-full mx-auto space-y-4">
            <p className="text-lg">
              AI의 명료함과 인간의 통찰력이 조화를 이루도록 하며, 복잡한 문제를
              단순하게 정리하고, <br />
              자동화를 기본 원칙으로 삼아, 정보의 소음을 의미 있는 인사이트로
              바꿉니다.
              <br />
              <br />
              우리의 비전은 창의적이고 분석적인 사고를 기반으로, 사용자가
              불필요한 번뇌에 얽매이지 않고, <br />
              정확한 솔루션과 단 하나의 최적화된 툴을 통해 필요한 정보를 얻을 수
              있도록 하는 것입니다. <br />
              혁신적인 마케팅은 거대한 변화를 추구하는 것이 아니라, 함께
              만들어가는 과정이니까요.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
