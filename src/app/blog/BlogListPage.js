'use client'

import { useEffect } from 'react'
// import Header from '@/components/shared/header'
import Footer from '@/components/shared/footer'
import TopArticle from '@/components/blog/list/TopArticle'
import BestArticleList from '@/components/blog/list/BestArticleList'
import BottomArticleList from '@/components/blog/list/BottomArticleList'
import BlogCategoryBar from '@/components/blog/list/BlogCategoryBar'
import { getBlogJSONLD } from '@/utils/createJSONLD'
import { useBlogStore } from '@/stores/blogStore'

const CATEGORY_URL_MAP = {
  '허들러스101 서비스 활용 노하우': 'services',
  'AI Insight': 'ai-insight',
  'AI 성공사례': 'ai-cases',
  '허들러스101 소식': 'news',
  '팀 허들러스101': 'team',
}

export default function BlogListPage({ initialData }) {
  const setBlogData = useBlogStore((state) => state.setBlogData)
  const { blogs, topArticle, bestArticles, otherCategories } = useBlogStore()

  useEffect(() => {
    setBlogData(initialData)
  }, [initialData, setBlogData])

  const blogStructuredData = getBlogJSONLD()

  return (
    <>
      {/* <Header /> */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogStructuredData) }}
      />
      <main className="min-h-screen relative">
        <div className="py-10 md:py-24 px-4 sm:px-6 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-7xl font-bold text-center mb-16">
              고객 경험을 한 차원 높이는 AX 마케팅
            </h1>
            <div className="w-full h-px bg-gray-300 mb-16"></div>
            <div className="grid md:grid-cols-10 gap-8 items-start md:items-stretch">
              <div className="md:col-span-6 h-auto md:h-full">
                <TopArticle article={topArticle} />
              </div>
              <div className="md:col-span-4 h-auto md:h-full">
                <BestArticleList articles={bestArticles} />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <BlogCategoryBar />
        </div>
        <div className="py-10 md:py-24 px-4 sm:px-6 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="space-y-16">
              {Object.entries(otherCategories).map(
                ([categoryName, articles]) => (
                  <div key={categoryName}>
                    <BottomArticleList
                      key={categoryName}
                      category={categoryName}
                      categoryUrl={CATEGORY_URL_MAP[categoryName]}
                      posts={articles}
                    />
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
