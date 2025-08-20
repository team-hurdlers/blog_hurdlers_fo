'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Menu,
  Smartphone,
  Search,
  CheckSquare,
  Newspaper,
} from 'lucide-react'

const categories = [
  {
    label: '전체보기',
    slug: '',
    icon: <Menu size={18} />,
    url: '/',
  },
  {
    label: 'Case Study',
    slug: 'case-studies',
    icon: <Smartphone size={18} />,
  },
  {
    label: 'AI',
    slug: 'ai',
    icon: <Search size={18} />,
  },
  {
    label: 'Data',
    slug: 'data',
    icon: <CheckSquare size={18} />,
  },
  {
    label: '허들러스 소식',
    slug: 'news',
    icon: <Newspaper size={18} />,
  }
]

export default function BlogCategoryBar() {
  const pathname = usePathname()

  return (
    <nav className="w-full border-y py-4 bg-gray-50 overflow-x-auto whitespace-nowrap">
      <div className="px-4 sm:px-8">
        {/* 데스크톱: 가로 레이아웃 */}
        <div className="hidden md:flex gap-6 items-center justify-center">
          <span className="text-xl">Jump With Us</span>
          {categories.map((cat) => {
            const href = cat.slug ? `/${cat.slug}` : cat.url
            const isActive = pathname === href

            return (
              <Link
                key={cat.slug || 'all'}
                href={href}
                className={`flex items-center gap-1 text-sm font-medium px-2 py-1 hover:text-black transition ${
                  isActive ? 'text-black' : 'text-gray-700'
                }`}
              >
                <span>{cat.icon}</span>
                <span className="text-lg">{cat.label}</span>
              </Link>
            )
          })}
        </div>

        {/* 모바일: 2행 2열 그리드 레이아웃 */}
        <div className="md:hidden">
          <div className="grid grid-cols-2 gap-3">
            {/* Jump With Us - 2칸 차지 */}
            <div className="col-span-2 text-center py-3">
              <h3 className="text-lg font-medium">Jump With Us</h3>
            </div>
            
            {categories.map((cat) => {
              const href = cat.slug ? `/${cat.slug}` : cat.url
              const isActive = pathname === href

              return (
                <Link
                  key={cat.slug || 'all'}
                  href={href}
                  className={`flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg hover:bg-gray-200 transition ${
                    isActive ? 'bg-gray-200 text-black' : 'text-gray-700'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span className="text-sm">{cat.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
