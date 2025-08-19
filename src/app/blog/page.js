import { createMetadata } from '@/utils/createMetadata'
import BlogListPage from './BlogListPage'
import { fetchBlogsFromSupabase } from '@/lib/fetchBlogs'

export const metadata = createMetadata({
  title: 'AX 마케팅 플랫폼 | 블로그 | 허들러스101',
  description:
    'AX 마케팅 플랫폼 허들러스101 공식 블로그. AI와 데이터 기반 마케팅 인사이트, 고객 경험 최적화 전략, 실전 사례와 마케팅 트렌드를 제공합니다.',
  path: '/blog',
})

export default async function Page() {
  const blogData = await fetchBlogsFromSupabase()
  return <BlogListPage initialData={blogData} />
}
