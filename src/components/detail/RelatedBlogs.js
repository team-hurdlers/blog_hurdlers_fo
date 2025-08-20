'use client'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

// 날짜 포맷 헬퍼
function formatDateToEnglish(dateString) {
  const date = new Date(dateString)
  const months = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ]
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

export default function RelatedBlogs({ posts, category, categoryUrl }) {
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: { perView: 3, spacing: 20 },
    breakpoints: {
      '(max-width: 768px)': {
        slides: { perView: 1, spacing: 12 },
      },
    },
  })

  // 최대 3개의 포스트만 표시
  const limitedPosts = posts.slice(0, 6) // 여유있게 6개까지 가져오기
  const formattedPosts = limitedPosts.map((post) => ({
    ...post,
    formattedDate: formatDateToEnglish(post.published_at),
  }))

  return (
    <section className="mt-20 w-full max-w-4xl">
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="text-sm font-bold uppercase tracking-wider">
          {category} 관련 글
        </h2>
        <div className="flex items-center gap-4">
          <button onClick={() => instanceRef.current?.prev()}>
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <button onClick={() => instanceRef.current?.next()}>
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div ref={sliderRef} className="keen-slider">
        {formattedPosts.map((post) => (
          <div key={post.id} className="keen-slider__slide p-1">
            <Link href={`/post/${post.url}`}>
              <div className="shadow-xs hover:shadow-md transition duration-300 h-full rounded-lg overflow-hidden bg-white flex flex-col">
                <Image
                  src={post.thumbnail || '/placeholder.jpg'}
                  alt={post.title}
                  width={400}
                  height={250}
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="py-4 px-2 flex-1">
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 text-xs rounded-full border border-gray-300 text-gray-400">
                      {category}
                    </span>
                  </div>
                  <h3 className="font-medium text-base mb-2 line-clamp-2 text-gray-800">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-400">{post.formattedDate}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="text-right mt-4 pr-1 mb-10">
        <Link
          href={`/${categoryUrl}`}
          className="text-sm text-gray-900 hover:underline"
        >
          See all →
        </Link>
      </div>
    </section>
  )
}
