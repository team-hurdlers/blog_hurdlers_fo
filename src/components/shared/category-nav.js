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
    url: '/blog',
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

export default function CategoryNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-[69px] left-0 right-0 z-40 w-full bg-white border-b border-gray-200">
      <div className="w-full px-6 py-3">
        <div className="flex items-center justify-center space-x-8">
          <span className="text-lg font-semibold text-gray-800">Jump With Us</span>
          <div className="flex items-center space-x-1">
            {categories.map((cat) => {
              const href = cat.slug ? `/blog/${cat.slug}` : cat.url
              const isActive = pathname === href

              return (
                <Link
                  key={cat.slug || 'all'}
                  href={href}
                  className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'text-black bg-gray-100' 
                      : 'text-gray-600 hover:text-black hover:bg-gray-50'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}