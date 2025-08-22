// /src/app/posts/[title]/page.js

import { createMetadata } from '@/utils/createMetadata'
import BlogDetailPage from './BlogDetailPage'
import supabaseClient from '@/lib/supabase-client'
import { notFound } from 'next/navigation'

export const dynamicParams = false

export async function generateStaticParams() {
  const { data: posts } = await supabaseClient
    .from('blog')
    .select('url')
    .eq('is_published', true)

  return posts?.map((post) => ({
    title: post.url,
  })) || []
}

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

  if (error || !blog) {
    return createMetadata({
      title: '페이지를 찾을 수 없습니다 | 허들러스',
      description: '요청하신 페이지를 찾을 수 없습니다.',
      path: `/posts/${title}`,
    })
  }

  const author = blog?.blog_authors?.[0]?.author?.name || 'Hurdlers'
  const category = blog?.blog_categories?.[0]?.category?.name || ''

  return createMetadata({
    title: blog.title,
    description: `${blog.description}\n\nWritten by ${author}${category ? `\nFiled under ${category}` : ''}`,
    path: `/posts/${blog.url}`,
    image: blog.thumbnail,
  })
}

export default async function Page({ params }) {
  const { title } = params
  
  // 유효한 게시글인지 확인
  const { data: postData, error } = await supabaseClient
    .from('blog')
    .select('url')
    .eq('url', title)
    .eq('is_published', true)
    .single()

  if (error || !postData) {
    notFound()
  }

  return <BlogDetailPage detailParams={params} />
}
