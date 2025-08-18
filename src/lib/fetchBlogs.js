import supabaseClient from '@/lib/supabase-client'

export async function fetchBlogsFromSupabase() {
  const { data: blogsRaw, error } = await supabaseClient
    .from('blog')
    .select(
      `id, title, published_at, thumbnail, url, description, section, body, 
       blog_authors(author(name)), 
       blog_categories(category(name, url))`,
    )
    .eq('is_published', true)
    .order('published_at', { ascending: false })

  if (error) throw error

  const processedBlogs = blogsRaw.map((blog) => ({
    ...blog,
    author: blog.blog_authors?.[0]?.author?.name || 'Unknown Author',
    category: blog.blog_categories?.[0]?.category?.name || 'Uncategorized',
    categoryUrl: blog.blog_categories?.[0]?.category?.url || '',
  }))

  const top = processedBlogs.find((b) => b.section === 'top')
  const best = processedBlogs.filter((b) => b.section === 'best')
  
  // 모든 글을 카테고리별로 그룹화 (top, best 상관없이 모든 글 포함)
  const otherBlogs = processedBlogs
  
  const groupedByCategory = otherBlogs.reduce((acc, blog) => {
    const category = blog.category
    if (!acc[category]) acc[category] = []
    acc[category].push(blog)
    return acc
  }, {})

  return {
    blogs: processedBlogs,
    topArticle: top,
    bestArticles: best,
    otherCategories: groupedByCategory,
  }
}
