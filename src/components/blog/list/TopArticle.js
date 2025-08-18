// components/TopArticle.js
import Image from 'next/image'
import Link from 'next/link'

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

export default function TopArticle({ article }) {
  if (!article) return null

  // Get article category
  const category =
    article.blog_categories?.[0]?.category?.name || 'Uncategorized'
  const formattedDate = formatDateToEnglish(article.published_at)

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
            <span className="inline-block px-3 py-1 text-xs rounded-full border border-gray-300 text-gray-400">
              {category}
            </span>
          </div>
          <h2 className="text-xl font-bold mb-2 text-gray-800">
            {article.title}
          </h2>
          <p className="text-xs text-gray-400 my-4 "> {article.description}</p>
          <p className="text-xs text-gray-400">{formattedDate}</p>
        </div>
      </div>
    </Link>
  )
}
