// /src/app/blog/list/[category]/page.js

import { createMetadata } from '@/utils/createMetadata'
import BlogCategoryPage from './BlogCategoryPage'
import supabaseClient from '@/lib/supabase-client'
import { notFound } from 'next/navigation'

export const dynamicParams = false

export async function generateStaticParams() {
  const { data: categories } = await supabaseClient
    .from('category')
    .select('url')

  return categories?.map((category) => ({
    category: category.url,
  })) || []
}

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

  if (error || !blogCategory) {
    return createMetadata({
      title: '페이지를 찾을 수 없습니다 | 허들러스',
      description: '요청하신 카테고리를 찾을 수 없습니다.',
      path: `/${category}`,
    })
  }

  const categoryName = blogCategory?.name || category || '카테고리'

  return createMetadata({
    title: `AX 마케팅 플랫폼 | 블로그 | ${categoryName} | 허들러스`,
    description:
      'AX 마케팅 플랫폼 허들러스 공식 블로그. AI와 데이터 기반 마케팅 인사이트, 고객 경험 최적화 전략, 실전 사례와 마케팅 트렌드를 제공합니다.',
    path: `/${category}`,
  })
}

export default async function Page({ params }) {
  const { category } = params
  
  // 유효한 카테고리인지 확인
  const { data: categoryData, error } = await supabaseClient
    .from('category')
    .select('url')
    .eq('url', category)
    .single()

  if (error || !categoryData) {
    notFound()
  }

  return <BlogCategoryPage categoryParams={params} />
}
