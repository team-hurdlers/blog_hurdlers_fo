// components/TopArticle.js
import Image from 'next/image'
import Link from 'next/link'

function formatReadingTime(timeInMinutes) {
  if (!timeInMinutes) return '5 min read'
  return `${timeInMinutes} min read`
}

export default function TopArticle({ article }) {
  if (!article) return null

  // Get article category and reading time
  const category =
    article.blog_categories?.[0]?.category?.name || 'Uncategorized'
  const readingTime = formatReadingTime(article.time)

  return (
    <Link href={'/blog/detail/' + article.url || '#'}>
      <div className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-white h-full">
        <div className="relative">
          <Image
            src={article.thumbnail || '/placeholder.jpg'}
            alt={article.title}
            width={800}
            height={400}
            className="w-full aspect-[3/1] object-cover rounded-xl max-md:aspect-[2/1]"
          />
        </div>
        <div className="py-2 px-4">
          <div className="mb-3">
            <span className="inline-block px-3 py-1 text-xs bg-black rounded-full text-white">
              {category}
            </span>
          </div>
          <h2 className="text-xl font-bold mb-2 text-gray-800">
            {article.title}
          </h2>
          <p className="text-xs text-gray-400 my-4 "> {article.description}</p>
          <p className="text-xs text-gray-400">{readingTime}</p>
        </div>
      </div>
    </Link>
  )
}
