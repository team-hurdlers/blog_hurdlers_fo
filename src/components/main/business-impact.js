'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const stats = [
  {
    value: '2150+',
    label: 'Satisfied Customer',
  },
  {
    value: '94%',
    label: 'Satisfied Score',
  },
  {
    value: '54%',
    label: 'Cost Effectiveness',
  },
  {
    value: '30+',
    label: 'Entreprises',
  },
]

const testimonials = [
  {
    id: 1,
    company: 'AMOREPACIFIC',
    logo: '/v3/main/testimonial/partner-logo/amore.png',
    quote:
      '고객의 니즈를 이해하고 솔루션을 제공하는 것. 가장 단순하지만 또한 가장 어려운 일입니다. 브랜드 직영몰 개선을 위해 프로젝트를 함께했고, 원하는 그리고 원할지도 모르는 고객의 섬세한 흔적을 발견할 수 있도록 꼼꼼하게 설계해주셨습니다. 실제적인 성과를 낼 수 있는 파트너를 찾는다면 허들러스를 추천합니다.  ',
    author: {
      name: '한재호',
      title: '아모레퍼시픽 GTM팀 과장',
      avatar: '/v3/main/testimonial/partner-face/amore.png',
    },
  },
  {
    id: 2,
    company: 'SHINSEGAE',
    logo: '/v3/main/testimonial/partner-logo/shinsegae.png',
    quote:
      '허들러스를 파트너로 선택함으로써 최고 수준의 전문성과 뛰어난 서비스를 경험했습니다. 향후에도 허들러스와의 협업을 기대합니다.',
    author: {
      name: '정영윤',
      title: 'Partner Of SHINSEGAE LIVE SHOPPING',
      avatar: '/v3/main/testimonial/partner-face/shinsegae.png',
    },
  },
  {
    id: 3,
    company: 'CJ MEZZOMEDIA',
    logo: '/v3/main/testimonial/partner-logo/cj.png',
    quote:
      '어떠한 요청이든 신속하고 정확하게 처리하는 허들러스는, 프로젝트의 진행 속도와 만족도를 크게 높였습니다. 특히, 우리가 직면한 복잡한 문제들에 대해 효과적으로 대응하며, 기대를 뛰어넘는 결과물을 제공하였습니다.',
    author: {
      name: '장용국',
      title: '과장 Of Mezzomedia',
      avatar: '/v3/main/testimonial/partner-face/amore.png',
    },
  },
  // Duplicated testimonials
  {
    id: 4,
    company: 'SHINSEGAE',
    logo: '/v3/main/testimonial/partner-logo/hunet.png',
    quote:
      '허들러스의 전문성과 체계적인 프로세스 덕분에 프로젝트를 신속하고 완벽하게 완료할 수 있었습니다. 단순한 협업을 넘어, 파트너가 되어 우리 기업의 함께 성장시키는 특별한 경험을 하였습니다.',
    author: {
      name: '이형배',
      title: '선임 Of Hunet',
      avatar: '/v3/main/testimonial/partner-face/shinsegae.png',
    },
  },
  {
    id: 5,
    company: 'AMOREPACIFIC',
    logo: '/v3/main/testimonial/partner-logo/fast-campus.png',
    quote:
      '허들러스의 고퀄리티 서비스가 함께하시는 고객분들에게도 이어지는 것은 자명하다고 생각하고, 가장 최고의 마케팅을 경험하며 성장의 발판이 되리라 기대합니다.',
    author: {
      name: '손승완',
      title: '기획 담당자 Of Fastcampus',
      avatar: '/v3/main/testimonial/partner-face/cj.png',
    },
  },
  {
    id: 6,
    company: 'CJ MEZZOMEDIA',
    logo: '/v3/main/testimonial/partner-logo/lg.png',
    quote:
      '강의의 구성도 니즈에 맞추어 맞춤형으로 준비해주시고, 강의력이 좋으셔서 몰입감 있는 강의를 제공해주십니다. 덕분에 조직의 구성원이 항상 발 빠르게 GA4를 필요한 곳에 활용할 수 있게 되어 직원들의 데이터 활용 역량과 만족도가 동시에 향상되었습니다. ',
    author: {
      name: '이선민',
      title: 'Head of People Ops',
      avatar: '/v3/main/testimonial/partner-face/cj.png',
    },
  },
]

export default function BusinessImpact() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [displayCount, setDisplayCount] = useState(3)
  const [cardWidth, setCardWidth] = useState(0)
  const [gapWidth, setGapWidth] = useState(32)
  const carouselRef = useRef(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Touch handling
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  // Calculate how many cards to display based on screen size
  const updateDisplayCount = useCallback(() => {
    if (typeof window === 'undefined') return

    if (window.innerWidth >= 1024) {
      setDisplayCount(3)
      setGapWidth(32)
    } else if (window.innerWidth >= 768) {
      setDisplayCount(2)
      setGapWidth(24)
    } else {
      setDisplayCount(1)
      setGapWidth(16)
    }
  }, [])

  // Calculate card width based on container width and display count
  const updateCardWidth = useCallback(() => {
    if (!carouselRef.current) return

    const containerWidth = carouselRef.current.offsetWidth
    const totalGapWidth = gapWidth * (displayCount - 1)
    const newCardWidth = (containerWidth - totalGapWidth) / displayCount

    setCardWidth(Math.floor(newCardWidth))
  }, [displayCount, gapWidth])

  // Initialize dimensions
  useEffect(() => {
    updateDisplayCount()
    window.addEventListener('resize', updateDisplayCount)
    return () => window.removeEventListener('resize', updateDisplayCount)
  }, [updateDisplayCount])

  // Update card width when display count changes
  useEffect(() => {
    updateCardWidth()
    window.addEventListener('resize', updateCardWidth)
    return () => window.removeEventListener('resize', updateCardWidth)
  }, [updateCardWidth, displayCount])

  // Handle next slide
  const nextSlide = () => {
    if (isTransitioning) return

    setIsTransitioning(true)
    const maxIndex = testimonials.length - displayCount
    const newIndex = activeIndex >= maxIndex ? 0 : activeIndex + 1
    setActiveIndex(newIndex)

    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }

  // Handle previous slide
  const prevSlide = () => {
    if (isTransitioning) return

    setIsTransitioning(true)
    const maxIndex = testimonials.length - displayCount
    const newIndex = activeIndex <= 0 ? maxIndex : activeIndex - 1
    setActiveIndex(newIndex)

    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }

  // Go to specific slide
  const goToSlide = (index) => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setActiveIndex(index)

    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }

  // Touch event handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const minSwipeDistance = 50

    if (distance > minSwipeDistance) {
      nextSlide()
    } else if (distance < -minSwipeDistance) {
      prevSlide()
    }

    setTouchStart(null)
    setTouchEnd(null)
  }

  // Testimonial Card Component
  const TestimonialCard = ({ testimonial }) => (
    <div className="flex flex-col bg-gray-50 p-4 sm:p-6 rounded-lg h-full">
      <div className="mb-4 h-8">
        <div className="flex items-center">
          <Image
            src={testimonial.logo || '/placeholder.svg'}
            alt={`${testimonial.company} logo`}
            width={120}
            height={30}
            className="h-6 sm:h-8 w-auto object-contain mr-2"
          />
          {testimonial.badge && (
            <span
              className={`text-xs text-white px-2 py-1 rounded ${
                testimonial.badgeColor || 'bg-blue-500'
              }`}
            >
              {testimonial.badge}
            </span>
          )}
        </div>
      </div>
      <p className="text-sm sm:text-base text-black mb-4 sm:mb-6 flex-grow">
        {testimonial.quote}
      </p>
      <div className="flex items-center mt-auto pt-4 border-t border-gray-200">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden mr-3 sm:mr-4">
          <Image
            src={testimonial.author.avatar || '/placeholder.svg'}
            alt={testimonial.author.name}
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <div className="font-bold text-sm sm:text-base text-black">
            {testimonial.author.name}
          </div>
          <div className="text-xs sm:text-sm text-black">
            {testimonial.author.title}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <section className="py-16 sm:py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Mobile view for header */}
        <div className="md:hidden mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-black">
            Business Impact
          </h2>
          <p className="text-sm sm:text-base text-black">
            허들러스101은 AI를 통해 비즈니스 혁신과 지속 성장을 실현하는 종합
            솔루션입니다.<br></br>
            하나의 플랫폼으로 전사적인 AX를 경험하세요.
          </p>
        </div>

        {/* Desktop view for header */}
        <div className="hidden md:grid md:grid-cols-2 gap-10 mb-20">
          <div>
            <h2 className="text-5xl font-bold mb-6 text-black">
              Business Impact
            </h2>
          </div>
          <div>
            <p className="text-base text-black">
              허들러스101은 AI를 통해 비즈니스 혁신과 지속 성장을 실현하는 종합
              솔루션입니다.<br></br>
              하나의 플랫폼으로 전사적인 AX를 경험하세요.
            </p>
          </div>
        </div>

        {/* Stats section - responsive for both mobile and desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-12 sm:mb-16 md:mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-3 sm:p-4 md:p-6 flex flex-col items-center justify-center text-center"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2 text-black">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm md:text-base text-black">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mb-8 sm:mb-12 md:mb-16">
          <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 border border-black rounded-md font-medium text-sm sm:text-base text-black bg-gray-50">
            <span>TESTIMONIAL</span>
          </div>
        </div>

        {/* Testimonials carousel */}
        <div className="relative" ref={carouselRef}>
          <div
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${
                  activeIndex * (cardWidth + gapWidth)
                }px)`,
              }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="shrink-0"
                  style={{
                    width: `${cardWidth}px`,
                    marginRight: `${gapWidth}px`,
                  }}
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>

          {/* Gradient overlays */}
          <div className="absolute top-0 left-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
          <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
        </div>

        {/* Pagination indicators */}
        <div className="flex justify-center mt-4 sm:mt-6 space-x-3 sm:space-x-4">
          {Array.from({ length: testimonials.length - displayCount + 1 }).map(
            (_, index) => (
              <button
                key={index}
                className={`
          p-3
          w-1.5 h-1.5 sm:w-2 sm:h-2 
          rounded-full 
          transition-colors duration-300 
          ${index === activeIndex ? 'bg-black' : 'bg-gray-300'}
        `}
                onClick={() => goToSlide(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ),
          )}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-center mt-6 sm:mt-8 md:mt-10 gap-2">
          <button
            onClick={prevSlide}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-300 flex items-center justify-center text-black hover:bg-gray-100 transition-colors"
            aria-label="Previous testimonial"
            disabled={isTransitioning}
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
            aria-label="Next testimonial"
            disabled={isTransitioning}
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
