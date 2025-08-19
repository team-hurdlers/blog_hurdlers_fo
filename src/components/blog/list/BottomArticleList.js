'use client'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

function formatReadingTime(timeInMinutes) {
  if (!timeInMinutes) return '5 min read'
  return `${timeInMinutes} min read`
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

  // Process posts to add reading time
  const formattedPosts = posts.map((post) => ({
    ...post,
    readingTime: formatReadingTime(post.time),
  }))

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wider">
          {category}
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
            <article className="group card-hover shadow-lg transition duration-300 h-full rounded-2xl">
              <Link
                href={'/blog/detail/' + post.url || '#'}
                className="block h-full"
              >
                <div className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-white h-full">
                  <div className="relative">
                    <Image
                      src={post.thumbnail || '/placeholder.jpg'}
                      alt={post.title}
                      width={400}
                      height={250}
                      className="w-full aspect-[4/3] object-cover rounded-xl"
                    />
                  </div>
                  <div className="py-2 px-4">
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 text-xs bg-black rounded-full text-white">
                        {category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">
                      {post.title}
                    </h3>
                    <p className="text-xs text-gray-400">{post.readingTime}</p>
                  </div>
                </div>
              </Link>
            </article>
          </div>
        ))}
      </div>

      <div className="text-right mt-6 pr-1">
        <Link
          href={`/blog/${categoryUrl}`}
          className="inline-flex items-center text-sm font-semibold text-black hover:translate-x-1 transition-transform duration-300"
        >
          See all
          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
