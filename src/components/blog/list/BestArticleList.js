// components/BestArticleList.js
import Image from 'next/image'
import Link from 'next/link'
import { Clock } from 'lucide-react'

function formatReadingTime(timeInMinutes) {
  if (!timeInMinutes) return '5 min read'
  return `${timeInMinutes} min read`
}

export default function BestArticleList({ articles }) {
  // 최대 4개의 글만 표시
  const limitedArticles = articles.slice(0, 4)

  return (
    <div className="rounded-lg px-6 bg-white h-full flex flex-col">
      <h3 className="font-bold text-2xl md:text-3xl mb-5 uppercase tracking-wider">Popular Articles</h3>
      <div className="flex-grow flex flex-col justify-between space-y-1">
        {limitedArticles.map((article) => {
          // Get category and reading time from article if available
          const category =
            article.blog_categories?.[0]?.category?.name || 'Best Article'
          const readingTime = formatReadingTime(article.time)

          return (
            <div key={article.id} className="flex-1 border-b border-gray-200 ">
              <Link href={'/blog/detail/' + article.url || '#'}>
                <div className="flex items-center space-x-4 cursor-pointer transition h-full shadow-xs hover:shadow-md rounded-lg p-2">
                  <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                    <Image
                      src={article.thumbnail || '/placeholder.jpg'}
                      alt={article.title}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 mb-1">
                      {article.title}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="inline-block px-3 py-1 text-xs bg-black rounded-full text-white">
                        {category}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock size={12} />
                        {readingTime}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
