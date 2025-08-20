'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function TableOfContents() {
  const [headings, setHeadings] = useState([])
  const [activeHeading, setActiveHeading] = useState(null)
  const [activeH1, setActiveH1] = useState(null)

  useEffect(() => {
    const content = document.querySelector('.prose')
    if (!content) return

    const headingElements = content.querySelectorAll('h1, h2')
    const extractedHeadings = Array.from(headingElements).map(
      (heading, index) => {
        const id = `heading-${index}`
        heading.id = id
        return {
          id,
          text: heading.textContent,
          level: parseInt(heading.tagName[1]),
        }
      },
    )

    setHeadings(extractedHeadings)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const activeId = entry.target.id
            setActiveHeading(activeId)

            const activeHeading = extractedHeadings.find(
              (h) => h.id === activeId,
            )
            if (activeHeading?.level === 2) {
              const h1Index = extractedHeadings.findIndex(
                (h) => h.id === activeId,
              )
              const parentH1 = extractedHeadings
                .slice(0, h1Index)
                .reverse()
                .find((h) => h.level === 1)
              if (parentH1) {
                setActiveH1(parentH1.id)
              }
            } else if (activeHeading?.level === 1) {
              setActiveH1(activeId)
            }
          }
        })
      },
      {
        rootMargin: '-20% 0px -35% 0px',
      },
    )

    headingElements.forEach((heading) => observer.observe(heading))

    return () => {
      headingElements.forEach((heading) => observer.unobserve(heading))
    }
  }, [])

  // ✅ 활성 인덱스가 보이도록 사이드바 스크롤 조정
  useEffect(() => {
    if (!activeHeading) return

    const sidebarContainer = document.getElementById('toc-scroll-container')
    const activeElement = document.querySelector(
      `#toc-scroll-container [data-id="${activeHeading}"]`,
    )

    if (sidebarContainer && activeElement) {
      const sidebarRect = sidebarContainer.getBoundingClientRect()
      const activeRect = activeElement.getBoundingClientRect()

      // 아래쪽에 가려져 있으면 아래로 스크롤
      if (activeRect.bottom > sidebarRect.bottom - 20) {
        sidebarContainer.scrollBy({
          top: activeRect.bottom - sidebarRect.bottom + 20,
          behavior: 'smooth',
        })
      }

      // 위쪽에 가려져 있으면 위로 스크롤
      if (activeRect.top < sidebarRect.top + 20) {
        sidebarContainer.scrollBy({
          top: activeRect.top - sidebarRect.top - 20,
          behavior: 'smooth',
        })
      }
    }
  }, [activeHeading])

  const handleHeadingClick = (id) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  const renderHeadingGroup = (headingGroup) => {
    const [h1, ...h2s] = headingGroup
    return (
      <div key={h1.id} className="flex flex-col space-y-2">
        <div
          data-id={h1.id}
          className={`
            text-xs relative py-1 cursor-pointer duration-200
            ${
              activeHeading === h1.id || activeH1 === h1.id
                ? 'text-gray-800 font-bold'
                : 'text-gray-600'
            }
            hover:underline hover:text-gray-800 hover:font-bold
          `}
          onClick={() => handleHeadingClick(h1.id)}
        >
          {h1.text}
        </div>
        {h2s.length > 0 && (
          <div className="relative ml-4 flex flex-col space-y-2 before:absolute before:left-0 before:top-0 before:h-full before:w-[1px] before:bg-gray-200">
            {h2s.map((h2) => (
              <div
                key={h2.id}
                data-id={h2.id}
                className={`
                  text-xs py-1 cursor-pointer pl-4 duration-200
                  ${
                    activeHeading === h2.id
                      ? 'text-gray-800 font-bold'
                      : 'text-gray-600'
                  }
                 hover:underline hover:text-gray-800 hover:font-bold
                `}
                onClick={() => handleHeadingClick(h2.id)}
              >
                {h2.text}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  const groupHeadings = () => {
    const groups = []
    let currentGroup = []

    headings.forEach((heading) => {
      if (heading.level === 1) {
        if (currentGroup.length > 0) {
          groups.push([...currentGroup])
        }
        currentGroup = [heading]
      } else if (heading.level === 2 && currentGroup.length > 0) {
        currentGroup.push(heading)
      }
    })

    if (currentGroup.length > 0) {
      groups.push(currentGroup)
    }

    return groups
  }

  return (
    <div className="flex flex-col px-6" id="toc-scroll-container">
      <div className="flex flex-col divide-y divide-gray-100">
        {groupHeadings().map((group, index) => (
          <div key={index} className="py-2 first:pt-0 last:pb-0">
            {renderHeadingGroup(group, index)}
          </div>
        ))}
      </div>
    </div>
  )
}
