'use client'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

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
  const month = months[date.getMonth()]
  const day = date.getDate()
  const year = date.getFullYear()
  return `${month} ${day}, ${year}`
}

export default function BottomArticleList({
  category,
  categoryUrl,
  posts,
  isFull = false,
}) {
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: { perView: isFull ? 3 : 3, spacing: 20 },
    breakpoints: {
      '(max-width: 768px)': {
        slides: { perView: 1.2, spacing: 12 },
      },
    },
  })

  // Process posts to add formatted date
  const formattedPosts = posts.map((post) => ({
    ...post,
    formattedDate: formatDateToEnglish(post.published_at),
  }))

  return (
    <div className="relative px-2">
      <div className="flex items-center justify-between mb-8 px-2">
        <h2 className="text-lg font-bold uppercase tracking-wider text-black">
          {category}
        </h2>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => instanceRef.current?.prev()}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
          </button>
          <button 
            onClick={() => instanceRef.current?.next()}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <ChevronRightIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div ref={sliderRef} className="keen-slider">
        {formattedPosts.map((post) => (
          <div key={post.id} className="keen-slider__slide p-2">
            <div className="group card-hover h-full rounded-2xl">
              <Link
                href={'/blog/detail/' + post.url || '#'}
                className="block h-full"
              >
                <article className="rounded-2xl shadow-sm rounded-shadow transition bg-white h-full">
                  <div className="relative overflow-hidden rounded-t-2xl">
                    <Image
                      src={post.thumbnail || '/placeholder.jpg'}
                      alt={post.title}
                      width={400}
                      height={250}
                      className="w-full aspect-[4/3] object-cover"
                    />
                  </div>
                  <div className="py-2 px-4">
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 text-xs rounded-full border border-gray-300 text-gray-400">
                        {category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">
                      {post.title}
                    </h3>
                    <p className="text-xs text-gray-400">{post.formattedDate}</p>
                  </div>
                </article>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="text-right mt-6 pr-2">
        <Link
          href={`/blog/${categoryUrl}`}
          className="group inline-flex items-center text-sm font-medium text-black hover:text-gray-700 transition-all duration-300"
        >
          <span className="mr-2">See all</span>
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
