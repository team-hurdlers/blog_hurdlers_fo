// /src/app/posts/[title]/page.js

import { createMetadata } from '@/utils/createMetadata'
import BlogDetailPage from './BlogDetailPage'
import supabaseClient from '@/lib/supabase-client'

export async function generateMetadata(props) {
  const params = await props.params
  const { title } = params

  const { data: blog, error } = await supabaseClient
    .from('blog')
    .select(
      `
      title,
      description,
      url,
      thumbnail,
      blog_authors(author:author_id(name)),
      blog_categories(category:category_id(name))
    `,
    )
    .eq('url', title)
    .eq('is_published', true)
    .single()

  const author = blog?.blog_authors?.[0]?.author?.name || 'Hurdlers'
  const category = blog?.blog_categories?.[0]?.category?.name || ''

  return createMetadata({
    title: blog.title,
    description: `${blog.description}\n\nWritten by ${author}${category ? `\nFiled under ${category}` : ''}`,
    path: `/posts/${blog.url}`,
    image: blog.thumbnail,
  })
}

export default function Page({ params }) {
  return <BlogDetailPage detailParams={params} />
}
