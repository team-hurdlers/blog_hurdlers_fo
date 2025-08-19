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

export default function BlogCategoryBar() {
  const pathname = usePathname()

  return (
    <nav className="w-full border-y py-4 bg-gray-50 overflow-x-auto whitespace-nowrap">
      <div className="flex max-md:flex-col gap-6 px-4 sm:px-8 items-center justify-center">
        <span className="text-xl max-md:text-lg">Jump With Us</span>
        {categories.map((cat) => {
          const href = cat.slug ? `/blog/${cat.slug}` : cat.url
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
              <span className="text-lg max-md:text-sm">{cat.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
