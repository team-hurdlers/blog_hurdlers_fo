'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Menu,
  Smartphone,
  Search,
  CheckSquare,
  Newspaper,
} from 'lucide-react'

export default function FloatingButtons({ position = 'default', showCategoryOnDesktop = true }) {
  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const [showCategoryMenu, setShowCategoryMenu] = useState(false)

  // 스크롤 투 탑 기능
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const toggleCategoryMenu = () => {
    setShowCategoryMenu(!showCategoryMenu)
  }

  // 위치에 따른 클래스 결정
  const getPositionClasses = () => {
    if (position === 'sidebar') {
      // BlogDetailPage - 사이드바 옆
      return {
        category: 'lg:left-[240px] left-6',
        scrollTop: 'lg:right-[300px] right-6',
        menu: 'lg:left-[240px] left-6'
      }
    }
    // BlogCategoryPage - 기본 위치
    return {
      category: 'left-6',
      scrollTop: 'right-6', 
      menu: 'left-6'
    }
  }

  const positions = getPositionClasses()

  return (
    <>
      {/* 카테고리 메뉴 버튼 - 왼쪽 */}
      <button
        onClick={toggleCategoryMenu}
        className={`fixed bottom-6 z-50 ${positions.category} w-12 h-12 bg-gray-700 hover:bg-gray-600 text-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${!showCategoryOnDesktop ? 'lg:hidden' : ''}`}
        aria-label="카테고리 메뉴"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="7" height="7"/>
          <rect x="14" y="3" width="7" height="7"/>
          <rect x="14" y="14" width="7" height="7"/>
          <rect x="3" y="14" width="7" height="7"/>
        </svg>
      </button>

      {/* 스크롤 투 탑 버튼 - 오른쪽 */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 z-50 ${positions.scrollTop} w-12 h-12 bg-black hover:bg-gray-800 text-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center`}
          aria-label="맨 위로 스크롤"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 15l-6-6-6 6"/>
          </svg>
        </button>
      )}

      {/* 카테고리 메뉴 팝업 */}
      {showCategoryMenu && (
        <>
          {/* 배경 오버레이 */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-20 z-40 lg:hidden"
            onClick={() => setShowCategoryMenu(false)}
          />
          
          {/* 카테고리 메뉴 */}
          <div className={`fixed z-50 bg-white rounded-lg shadow-xl border border-gray-200 bottom-20 ${positions.menu} w-56`}>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-3 text-black">CATEGORIES</h3>
              <div className="space-y-2">
                <Link
                  href="/blog"
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setShowCategoryMenu(false)}
                >
                  <Menu size={16} />
                  <span>전체보기</span>
                </Link>
                <Link
                  href="/blog/case-studies"
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setShowCategoryMenu(false)}
                >
                  <Smartphone size={16} />
                  <span>Case Study</span>
                </Link>
                <Link
                  href="/blog/ai"
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setShowCategoryMenu(false)}
                >
                  <Search size={16} />
                  <span>AI</span>
                </Link>
                <Link
                  href="/blog/data"
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setShowCategoryMenu(false)}
                >
                  <CheckSquare size={16} />
                  <span>Data</span>
                </Link>
                <Link
                  href="/blog/news"
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setShowCategoryMenu(false)}
                >
                  <Newspaper size={16} />
                  <span>허들러스 소식</span>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}