'use client'

import { useEffect, useState } from 'react'
import { useBlogStore } from '@/stores/blogStore'
import supabaseClient from '@/lib/supabase-client'
import Footer from '@/components/shared/footer'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import BlogCategoryBar from '@/components/blog/list/BlogCategoryBar'
import { getBlogCategoryJSONLD } from '@/utils/createJSONLD'

// Helper function to format date to English format (e.g., JAN 15, 2024)
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

export default function BlogCategoryPage({ categoryParams }) {
  let categoryUrl = ''
  try {
    if (categoryParams && categoryParams.value) {
      const parsed = JSON.parse(categoryParams.value)
      categoryUrl = parsed?.category || ''
    }
  } catch (e) {
    console.error('Failed to parse categoryParams.value:', e)
  }

  const [categoryName, setCategoryName] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const blogRows = useBlogStore((state) => state.blogs)

  useEffect(() => {
    async function fetchCategoryData() {
      try {
        // 1. 카테고리 정보 가져오기
        const { data: categoryData, error: categoryError } =
          await supabaseClient
            .from('category')
            .select('name')
            .eq('url', categoryUrl)
            .single()

        if (categoryError || !categoryData) {
          notFound()
        }
        const categoryName = categoryData.name
        setCategoryName(categoryName)

        // 2. 모든 게시글 가져오기 
        const { data: blogsRaw } = await supabaseClient
          .from('blog')
          .select(
            `
          id,
          title,
          published_at,
          thumbnail,
          url,
          blog_authors(author(name)),
          blog_categories(category(name, url))
        `,
          )
          .eq('is_published', true)
          .order('published_at', { ascending: false })

        // 3. 블로그 데이터 처리 및 카테고리 필터링
        const blogs = (blogsRaw || [])
          .map((blog) => ({
            ...blog,
            author: blog.blog_authors?.[0]?.author?.name || 'Unknown Author',
            category: blog.blog_categories?.[0]?.category?.name || 'Uncategorized',
            categoryUrl: blog.blog_categories?.[0]?.category?.url,
            formattedDate: formatDateToEnglish(blog.published_at),
          }))
          .filter((blog) => blog.categoryUrl === categoryUrl)

        setBlogs(blogs)
      } catch (error) {
        console.error('Error fetching category data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (blogRows.length > 0) {
      try {
        // 카테고리 URL로 필터링
        const categoryBlogdata = blogRows.filter(
          (blog) => blog.blog_categories?.[0]?.category?.url === categoryUrl,
        )

        // 해당 카테고리의 게시글이 있는 경우
        setBlogs(categoryBlogdata || [])

        // 카테고리 이름 설정 (게시글이 있는 경우에만)
        if (categoryBlogdata && categoryBlogdata.length > 0) {
          setCategoryName(
            categoryBlogdata[0].blog_categories?.[0]?.category?.name,
          )
        } else {
          // 게시글은 없지만 카테고리 정보는 필요함
          fetchCategoryOnlyName()
        }
      } catch (error) {
        console.error('Error processing blog data:', error)
      } finally {
        setIsLoading(false)
      }
    } else {
      fetchCategoryData()
    }
  }, [categoryUrl, blogRows])

  // 카테고리 이름만 가져오는 함수 (게시글이 없을 때 사용)
  async function fetchCategoryOnlyName() {
    try {
      const { data: categoryData } = await supabaseClient
        .from('category')
        .select('name')
        .eq('url', categoryUrl)
        .single()

      if (categoryData) {
        setCategoryName(categoryData.name)
      }
    } catch (error) {
      console.error('Error fetching category name:', error)
    }
  }

  const blogCategoryStructuredData = getBlogCategoryJSONLD(categoryName)

  // 로딩 중일 때 가장 깔끔한 스피너 표시
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-95 z-50">
        <div className="w-8 h-8 border-2 border-gray-200 border-t-black rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogCategoryStructuredData),
        }}
      />
      <main className="min-h-screen relative py-10 md:py-24 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-16">
            고객 경험을 한 차원 높이는 AX 마케팅
          </h1>
          <div className="w-full h-px bg-gray-200 mb-16" />
        </div>

        {/* 카테고리 바 영역을 완전한 화면 너비로 확장 */}
        <div className="w-screen relative left-[50%] right-[50%] -mx-[50vw] mb-12">
          <BlogCategoryBar />
        </div>

        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-4">
            {categoryName || 'Loading...'}
          </h2>

          {blogs.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {blogs.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/detail/${post.url}` || '#'}
                  className="rounded-lg overflow-hidden shadow-xs hover:shadow-md transition bg-white"
                >
                  <div className="relative">
                    <Image
                      src={post.thumbnail || '/placeholder.jpg'}
                      alt={post.title}
                      width={400}
                      height={250}
                      className="w-full aspect-[4/3] object-cover rounded-md"
                    />
                  </div>
                  <div className="py-4 px-2">
                    <div className="mb-3 ">
                      <span className="inline-block px-3 py-1 text-xs rounded-full border border-gray-300 text-gray-400">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="font-medium text-base mb-2 line-clamp-2 text-gray-800">
                      {post.title}
                    </h3>
                    <p className="text-xs text-gray-400 ">
                      {post.formattedDate}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <h3 className="text-lg text-gray-600 mb-2">
                이 카테고리에 게시글이 없습니다
              </h3>
              <p className="text-gray-500 mb-8 text-sm">
                다른 카테고리를 확인하거나 나중에 다시 방문해주세요.
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center px-4 py-2 bg-black text-white hover:bg-gray-800 transition rounded-lg"
              >
                <span>모든 글 보기</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-2"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
