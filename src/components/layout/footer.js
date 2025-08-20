'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white py-5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* CTA Section with background */}
        <div className="relative text-center py-20 mb-16 overflow-hidden" style={{
          backgroundColor: 'rgb(250, 250, 250)',
          borderRadius: '15px',
          opacity: 1
        }}>
          {/* Dot pattern overlay with vertical gradient */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.02) 100%)',
              opacity: 1
            }}
          ></div>
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(140, 140, 140, 1) 1px, transparent 1px)',
              backgroundSize: '15px 15px',
              mask: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.6) 100%)',
              WebkitMask: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.6) 100%)'
            }}
          ></div>
          
          {/* Content */}
          <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            시작하지 않으면 아무일도 일어나지 않습니다.
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 mb-8">
            지금 바로 문의하세요.
          </p>
          <Link
            href="https://v4-dev-hurdlers.framer.website/contact"
            className="inline-flex items-center px-8 py-4 bg-black text-white text-lg font-semibold rounded-lg hover:bg-gray-800 transition-colors"
          >
            Contact Us
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-8">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                Hurdlers
              </Link>
            </div>
            <div className="text-sm text-gray-600 space-y-2">
              <p>사업자명 : (주) 허들러스</p>
              <p>사업자 등록번호 : 660-46-00794</p>
              <p>대표자명 : 유성민</p>
              <p>문의 메일 : team@hurdlers.kr</p>
            </div>
            <div className="mt-8 text-sm text-gray-600">
              <p>AI는 반복을 대신하고, 사람은 통찰과 창의에</p>
              <p>집중할 수 있어야 한다고 믿습니다.</p>
              <p className="mt-4">그것이 우리가 기술을 다루는 방식이며, 사람이</p>
              <p>일하는 방식을 바꾸는 진짜 이유입니다.</p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Services</h3>
            <ul className="space-y-4 text-sm text-gray-600">
              <li>
                <Link 
                  href="https://v4-dev-hurdlers.framer.website/ai/ax-consulting" 
                  className="hover:text-gray-900 transition-colors"
                >
                  AX 컨설팅
                </Link>
              </li>
              <li>
                <Link 
                  href="https://v4-dev-hurdlers.framer.website/ai/ai-data-analysis" 
                  className="hover:text-gray-900 transition-colors"
                >
                  AI 데이터 분석
                </Link>
              </li>
              <li>
                <Link 
                  href="#" 
                  className="hover:text-gray-900 transition-colors"
                >
                  AI 자동화 구축
                </Link>
              </li>
              <li>
                <Link 
                  href="#" 
                  className="hover:text-gray-900 transition-colors"
                >
                  AI 생성형 컨텐츠
                </Link>
              </li>
              <li>
                <Link 
                  href="#" 
                  className="hover:text-gray-900 transition-colors"
                >
                  GA4 구축
                </Link>
              </li>
              <li>
                <Link 
                  href="#" 
                  className="hover:text-gray-900 transition-colors"
                >
                  통합 대시보드 구축
                </Link>
              </li>
              <li>
                <Link 
                  href="#" 
                  className="hover:text-gray-900 transition-colors"
                >
                  마케팅 온보딩
                </Link>
              </li>
            </ul>
          </div>

          {/* Additional Services */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Services</h3>
            <ul className="space-y-4 text-sm text-gray-600 mt-6">
              <li>
                <Link 
                  href="#" 
                  className="hover:text-gray-900 transition-colors"
                >
                  데이터 파이프라인 구축
                </Link>
              </li>
              <li>
                <Link 
                  href="#" 
                  className="hover:text-gray-900 transition-colors"
                >
                  Web/App 개발
                </Link>
              </li>
              <li>
                <Link 
                  href="#" 
                  className="hover:text-gray-900 transition-colors"
                >
                  크로스 마케팅
                </Link>
              </li>
              <li>
                <Link 
                  href="#" 
                  className="hover:text-gray-900 transition-colors"
                >
                  검색 광고 자동화
                </Link>
              </li>
              <li>
                <Link 
                  href="#" 
                  className="hover:text-gray-900 transition-colors"
                >
                  SEO/GEO
                </Link>
              </li>
              <li>
                <Link 
                  href="#" 
                  className="hover:text-gray-900 transition-colors"
                >
                  마테크 유지보수
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & About */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Resources</h3>
            <ul className="space-y-4 text-sm text-gray-600">
              <li>
                <Link 
                  href="/" 
                  className="hover:text-gray-900 transition-colors"
                >
                  블로그
                </Link>
              </li>
              <li>
                <Link 
                  href="https://demo.hurdlers.kr/" 
                  className="hover:text-gray-900 transition-colors"
                >
                  데모 체험
                </Link>
              </li>
              <li>
                <Link 
                  href="/" 
                  className="hover:text-gray-900 transition-colors"
                >
                  솔루션
                </Link>
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-6 mt-12">About</h3>
            <ul className="space-y-4 text-sm text-gray-600">
              <li>
                <Link 
                  href="https://v4-dev-hurdlers.framer.website/company" 
                  className="hover:text-gray-900 transition-colors"
                >
                  회사 소개
                </Link>
              </li>
              <li>
                <Link 
                  href="https://v4-dev-hurdlers.framer.website/recruit" 
                  className="hover:text-gray-900 transition-colors"
                >
                  채용
                </Link>
              </li>
              <li>
                <Link 
                  href="https://v4-dev-hurdlers.framer.website/contact" 
                  className="hover:text-gray-900 transition-colors"
                >
                  문의하기
                </Link>
              </li>
              <li>
                <Link 
                  href="#" 
                  className="hover:text-gray-900 transition-colors"
                >
                  개인정보약관
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Hurdlers © All rights reserved
          </p>
        </div>
      </div>
    </footer>
  )
}
