'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Search, ChevronDown } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [dropdownTimeout, setDropdownTimeout] = useState(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: 'https://hurdlers.kr/' },
    {
      name: 'Services',
      dropdown: true,
      items: [
        { 
          name: 'AI Transformation',
          isCategory: true,
          items: [
            { name: '전체 보기', href: 'https://hurdlers.kr/service/ai' },
            { name: 'AX 컨설팅', href: 'https://hurdlers.kr/service/ai/ax-consulting', hot: true },
            { name: 'AI 데이터 분석', href: 'https://hurdlers.kr/service/ai/ai-data-analysis', hot: true },
            { name: 'AI 자동화 구축', href: 'https://hurdlers.kr/service/ai/ai-automation', hot: true },
            { name: 'AI 생성형 컨텐츠', href: 'https://hurdlers.kr/service/ai/ai-contents', hot: true }
          ]
        },
        {
          name: 'Data',
          isCategory: true,
          items: [
            { name: '전체 보기', href: 'https://hurdlers.kr/service/data' },
            { name: 'GA4 구축', href: 'https://hurdlers.kr/service/data/ga4-consulting', hot: true },
            { name: '통합 대시보드 구축', href: 'https://hurdlers.kr/service/data/integrated-dashboard' },
            { name: '마테크 유지보수', href: 'https://hurdlers.kr/service/data/martech-maintenance' },
            { name: '데이터 파이프라인 구축', href: 'https://hurdlers.kr/service/data/data-pipeline-consulting' }
          ]
        },
        {
          name: 'Marketing',
          isCategory: true,
          items: [
            { name: '전체 보기', href: 'https://hurdlers.kr/service/marketing' },
            { name: '마테크 온보딩', href: 'https://hurdlers.kr/service/marketing/martech-onboarding' },
            { name: '그로스 마케팅', href: 'https://hurdlers.kr/service/marketing/growth-marketing' },
            { name: '검색 광고 자동화', href: 'https://hurdlers.kr/service/marketing/search-ad' },
            { name: 'SEO/AEO', href: 'https://hurdlers.kr/service/marketing/seo-aeo' }
          ]
        },
        {
          name: 'Develop',
          isCategory: true,
          items: [
            { name: 'Web/App', href: 'https://hurdlers.kr/develop/web-app' }
          ]
        }
      ]
    },
    {
      name: 'Resources',
      dropdown: true,
      items: [
        { name: '블로그', href: '/' },
        { name: '데모 체험', href: 'https://demo.hurdlers.kr/' },
        { name: '솔루션', href: '/' }
      ]
    },
    { name: 'Portfolio', href: 'https://hurdlers.kr/resource/portfolios' },
    {
      name: 'About',
      dropdown: true,
      items: [
        { name: '회사소개', href: 'https://hurdlers.kr/about/company' },
        { name: '채용', href: 'https://hurdlers.kr/about/recruit' },
        { name: '문의하기', href: 'https://hurdlers.kr/about/contact' }
      ]
    }
  ]

  const isActivePath = (href) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const toggleDropdown = (itemName) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName)
  }

  const handleMouseEnter = (itemName) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout)
      setDropdownTimeout(null)
    }
    setActiveDropdown(itemName)
  }

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null)
    }, 100) // 100ms 지연 (더 짧게)
    setDropdownTimeout(timeout)
  }

  // 공통 스타일 클래스들
  const menuItemClass = "text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
  const categoryTitleClass = "text-xs font-medium text-gray-400 mb-2"
  const hotTagClass = "ml-0.5 px-1.5 py-0.5 bg-white text-black text-xs font-medium rounded border border-black"

  // 메뉴 아이템 렌더링 헬퍼 함수
  const renderMenuItem = (subItem, showHot = false) => (
    <div key={subItem.name} className={showHot && subItem.hot ? "flex items-center justify-between" : ""}>
      <Link
        href={subItem.href}
        className={`${showHot && subItem.hot ? menuItemClass + " flex-1" : "block " + menuItemClass}`}
        onClick={() => setActiveDropdown(null)}
      >
        {subItem.name}
      </Link>
      {showHot && subItem.hot && (
        <span className={hotTagClass}>Hot</span>
      )}
    </div>
  )

  // 카테고리 섹션 렌더링 헬퍼 함수
  const renderCategorySection = (category) => (
    <div key={category.name} className="space-y-2">
      <div className={categoryTitleClass}>
        {category.name}
      </div>
      <div className="space-y-2">
        {category.items.map((subItem) => renderMenuItem(subItem, true))}
      </div>
    </div>
  )

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      <div className="w-full flex justify-center px-5 py-4">
        <nav className={`
          w-full max-w-7xl mx-auto px-5 py-3.5 rounded-xl
          backdrop-blur-xl bg-white/95 border border-gray-200/20
          shadow-[0_0.241451px_0.241451px_-1.25px_rgba(0,0,0,0.05),0_2px_2px_-2.5px_rgba(0,0,0,0.05),0_0.602187px_0.602187px_-1.25px_rgba(9,9,11,0.07),0_2.28853px_2.28853px_-2.5px_rgba(9,9,11,0.06),0_10px_10px_-3.75px_rgba(9,9,11,0.03)]
          transition-all duration-300 ease-in-out
          ${isScrolled ? 'bg-white/98' : ''}
        `}>
          <div className="flex items-center justify-between">
            {/* Logo */}

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <div 
                  key={item.name} 
                  className="relative"
                  onMouseEnter={() => item.dropdown && handleMouseEnter(item.name)}
                  onMouseLeave={() => item.dropdown && handleMouseLeave()}
                >
                  {item.dropdown ? (
                    <>
                      <Link
                        href={item.href || '#'}
                        className={`
                          flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                          hover:bg-gray-100/80 hover:text-gray-900
                          ${isActivePath(item.href) 
                            ? 'text-gray-900 bg-gray-100/60' 
                            : 'text-gray-600'
                          }
                        `}
                      >
                        <span>{item.name}</span>
                        <ChevronDown 
                          size={16} 
                          className={`transition-transform ${
                            activeDropdown === item.name ? 'rotate-180' : ''
                          }`} 
                        />
                      </Link>
                      
                      {activeDropdown === item.name && (
                        <div 
                          className={`absolute top-full left-0 mt-2 backdrop-blur-xl bg-white/95 border border-gray-200/20 rounded-lg shadow-lg z-50 ${
                            item.name === 'Services' ? 'w-[800px] p-6' : 'w-56 p-4'
                          }`}
                          onMouseEnter={() => handleMouseEnter(item.name)}
                          onMouseLeave={handleMouseLeave}
                        >
                          {item.name === 'Services' ? (
                            <div className="grid grid-cols-3 gap-8">
                              {/* AI Transformation + Develop Column */}
                              <div className="space-y-3">
                                {renderCategorySection(item.items.find(cat => cat.name === 'AI Transformation'))}
                                {renderCategorySection(item.items.find(cat => cat.name === 'Develop'))}
                              </div>
                              
                              {/* Data Column */}
                              <div className="space-y-3">
                                {renderCategorySection(item.items.find(cat => cat.name === 'Data'))}
                              </div>
                              
                              {/* Marketing Column */}
                              <div className="space-y-3">
                                {renderCategorySection(item.items.find(cat => cat.name === 'Marketing'))}
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <div className={categoryTitleClass}>
                                {item.name}
                              </div>
                              <div className="space-y-2">
                                {item.items.map((subItem) => renderMenuItem(subItem, false))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`
                        px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                        hover:bg-gray-100/80 hover:text-gray-900
                        ${isActivePath(item.href) 
                          ? 'text-gray-900 bg-gray-100/60' 
                          : 'text-gray-600'
                        }
                      `}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Right Side - Search & CTA Buttons */}
            <div className="flex items-center space-x-3">

              {/* Contact Us Button */}
              <Link
                href="https://hurdlers.kr/contact"
                className="hidden sm:flex items-center px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
              >
                Contact Us
              </Link>

              {/* Korean Button */}
              <Link
                href="https://demo.hurdlers.kr/"
                className="hidden sm:flex items-center px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
              >
                데모 체험
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100/80 transition-colors text-gray-600"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-gray-200/30">
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <div key={item.name}>
                    {item.dropdown ? (
                      <>
                        <button
                          onClick={() => toggleDropdown(item.name)}
                          className={`
                            flex items-center justify-between w-full px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                            hover:bg-gray-100/80 hover:text-gray-900
                            ${isActivePath(item.href) 
                              ? 'text-gray-900 bg-gray-100/60' 
                              : 'text-gray-600'
                            }
                          `}
                        >
                          <span>{item.name}</span>
                          <ChevronDown 
                            size={16} 
                            className={`transition-transform ${
                              activeDropdown === item.name ? 'rotate-180' : ''
                            }`} 
                          />
                        </button>
                        {activeDropdown === item.name && (
                          <div className="ml-4 mt-2 space-y-1">
                            {item.name === 'Services' ? (
                              item.items.map((category) => (
                                <div key={category.name} className="space-y-2 mb-4">
                                  <div className="text-base font-semibold text-gray-900 px-4 py-2">
                                    {category.name}
                                  </div>
                                  <div className="space-y-1 ml-4">
                                    {category.items.map((subItem) => (
                                      <div key={subItem.name} className="flex items-center justify-between">
                                        <Link
                                          href={subItem.href}
                                          className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100/60 rounded-lg transition-colors flex-1"
                                          onClick={() => {
                                            setIsMenuOpen(false)
                                            setActiveDropdown(null)
                                          }}
                                        >
                                          {subItem.name}
                                        </Link>
                                        {subItem.hot && (
                                          <span className="mr-4 px-2 py-1 bg-gray-100 text-gray-900 text-xs font-medium rounded border">
                                            Hot
                                          </span>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))
                            ) : (
                              item.items.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100/60 rounded-lg transition-colors"
                                  onClick={() => {
                                    setIsMenuOpen(false)
                                    setActiveDropdown(null)
                                  }}
                                >
                                  {subItem.name}
                                </Link>
                              ))
                            )}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`
                          block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                          hover:bg-gray-100/80 hover:text-gray-900
                          ${isActivePath(item.href) 
                            ? 'text-gray-900 bg-gray-100/60' 
                            : 'text-gray-600'
                          }
                        `}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200/30">
                  <Link
                    href="https://hurdlers.kr/contact"
                    className="px-4 py-3 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact Us
                  </Link>
                  <Link
                    href="https://demo.hurdlers.kr/"
                    className="px-4 py-3 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    데모 체험
                  </Link>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
