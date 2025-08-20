// /src/app/blog/list/[category]/page.js

import { createMetadata } from '@/utils/createMetadata'
import BlogCategoryPage from './BlogCategoryPage'
import supabaseClient from '@/lib/supabase-client'

export async function generateMetadata(props) {
  const params = await props.params
  const { category } = params
  
  console.log('Category URL parameter:', category)
  
  const { data: blogCategory, error } = await supabaseClient
    .from('category')
    .select(
      `
      name
    `,
    )
    .eq('url', category)
    .single()

  console.log('Database query result:', { blogCategory, error })

  const categoryName = blogCategory?.name || category || '카테고리'

  return createMetadata({
    title: `AX 마케팅 플랫폼 | 블로그 | ${categoryName} | 허들러스`,
    description:
      'AX 마케팅 플랫폼 허들러스 공식 블로그. AI와 데이터 기반 마케팅 인사이트, 고객 경험 최적화 전략, 실전 사례와 마케팅 트렌드를 제공합니다.',
    path: `/${category}`,
  })
}

export default function Page({ params }) {
  return <BlogCategoryPage categoryParams={params} />
}
