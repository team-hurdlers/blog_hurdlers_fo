// /src/app/blog/list/[category]/page.js

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
      url
    `,
    )
    .eq('url', title)
    .eq('is_published', true)
    .single()

  return createMetadata({
    title: `AX 마케팅 플랫폼 | 블로그 | ${blog.title} | 허들러스101`,
    description: blog.description,
    path: `/blog/detail/${blog.url}`,
  })
}

export default function Page({ params }) {
  return <BlogDetailPage detailParams={params} />
}
