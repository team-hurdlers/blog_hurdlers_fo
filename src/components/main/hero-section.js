'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

export default function HeroSection() {
  const videoRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.85 // 재생 속도를 0.5배로 설정 (더 천천히 재생)
    }
  }, [])

  // 모바일 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // 데스크톱에서만 비디오 관련 로직 실행
    if (isMobile || !videoRef.current) return

    const video = videoRef.current

    const handleMetadataLoaded = () => {
      video.currentTime = 0.3
      video.playbackRate = 0.8
      video.play().catch((error) => {
        console.error('비디오 재생 오류:', error)
      })
    }

    const handleEnded = () => {
      video.currentTime = 0.3
      video.play().catch((error) => {
        console.error('비디오 재생 오류:', error)
      })
    }

    video.addEventListener('loadedmetadata', handleMetadataLoaded)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('loadedmetadata', handleMetadataLoaded)
      video.removeEventListener('ended', handleEnded)
    }
  }, [isMobile])

  return (
    <section className="relative md:h-screen md:pt-10">
      {/* 데스크톱 비디오 배경 - 모바일에서는 숨김 */}
      {!isMobile && (
        <div className="absolute inset-0 top-[-200px] h-[calc(100vh+428px)] overflow-hidden">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            playsInline
            preload="auto"
          >
            <source
              src="https://jkgoxcoplnjtxuhmoqxl.supabase.co/storage/v1/object/public/web-bucket//main-hero2.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-white/95"></div>
        </div>
      )}

      {/* 히어로 콘텐츠 */}
      <div className="relative z-10 flex flex-col justify-start items-center py-10 md:py-24 md:h-full">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            {isMobile ? (
              <h1 className="text-4xl font-bold leading-tight mb-4 text-black">
                오로지 마케팅에만 특화된 AI,
                <br />
                모든 것을 한 곳에서
              </h1>
            ) : (
              <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 text-black">
                오로지 마케팅에만 특화된 AI,
                <br />
                모든 것을 한 곳에서
              </h1>
            )}
            <p
              className={`${
                isMobile ? 'text-base' : 'text-base md:text-base'
              } text-black mb-6 max-w-4xl mx-auto`}
            >
              데이터 분석부터 광고 최적화, 업무 자동화, ML 모델을 통한 예측
              분석까지 제공하는 AX 마케팅 플랫폼, 허들러스101 입니다.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href="/demo"
                className="border border-black rounded-lg bg-black text-white hover:bg-gray-800 font-medium text-base py-3 px-6"
              >
                Go To Demo
              </Link>
              <Link
                href="/about/vision"
                className="border border-black px-6 py-3 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors text-black font-medium text-base"
              >
                Learn More <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 모바일 전용 이미지 */}
      {isMobile && (
        <div className="relative w-full mt-2">
          <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen aspect-[2/1]">
            <Image
              src="/v3/main/main-hero2.jpg"
              alt="마케팅 AI 플랫폼"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </section>
  )
}
