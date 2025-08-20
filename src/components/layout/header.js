'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Search, ChevronDown } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: 'https://v4-dev-hurdlers.framer.website/' },
    {
      name: 'Services',
      dropdown: true,
      items: [
        { name: 'AX Consulting', href: 'https://v4-dev-hurdlers.framer.website/ai/ax-consulting' },
        { name: 'AI Data Analysis', href: 'https://v4-dev-hurdlers.framer.website/ai/ai-data-analysis' }
      ]
    },
    {
      name: 'Resources',
      dropdown: true,
      items: [
        { name: '블로그', href: '/' },
        { name: '데모체험', href: 'https://demo.hurdlers.kr/' },
        { name: '솔루션', href: '/' }
      ]
    },
    { name: 'Portfolio', href: 'https://v4-dev-hurdlers.framer.website/portfolio' },
    {
      name: 'About',
      dropdown: true,
      items: [
        { name: '회사소개', href: 'https://v4-dev-hurdlers.framer.website/company' },
        { name: '채용', href: 'https://v4-dev-hurdlers.framer.website/recruit' },
        { name: '문의하기', href: 'https://v4-dev-hurdlers.framer.website/contact' }
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
                <div key={item.name} className="relative">
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(item.name)}
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
                      </button>
                      
                      {activeDropdown === item.name && (
                        <div className="absolute top-full left-0 mt-2 w-56 backdrop-blur-xl bg-white/95 border border-gray-200/20 rounded-lg shadow-lg z-50 py-2">
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100/60 transition-colors"
                              onClick={() => setActiveDropdown(null)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
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
                href="https://v4-dev-hurdlers.framer.website/contact"
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
                            {item.items.map((subItem) => (
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
                            ))}
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
                    href="https://v4-dev-hurdlers.framer.website/contact"
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
