'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export default function BlogDetailContent({ blog, author, tags }) {
  const contentRef = useRef(null)
  const [headings, setHeadings] = useState([])
  const [activeHeading, setActiveHeading] = useState(null)

  useEffect(() => {
    if (!contentRef.current) return
    const contentEl = contentRef.current
    const elements = contentEl.querySelectorAll('h1, h2')
    let currentH1 = null
    const extracted = []
    let idCounter = 0

    elements.forEach((el) => {
      const level = parseInt(el.tagName[1])
      const id = `heading-${idCounter++}`
      el.id = id

      if (level === 1) {
        currentH1 = { id, text: el.textContent, level, children: [] }
        extracted.push(currentH1)
      } else if (level === 2 && currentH1) {
        currentH1.children.push({ id, text: el.textContent, level })
      }
    })

    setHeadings(extracted)
  }, [blog.body])

  useEffect(() => {
    if (!contentRef.current) return
    const container = contentRef.current

    const onScroll = () => {
      const scrollTop = container.scrollTop
      const containerTop = container.getBoundingClientRect().top
      const headingsEls = container.querySelectorAll('h1, h2')
      let currentId = null
      headingsEls.forEach((el) => {
        const offsetTop =
          el.getBoundingClientRect().top - containerTop + scrollTop
        if (offsetTop - 200 <= scrollTop) {
          currentId = el.id
        }
      })
      setActiveHeading(currentId)
    }

    container.addEventListener('scroll', onScroll, { passive: true })
    return () => container.removeEventListener('scroll', onScroll)
  }, [headings])

  const handleClick = (id) => {
    const el = document.getElementById(id)
    if (el && contentRef.current) {
      const scrollTop = el.offsetTop - 80
      contentRef.current.scrollTo({ top: scrollTop, behavior: 'smooth' })
    }
  }

  return (
    <div className="flex">
      {/* TOC 사이드바 */}
      <aside className="hidden lg:block w-64 pr-4 fixed top-0 left-0 h-full overflow-y-auto">
        <div className="text-xs font-semibold text-gray-700 mb-2">INDEX</div>
        <ul className="space-y-1">
          {headings.map((h) => (
            <li key={h.id}>
              <button
                onClick={() => handleClick(h.id)}
                className={`text-sm text-left w-full hover:underline ${
                  activeHeading === h.id ? 'font-bold text-blue-600' : ''
                }`}
              >
                {h.text}
              </button>
              {h.children?.length > 0 && (
                <ul className="ml-4 mt-1 space-y-1 border-l border-gray-200 pl-2">
                  {h.children.map((c) => (
                    <li key={c.id}>
                      <button
                        onClick={() => handleClick(c.id)}
                        className={`text-xs text-left w-full hover:underline ${
                          activeHeading === c.id
                            ? 'font-bold text-blue-600'
                            : ''
                        }`}
                      >
                        {c.text}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </aside>

      {/* 본문 */}
      <article
        ref={contentRef}
        className="flex-1 max-w-3xl prose prose-lg prose-gray min-h-screen overflow-y-auto px-4"
      >
        <h1>{blog.title}</h1>
        <p className="text-sm text-gray-500">
          By {author} · {new Date(blog.published_at).toLocaleDateString()}
        </p>
        {blog.thumbnail && (
          <Image
            width={960}
            height={540}
            src={blog.thumbnail}
            alt="썸네일"
            className="rounded-lg w-full object-cover my-6"
            priority
          />
        )}
        <div dangerouslySetInnerHTML={{ __html: blog.body }} />
        {tags.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="inline-block bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full hover:bg-gray-200"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </div>
  )
}
