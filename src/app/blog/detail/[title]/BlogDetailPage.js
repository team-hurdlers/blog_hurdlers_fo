'use client'

import Footer from '@/components/shared/footer'
import { notFound } from 'next/navigation'
import TableOfContents from '@/components/blog/detail/TableOfContents'
import ShareButtons from '@/components/blog/detail/ShareButtons'
import TitleShareButtons from '@/components/blog/detail/TitleShareButtons'
import Link from 'next/link'
import Image from 'next/image'
import { getBlogDetailJSONLD } from '@/utils/createJSONLD'
import RelatedBlogs from '@/components/blog/detail/RelatedBlogs'
import { useBlogStore } from '@/stores/blogStore'
import supabaseClient from '@/lib/supabase-client'
import { useEffect, useState } from 'react'

export default function BlogDetailPage({ detailParams }) {
  let title = ''
  try {
    if (detailParams && detailParams.value) {
      const parsed = JSON.parse(detailParams.value)
      title = parsed?.title || ''
    }
  } catch (e) {
    console.error('Failed to parse detailParams.value:', e)
  }
  const blogRows = useBlogStore((state) => state.blogs)

  const [blog, setBlog] = useState(null)
  const [author, setAuthor] = useState(null)
  const [tags, setTags] = useState([])
  const [structuredData, setStructuredData] = useState(null)
  const [relatedPostsRaw, setRelatedPostsRaw] = useState([])

  useEffect(() => {
    if (blogRows.length === 0) {
      fetchBlogFromSupabase()
    } else {
      const found = blogRows.find((b) => b.url === title)
      if (!found) return notFound()

      setBlog(found)
      setAuthor(found.blog_authors?.[0]?.author?.name || 'Unknown Author')
      setTags(found.blog_tags?.map((t) => t.tag?.name).filter(Boolean) || [])
      setStructuredData(
        getBlogDetailJSONLD({
          url: found.url,
          title: found.title,
          description: found.description,
          image: found.thumbnail,
          datePublished: found.published_at,
          author: found.blog_authors?.[0]?.author?.name || 'Unknown Author',
        }),
      )

      const related = blogRows.filter(
        (blogRow) => blogRow.category === found.category,
      )
      setRelatedPostsRaw(related)
    }
  }, [])

  async function fetchBlogFromSupabase() {
    const { data: blogData, error } = await supabaseClient
      .from('blog')
      .select(
        `id, title, body, description, published_at, thumbnail, url,
         blog_authors(author:author_id(name)),
         blog_categories(category:category_id(id, name, url)),
         blog_tags(tag:tag_id(name))`,
      )
      .eq('url', title)
      .eq('is_published', true)
      .single()

    if (!blogData || error) return notFound()

    setBlog(blogData)
    setAuthor(blogData.blog_authors?.[0]?.author?.name || 'Unknown Author')
    setTags(blogData.blog_tags?.map((t) => t.tag?.name).filter(Boolean) || [])
    setStructuredData(
      getBlogDetailJSONLD({
        url: blogData.url,
        title: blogData.title,
        description: blogData.description,
        image: blogData.thumbnail,
        datePublished: blogData.published_at,
        author: blogData.blog_authors?.[0]?.author?.name || 'Unknown Author',
      }),
    )

    const { data: blogCategoryRows } = await supabaseClient
      .from('blog_categories')
      .select('blog_id')
      .eq('category_id', blogData.blog_categories[0].category.id)

    const blogIds =
      blogCategoryRows?.map((row) => row.blog_id).filter(Boolean) || []

    const { data: relatedPostsRawData } = await supabaseClient
      .from('blog')
      .select(`id, title, url, thumbnail, published_at`)
      .in('id', blogIds)
      .eq('is_published', true)
      .neq('url', title)
      .order('published_at', { ascending: false })
      .limit(10)

    setRelatedPostsRaw(relatedPostsRawData)
  }

  // 로딩 중일 때 가장 깔끔한 스피너 표시
  if (!blog)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-95 z-50">
        <div className="w-8 h-8 border-2 border-gray-200 border-t-black rounded-full animate-spin"></div>
      </div>
    )
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* <Header /> */}
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow relative px-0 sm:px-6 lg:px-0">
          <div className="w-full bg-white text-black">
            <div className="flex flex-col lg:flex-row w-full h-full bg-white relative">
              {/* 왼쪽 사이드바 - 공간 확보용 */}
              <div className="hidden lg:block w-[220px] min-w-[220px] flex-shrink-0">
                {/* 사이드바 공간 확보 */}
              </div>

              {/* 왼쪽 사이드바 - 실제 내용 */}
              <div
                id="toc-scroll-container"
                className="w-[220px] min-w-[220px] border-r border-[#e0e0e0] bg-white fixed left-0 top-0 bottom-0 overflow-y-auto hidden lg:block pb-20"
              >
                <Link
                  href="/blog"
                  className="flex items-center px-4 py-3 text-sm text-[#666] border-b border-[#e0e0e0] cursor-pointer hover:bg-[#f5f5f5]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  <span className="ml-2 text-black font-bold">
                    All articles
                  </span>
                </Link>
                <div className="sidebar-nav">
                  <div className="px-6 pt-[30px] pb-[30px] text-xs font-semibold text-[#333]">
                    INDEX
                  </div>
                  <TableOfContents />
                </div>
              </div>

              {/* 본문 콘텐츠 - 중앙 정렬 */}
              <div className="w-full lg:w-[calc(100%-500px)] max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 flex-grow flex justify-center flex-col items-center">
                <div className="max-w-3xl w-full py-8 sm:py-12">
                  {/* 제목과 공유 아이콘 */}
                  <div className="flex max-md:flex-col items-start justify-between gap-4 mb-6">
                    <h1 className="text-4xl sm:text-5xl font-medium">
                      {blog.title}
                    </h1>
                    <TitleShareButtons title={blog.title} />
                  </div>

                  {/* Author와 Date를 한 줄로 */}
                  <div className="flex items-center justify-between mb-8 sm:mb-10">
                    <div className="text-sm font-medium text-black">
                      <span className="text-gray-500 text-xs">Author</span>{' '}
                      <span>{author}</span>
                    </div>
                    <div className="text-sm text-black">
                      <span className="text-gray-500 text-xs">Date</span>{' '}
                      {new Date(blog.published_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                  </div>

                  {/* 썸네일 */}
                  {blog.thumbnail && (
                    <div className="w-full mb-8 sm:mb-10 rounded overflow-hidden shadow">
                      <div className="flex justify-center">
                        <Image
                          width={828}
                          height={828}
                          src={blog.thumbnail}
                          alt="썸네일"
                          className="w-full h-auto object-cover rounded-lg"
                          priority
                        />
                      </div>
                    </div>
                  )}

                  {/* 본문 */}
                  <div
                    className="blog-content prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: blog.body }}
                  />

                  {/* 태그 */}
                  {tags.length > 0 && (
                    <div className="mt-8 sm:mt-12 pt-6 border-t border-gray-200">
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-block bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full hover:bg-gray-200"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 모바일용 하단 공유 버튼 */}
                  <div className="mt-8 block lg:hidden">
                    <ShareButtons title={blog.title} />
                    <div className="mt-4">
                      <Link
                        href="/contact"
                        className="flex items-center justify-center px-[14px] py-[10px] bg-black hover:bg-gray-900 text-white text-sm rounded cursor-pointer w-full"
                      >
                        <span>Contact Us</span>
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
                  </div>
                </div>

                {/* 관련 블로그 */}
                <RelatedBlogs
                  posts={relatedPostsRaw}
                  category={blog.blog_categories[0].category.name}
                  categoryUrl={blog.blog_categories[0].category.url}
                />
              </div>

              {/* 오른쪽 사이드바 - 공간 확보용 */}
              <div className="hidden lg:block w-[280px] min-w-[280px] flex-shrink-0">
                {/* 사이드바 공간 확보 */}
              </div>

              {/* 오른쪽 사이드바 - 실제 내용 */}
              <div className="w-[280px] min-w-[280px] border-l border-[#e0e0e0] bg-white fixed right-0 top-0 bottom-0 overflow-y-auto hidden lg:block">
                <div className="p-5">
                  <h2 className="font-bold text-lg mb-4">SHARE ARTICLE</h2>
                  <ShareButtons title={blog.title} />
                  <div className="mt-8">
                    <Link
                      href="https://v4-dev-hurdlers.framer.website/contact"
                      className="flex items-center justify-center px-[14px] py-[10px] bg-black hover:bg-gray-900 text-white text-sm rounded cursor-pointer"
                    >
                      <span>Contact Us</span>
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
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}
