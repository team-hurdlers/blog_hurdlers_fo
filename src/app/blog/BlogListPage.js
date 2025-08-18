'use client'

import { useEffect } from 'react'
import Header from '@/components/shared/header'
import Footer from '@/components/shared/footer'
import TopArticle from '@/components/blog/list/TopArticle'
import BestArticleList from '@/components/blog/list/BestArticleList'
import BottomArticleList from '@/components/blog/list/BottomArticleList'
import BlogCategoryBar from '@/components/blog/list/BlogCategoryBar'
import { getBlogJSONLD } from '@/utils/createJSONLD'
import { useBlogStore } from '@/stores/blogStore'


// 메인페이지에 표시할 카테고리 순서
const MAIN_CATEGORIES = ['Case Study', 'AI', 'Data', '허들러스 소식']

export default function BlogListPage({ initialData }) {
  const setBlogData = useBlogStore((state) => state.setBlogData)
  const { blogs, topArticle, bestArticles, otherCategories } = useBlogStore()

  useEffect(() => {
    setBlogData(initialData)
  }, [initialData, setBlogData])

  const blogStructuredData = getBlogJSONLD()

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogStructuredData) }}
      />
      <main className="min-h-screen relative pt-24">
        <div className="py-12 md:py-28 px-4 sm:px-6 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-7xl font-bold text-center mb-20 fadeInUp">
              고객 경험을 한 차원 높이는 AX 마케팅
            </h1>
            <div className="w-full h-px bg-gray-300 mb-20"></div>
            <div className="grid md:grid-cols-10 gap-10 items-start md:items-stretch">
              <div className="md:col-span-6 h-auto md:h-full fadeInUp" style={{ animationDelay: '0.2s' }}>
                <TopArticle article={topArticle} />
              </div>
              <div className="md:col-span-4 h-auto md:h-full fadeInUp" style={{ animationDelay: '0.4s' }}>
                <BestArticleList articles={bestArticles} />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <BlogCategoryBar />
        </div>
        <div className="py-12 md:py-28 px-4 sm:px-6 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="space-y-20 text-2xl">
              {MAIN_CATEGORIES.map((categoryName, index) => {
                const articles = otherCategories[categoryName] || []
                // 카테고리에 글이 없어도 빈 섹션으로 표시 (또는 최소 1개 글이 있을 때만 표시)
                if (articles.length === 0) return null
                
                return (
                  <div key={categoryName} className="fadeInUp" style={{ animationDelay: `${0.6 + (index * 0.2)}s` }}>
                    <BottomArticleList
                      key={categoryName}
                      category={categoryName}
                      categoryUrl={articles[0]?.categoryUrl || ''}
                      posts={articles}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
