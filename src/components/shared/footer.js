'use client'

import Link from 'next/link'
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react'
import { useAlert } from '@/context/AlertContext'
import Image from 'next/image'

export default function Footer() {
  const { showAlert } = useAlert()

  // 준비 안된 메뉴 항목 리스트
  const notReadyItems = ['terms']

  // 링크 클릭 처리 - 준비 안된 메뉴 확인
  const handleLinkClick = (e, href) => {
    // href에서 첫 번째 '/'를 제거하여 경로만 추출
    const path = href.startsWith('/') ? href.substring(1) : href

    // 준비 안된 메뉴인지 확인
    if (notReadyItems.some((item) => path.includes(item))) {
      e.preventDefault()
      showAlert('준비중입니다.')
    }
  }

  return (
    <footer className="bg-black text-white py-16 border-t border-gray-200 relative overflow-hidden">
      {/* Wave Background */}
      <div
        className="absolute inset-0 w-full h-full hidden md:block"
        style={{ transform: 'translateY(-55px)' }}
      >
        <Image
          src="/wave-background.png"
          alt="Wave background"
          fill
          className="object-cover opacity-80 hidden md:block"
          priority
          quality={100}
        />
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-10 md:py-16 relative z-10 mb-0 md:mb-20">
        {/* Top section with Korean text and buttons */}
        <div className="text-center mb-20 md:mb-32">
          <h2 className="text-2xl md:text-4xl lg:text-5xl mb-8 md:mb-12 leading-relaxed">
            성공적인 AX 조직으로의 전환으로
            <br />
            혁신적인 생산성을 경험하세요.
          </h2>

          <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-4">
            <Link
              href="/about/vision"
              className="w-full md:w-auto border border-white rounded-xl px-4 md:px-6 py-3 md:py-3 text-base md:text-base flex items-center justify-center hover:bg-white hover:text-black transition-colors"
              onClick={(e) => handleLinkClick(e, '/about/vision')}
            >
              Learn More <ArrowUpRight className="ml-2 h-4 w-4 flex-shrink-0" />
            </Link>
            <Link
              href="/contact"
              className="w-full md:w-auto border border-white rounded-xl px-4 md:px-6 py-3 md:py-3 text-base md:text-base flex items-center justify-center hover:bg-white hover:text-black transition-colors"
            >
              Contact Us <ArrowUpRight className="ml-2 h-4 w-4 flex-shrink-0" />
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div className="mb-12 flex justify-start md:justify-end">
          <Link
            href="/"
            className="font-bold text-xl md:text-2xl text-white whitespace-nowrap"
          >
            <Image
              src="/new-logo-white.png"
              alt="HURDLERS1"
              width={200}
              height={50}
              priority
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Service Column */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Service</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/service/data-intelligence"
                  className="text-white hover:underline"
                  onClick={(e) =>
                    handleLinkClick(e, '/service/data-intelligence')
                  }
                >
                  AX Data Intelligence
                </Link>
              </li>
              <li>
                <Link
                  href="/service/marketing-intelligence"
                  className="text-white hover:underline"
                  onClick={(e) =>
                    handleLinkClick(e, '/service/marketing-intelligence')
                  }
                >
                  AX Marketing Intelligence
                </Link>
              </li>
              <li>
                <Link
                  href="/service/commerce-brain"
                  className="text-white hover:underline"
                  onClick={(e) => handleLinkClick(e, '/service/commerce-brain')}
                >
                  AX Commerce Brain
                </Link>
              </li>
              <li>
                <Link
                  href="/service/video-creation"
                  className="text-white hover:underline"
                  onClick={(e) => handleLinkClick(e, '/service/video-creation')}
                >
                  AX Video Creation
                </Link>
              </li>
            </ul>
          </div>

          {/* Resource Column */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Resource</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/demo"
                  className="text-white hover:underline"
                  onClick={(e) => handleLinkClick(e, '/demo')}
                >
                  Demo
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-white hover:underline"
                  onClick={(e) => handleLinkClick(e, '/blog')}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="https://news.hurdlers.kr/"
                  className="text-white hover:underline"
                >
                  AI News
                </Link>
              </li>
              <li>
                <Link
                  href="/108-question"
                  className="text-white hover:underline"
                >
                  108 Question
                </Link>
              </li>
            </ul>
          </div>

          {/* About Us Column */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">About Us</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/about/vision"
                  className="text-white hover:underline"
                  onClick={(e) => handleLinkClick(e, '/about/vision')}
                >
                  Vision
                </Link>
              </li>
              <li>
                <Link
                  href="/about/career"
                  className="text-white hover:underline"
                  onClick={(e) => handleLinkClick(e, '/about/career')}
                >
                  Career
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info Column */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-white">
                  12 Teheran-ro 70-gil, Gangnam-gu, Seoul, Republic of Korea
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 flex-shrink-0" />
                <a
                  href="tel:+821046705248"
                  className="text-white hover:underline"
                >
                  +82 10-2783-5248
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 flex-shrink-0" />
                <a
                  href="mailto:team@hurdlers.kr"
                  className="text-white hover:underline"
                >
                  team@hurdlers.kr
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-100/30 text-center">
          <p className="text-sm text-gray-100/50">
            © {new Date().getFullYear()} HURDLERS101. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
