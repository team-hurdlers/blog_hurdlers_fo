// app/sitemap.xml/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Supabase 클라이언트 초기화
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET() {
  const baseUrl = 'https://101.hurdlers.kr'

  const staticPaths = [
    '',
    '/about/vision',
    '/about/career',
    '/about/career/backend-developer',
    '/blog',
    '/demo',
    '/demo/all-services',
    '/demo/service/1',
    '/demo/service/2',
    '/demo/service/3',
    '/demo/service/11',
    '/demo/service/24',
    '/demo/service/25',
    '/demo/service/34',
    '/demo/service/35',
    '/demo/service/37',
    '/demo/service/50',
    '/privacy',
    '/service/commerce-brain',
    '/service/data-intelligence',
    '/service/marketing-intelligence',
  ]

  const { data: categories, error: categoryError } = await supabase
    .from('category')
    .select('url')

  const { data: blogs, error: blogError } = await supabase
    .from('blog')
    .select('url')

  if (categoryError || blogError) {
    console.error('Supabase fetch error:', categoryError || blogError)
    return new NextResponse('Failed to fetch sitemap data', { status: 500 })
  }

  const categoryUrls =
    categories?.map((cat) => `${baseUrl}/blog/${cat.url}`) ?? []
  const blogUrls = blogs?.map((b) => `${baseUrl}/blog/detail/${b.url}`) ?? []

  const allUrls = [
    ...staticPaths.map((path) => `${baseUrl}${path}`),
    ...categoryUrls,
    ...blogUrls,
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls
    .map(
      (url) => `
    <url>
      <loc>${url}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>`,
    )
    .join('')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
