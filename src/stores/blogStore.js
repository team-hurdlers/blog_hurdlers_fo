import { create } from 'zustand'

export const useBlogStore = create((set) => ({
  blogs: [],
  topArticle: null,
  bestArticles: [],
  otherCategories: {},
  setBlogData: ({ blogs, topArticle, bestArticles, otherCategories }) =>
    set({
      blogs,
      topArticle,
      bestArticles,
      otherCategories,
    }),
}))
