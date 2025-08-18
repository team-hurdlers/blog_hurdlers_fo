// 'use client'

// import { useState, useRef, useEffect } from 'react'
// import Link from 'next/link'
// import Image from 'next/image'
// import { ChevronDown, ArrowUpRight, Menu, X } from 'lucide-react'
// import { useAlert } from '@/context/AlertContext'

// export default function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const [activeDropdown, setActiveDropdown] = useState(null)
//   const dropdownRefs = useRef({})
//   const headerRef = useRef(null)
//   const { showAlert } = useAlert()

//   // 준비 안된 메뉴 항목 리스트
//   const notReadyItems = ['terms']

//   // Button styles
//   const blackButtonStyle = {
//     boxSizing: 'border-box',
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: '10px 16px',
//     gap: '8px',
//     width: '140px',
//     height: '44px',
//     background: '#000000',
//     border: '1px solid #000000',
//     boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
//     borderRadius: '8px',
//     fontWeight: 400,
//     fontSize: '14px',
//     lineHeight: '24px',
//     textAlign: 'center',
//     whiteSpace: 'nowrap',
//     color: '#FFFFFF',
//     transition: 'all 0.2s ease',
//   }

//   const whiteButtonStyle = {
//     boxSizing: 'border-box',
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: '10px 16px',
//     gap: '8px',
//     width: '140px',
//     height: '44px',
//     background: '#FCFCFC',
//     border: '1px solid #000000',
//     boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
//     borderRadius: '8px',
//     fontWeight: 400,
//     fontSize: '14px',
//     lineHeight: '24px',
//     textAlign: 'center',
//     whiteSpace: 'nowrap',
//     color: '#0D0D0D',
//     transition: 'all 0.2s ease',
//   }

//   const mobileButtonStyle = {
//     width: '100%',
//   }

//   const iconStyle = {
//     display: 'inline-block',
//     flexShrink: 0,
//   }

//   // 모바일 메뉴 열릴 때 스크롤 방지
//   useEffect(() => {
//     if (isMenuOpen) {
//       document.body.style.overflow = 'hidden'
//     } else {
//       document.body.style.overflow = ''
//     }
//     return () => {
//       document.body.style.overflow = ''
//     }
//   }, [isMenuOpen])

//   // 헤더 높이 계산하여 모바일 메뉴 위치 조정
//   useEffect(() => {
//     const updateMobileMenuTop = () => {
//       const headerHeight = headerRef.current?.offsetHeight || 0
//       document.documentElement.style.setProperty(
//         '--header-height',
//         `${headerHeight}px`,
//       )
//     }

//     updateMobileMenuTop()
//     window.addEventListener('resize', updateMobileMenuTop)

//     return () => {
//       window.removeEventListener('resize', updateMobileMenuTop)
//     }
//   }, [])

//   // 외부 클릭 시 드롭다운 닫기
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (
//         activeDropdown &&
//         !dropdownRefs.current[activeDropdown]?.contains(event.target)
//       ) {
//         setActiveDropdown(null)
//       }
//     }

//     document.addEventListener('mousedown', handleClickOutside)
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside)
//     }
//   }, [activeDropdown])

//   const toggleDropdown = (dropdown) => {
//     setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
//   }

//   // 준비 안된 메뉴 클릭 처리
//   const handleNotReadyItem = (e, path) => {
//     e.preventDefault()
//     showAlert('준비중입니다.')
//     setActiveDropdown(null)
//     setIsMenuOpen(false)
//   }

//   // 링크 클릭 처리 - 준비 안된 메뉴 확인
//   const handleLinkClick = (e, href) => {
//     // href에서 첫 번째 '/'를 제거하여 경로만 추출
//     const path = href.startsWith('/') ? href.substring(1) : href

//     // 준비 안된 메뉴인지 확인
//     if (notReadyItems.some((item) => path.includes(item))) {
//       handleNotReadyItem(e, path)
//     } else {
//       setActiveDropdown(null)
//       setIsMenuOpen(false)
//     }
//   }

//   const menuItems = [
//     {
//       name: 'Home',
//       dropdown: false,
//       href: '/',
//     },
//     {
//       name: 'Resource',
//       dropdown: true,
//       items: [
//         { name: 'Blog', href: '/blog' },
//         {
//           name: 'AI News',
//           href: 'https://news.hurdlers.kr/',
//         },
//         { name: '108 Question', href: '/108-question' },
//       ],
//     },
//     {
//       name: 'About',
//       dropdown: true,
//       items: [
//         { name: 'Vision', href: '/about/vision' },
//         { name: 'Career', href: '/about/career' },
//       ],
//     },
//   ]

//   return (
//     <header
//       ref={headerRef}
//       className="py-3 px-4 md:px-8 lg:px-12 flex justify-between items-center bg-white z-50 sticky top-0 border-b border-gray-200 shadow-sm"
//     >
//       <div className="flex items-center">
//         <Link
//           href="/"
//           className="font-bold text-xl md:text-2xl mr-6 md:mr-12 text-black whitespace-nowrap"
//         >
//           <Image
//             src="/new-logo.png"
//             alt="HURDLERS101"
//             width={150}
//             height={50}
//             priority
//           />
//         </Link>

//         {/* 데스크탑 네비게이션 */}
//         <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
//           {menuItems.map((item, index) => (
//             <div
//               key={index}
//               className="relative"
//               ref={(el) => (dropdownRefs.current[item.name] = el)}
//             >
//               {item.dropdown ? (
//                 <>
//                   <button
//                     onClick={() => toggleDropdown(item.name)}
//                     className="flex items-center space-x-1 font-medium text-black hover:text-gray-600 transition-colors"
//                   >
//                     <span>{item.name}</span>
//                     <ChevronDown
//                       className={`h-4 w-4 transition-transform ${
//                         activeDropdown === item.name ? 'rotate-180' : ''
//                       }`}
//                     />
//                   </button>
//                   {activeDropdown === item.name && (
//                     <div className="absolute left-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50 py-2">
//                       {item.items.map((subItem, subIndex) => {
//                         // 준비 안된 메뉴인지 확인
//                         const path = subItem.href.startsWith('/')
//                           ? subItem.href.substring(1)
//                           : subItem.href
//                         const isNotReady = notReadyItems.some((item) =>
//                           path.includes(item),
//                         )

//                         return (
//                           <Link
//                             key={subIndex}
//                             href={subItem.href}
//                             className="block px-4 py-2 text-sm text-black hover:bg-gray-100 transition-colors"
//                             onClick={(e) =>
//                               isNotReady
//                                 ? handleNotReadyItem(e, path)
//                                 : handleLinkClick(e, subItem.href)
//                             }
//                           >
//                             {subItem.name}
//                           </Link>
//                         )
//                       })}
//                     </div>
//                   )}
//                 </>
//               ) : (
//                 <Link
//                   href={item.href}
//                   className="font-medium text-black hover:text-gray-600 transition-colors"
//                   onClick={(e) => handleLinkClick(e, item.href)}
//                 >
//                   {item.name}
//                 </Link>
//               )}
//             </div>
//           ))}
//         </nav>
//       </div>

//       <div className="flex items-center">
//         <div className="hidden sm:flex items-center space-x-4">
//           <Link href="/demo" style={blackButtonStyle}>
//             Try Demo <ArrowUpRight style={iconStyle} className="ml-2 h-4 w-4" />
//           </Link>
//           <Link
//             href="/contact"
//             style={whiteButtonStyle}
//             className="cursor-pointer"
//           >
//             Contact Us{' '}
//             <ArrowUpRight style={iconStyle} className="ml-2 h-4 w-4" />
//           </Link>
//         </div>

//         {/* 모바일 메뉴 버튼 */}
//         <button
//           className="md:hidden border border-gray-300 rounded-md p-1.5 ml-2 hover:bg-gray-50 transition-colors"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//           aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
//         >
//           {isMenuOpen ? (
//             <X className="h-5 w-5" />
//           ) : (
//             <Menu className="h-5 w-5" />
//           )}
//         </button>
//       </div>

//       {/* 모바일 메뉴 - 애니메이션 추가 */}
//       <div
//         className={`md:hidden fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out ${
//           isMenuOpen ? 'translate-x-0' : 'translate-x-full'
//         }`}
//         style={{ top: 'var(--header-height, 73px)' }}
//       >
//         <div className="p-4 overflow-y-auto max-h-[calc(100vh-var(--header-height,73px))]">
//           {menuItems.map((item, index) => (
//             <div key={index} className="mb-4">
//               {item.dropdown ? (
//                 <>
//                   <button
//                     onClick={() => toggleDropdown(item.name)}
//                     className="flex items-center justify-between w-full py-3 font-medium text-black border-b border-gray-200"
//                   >
//                     <span>{item.name}</span>
//                     <ChevronDown
//                       className={`h-4 w-4 transition-transform ${
//                         activeDropdown === item.name ? 'rotate-180' : ''
//                       }`}
//                     />
//                   </button>
//                   <div
//                     className={`mt-1 ml-4 space-y-1 overflow-hidden transition-all duration-300 ${
//                       activeDropdown === item.name
//                         ? 'max-h-96 opacity-100'
//                         : 'max-h-0 opacity-0'
//                     }`}
//                   >
//                     {item.items.map((subItem, subIndex) => {
//                       // 준비 안된 메뉴인지 확인
//                       const path = subItem.href.startsWith('/')
//                         ? subItem.href.substring(1)
//                         : subItem.href
//                       const isNotReady = notReadyItems.some((item) =>
//                         path.includes(item),
//                       )

//                       return (
//                         <Link
//                           key={subIndex}
//                           href={subItem.href}
//                           className="block py-2 text-sm text-black hover:text-gray-600 transition-colors"
//                           onClick={(e) =>
//                             isNotReady
//                               ? handleNotReadyItem(e, path)
//                               : handleLinkClick(e, subItem.href)
//                           }
//                         >
//                           {subItem.name}
//                         </Link>
//                       )
//                     })}
//                   </div>
//                 </>
//               ) : (
//                 <Link
//                   href={item.href}
//                   className="block py-3 font-medium text-black border-b border-gray-200 hover:text-gray-600 transition-colors"
//                   onClick={(e) => handleLinkClick(e, item.href)}
//                 >
//                   {item.name}
//                 </Link>
//               )}
//             </div>
//           ))}
//           <div className="mt-6 space-y-4">
//             <Link
//               href="/demo"
//               style={{ ...blackButtonStyle, ...mobileButtonStyle }}
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Try Demo{' '}
//               <ArrowUpRight style={iconStyle} className="ml-2 h-4 w-4" />
//             </Link>
//             <Link
//               href="/contact"
//               style={{ ...whiteButtonStyle, ...mobileButtonStyle }}
//               className="cursor-pointer"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Contact Us{' '}
//               <ArrowUpRight style={iconStyle} className="ml-2 h-4 w-4" />
//             </Link>
//           </div>
//         </div>
//       </div>
//     </header>
//   )
// }
