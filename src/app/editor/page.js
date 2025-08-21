'use client'

import React, { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { toast, ToastContainer } from 'react-toastify'
import { useRouter } from 'next/navigation'
import supabaseClient from '../../../lib/supabase-client'
import '@toast-ui/editor/dist/toastui-editor.css'
import 'react-toastify/dist/ReactToastify.css'
import AuthButton from '@/components/editor/AuthButton'
import { useSession } from 'next-auth/react'
import { notFound } from 'next/navigation'

// dynamic import
const Editor = dynamic(
  () => import('@toast-ui/react-editor').then((mod) => mod.Editor),
  { ssr: false },
)

// 마크다운 프리뷰 및 탭 숨기기 CSS
const editorStyles = `
.toc-container {
  max-height: calc(100vh - 150px);
  overflow-y: auto;
  scrollbar-width: thin;
}

.toc-container::-webkit-scrollbar {
  width: 4px;
}

.toc-container::-webkit-scrollbar-thumb {
  background-color: #cbd5e0;
  border-radius: 2px;
}

.toc-container::-webkit-scrollbar-track {
  background-color: #f7fafc;
}

.toc-sidebar {
  position: sticky;
  top: 24px;
  align-self: flex-start;
}

/* 반응형 스타일 */
@media (max-width: 1024px) {
  .toc-sidebar {
    display: none; /* 모바일에서는 숨김 또는 다른 위치로 이동 */
  }
}
.custom-scrollspy {
  list-style: none;
  padding: 0;
  margin: 0;
}
  
.custom-scrollspy {
  list-style: none;
  padding: 0;
  margin: 0;
}
  
/* Case Study Layout Styles */
.case-study-layout {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  position: relative;
}

.case-study-sidebar {
  width: 220px;
  min-width: 220px;
  border-right: 1px solid #e0e0e0;
  background-color: #ffffff;
  height: 100vh;
  position: fixed;
  left: 48px;
  top: 50px;
}

.case-study-content {
  flex: 1;
  padding: 20px 40px;
  max-width: 960px;
  margin: 0 auto;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
}

.case-study-content > div {
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
}

.case-study-right-sidebar {
  width: 280px;
  min-width: 280px;
  border-left: 1px solid #e0e0e0;
  background-color: #ffffff;
  height: 100vh;
  position: fixed;
  right: 0;
  top: 50px;
}

.back-button {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  font-size: 14px;
  color: #666;
  border-bottom: 1px solid #e0e0e0;
}

.sidebar-nav-item {
  padding: 10px 16px;
  margin: 0;
  cursor: pointer;
  color: #333;
  font-size: 13px;
  border-left: 3px solid transparent;
  border-bottom: 1px solid #eee;
  transition: all 0.2s ease;
  position: relative; /* 위치 관련 속성 추가 */
}
.sidebar-nav > div {
  padding: 15px 16px;
  font-size: 10px;
}
.sidebar-nav > div:first-child {
  padding-left: 30px;
  padding-top: 30px;
  font-size: 13px;
}
.sidebar-nav-item a {
  display: block;
  color: inherit;
  text-decoration: none;
  width: 100%; /* 전체 영역 클릭 가능하도록 */
}

.share-section > span {
  display: flex;
  align-items: center;
  font-size: 13px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e0e0e0;
  padding: 12px 16px;
  font-weight: bold;
}

.contact-button {
  border-radius: 4px;
  cursor: pointer;
  background-color: black;
  color: white;
  display: flex;
  align-items: center;
  padding: 10px 14px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  margin-top : 10px;
  display: flex;
  justify-content: center; 
  align-items: center;
}

.share-buttons {
  display: flex;
  flex-direction: column;
  margin : 0 20px;
}

.share-button {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  color: #333;
   border-bottom: 1px solid rgb(232, 232, 232);
}
  
/* 제목 스타일 */
.preview-layout h1 {
  text-align: center;
  font-size: 2.5rem !important;
  font-weight: 800 !important;
  margin-bottom: 1.5rem !important;
  color: #111 !important;
  line-height: 1.2 !important;
}

.preview-layout h2 {
  font-size: 1.6rem !important;
  font-weight: 700 !important;
  margin-bottom: 1.5rem !important;
  color: #111 !important;
  line-height: 1.2 !important;
}

.preview-layout h3 {
  font-size: 1.5rem !important;
  font-weight: 600 !important;
  margin-bottom: 1.5rem !important;
  color: #111 !important;
  line-height: 1.2 !important;
}

.preview-layout h4 {
  font-size: 1.3rem !important;
  font-weight: 600 !important;
  margin-bottom: 1.5rem !important;
  color: #111 !important;
  line-height: 1.2 !important;
}

.preview-layout h5 {
  font-size: 1.1rem !important;
  font-weight: 600 !important;
  margin-bottom: 1.5rem !important;
  color: #111 !important;
  line-height: 1.2 !important;
}

.toastui-editor-popup-body li:nth-child(6), .toastui-editor-popup-body li:nth-child(7){
  display: none !important;
}

/* 이미지 스타일 */
.preview-layout img {
  max-width: 100% !important;
  height: auto !important;
  margin-bottom: 1.5rem !important;
}

.preview-layout p {
  margin-bottom: 1.5rem !important;
  font-size: 1rem !important;
  line-height: 1.8 !important;
  color: #333 !important;
}

.preview-layout blockquote {
  border-left: 4px solid #ddd !important;
  padding-left: 1rem !important;
  color: #666 !important;
  font-style: italic !important;
  margin: 1.5rem 0 !important;
}

.preview-layout pre {
  background-color: #f5f5f5 !important;
  padding: 1rem !important;
  border-radius: 4px !important;
  overflow-x: auto !important;
  margin: 1.5rem 0 !important;
}

.preview-layout code {
  background-color: #f5f5f5 !important;
  padding: 0.2rem 0.4rem !important;
  border-radius: 3px !important;
  font-family: monospace !important;
}

.preview-layout ul,
.preview-layout ol {
  margin: 1.5rem 0 !important;
  padding-left: 2rem !important;
}

.preview-layout li {
  margin-bottom: 0.5rem !important;
}

.preview-layout a {
  color: #0066cc !important;
  text-decoration: none !important;
}

.preview-layout a:hover {
  text-decoration: underline !important;
}

/* 에디터 UI 요소 숨기기 */
.toastui-editor-md-preview,
.toastui-editor-md-splitter,
.toastui-editor-mode-switch,
.toastui-editor-tabs,
.toastui-editor .tab-item,
.toastui-editor .tab-container {
  display: none !important;
}

/* 에디터 컨테이너 스타일 */
.toastui-editor-md-container .toastui-editor-md-editor {
  width: 100% !important;
  background-color: white !important;
}

.toastui-editor-defaultUI-toolbar {
  border-bottom: 1px solid #ebedf2 !important;
}

/* 툴바 텍스트 색상 수정 */
.toastui-editor-toolbar-icons {
  color: #000000 !important;
}

.toastui-editor-toolbar-dropdown-item {
  color: #000000 !important;
}

.toastui-editor-popup-body {
  color: #000000 !important;
}

.toastui-editor-popup {
  color: #000000 !important;
}

/* 프리뷰 섹션 스타일 */
.preview-container {
  padding: 2rem;
  background-color: white;
  color: #333;
  height: 100%;
  overflow-y: auto;
}

.preview-content {
  max-width: 800px;
  margin: 0 auto;
  font-family: 'Noto Sans KR', sans-serif;
}

.preview-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: #111;
  line-height: 1.2;
}

.preview-thumbnail {
  margin-bottom: 2rem;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.preview-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.preview-body {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;
}

.preview-tags {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
}

.tag-item {
  display: inline-block;
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 50px;
  background-color: #f5f5f5;
  color: #555;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.tag-item:hover {
  background-color: #eee;
}

/* 마크다운 프리뷰 스타일 */
.markdown-content {
  color: #333;
  line-height: 1.6;
  font-size: 1.1rem;
}

/* ul, li 스타일 개선 */
.markdown-content ul,
.preview-layout ul {
  list-style: none;
  padding-left: 1.5rem;
  margin: 1.5rem 0;
}

.markdown-content ul li,
.preview-layout ul li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.75rem;
  line-height: 1.6;
}

.markdown-content ul li::before,
.preview-layout ul li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.75rem;
  transform: translateY(-50%);
  width: 6px;
  height: 6px;
  background-color: #666;
  border-radius: 50%;
}

/* 중첩된 리스트 스타일 */
.markdown-content ul ul,
.preview-layout ul ul {
  margin: 0.75rem 0 0.75rem 1rem;
}

.markdown-content ul ul li::before,
.preview-layout ul ul li::before {
  width: 4px;
  height: 4px;
  border: 1px solid #666;
  background-color: transparent;
}

/* 순서 있는 리스트 스타일 */
.markdown-content ol,
.preview-layout ol {
  list-style: decimal;
  padding-left: 1.5rem;
  margin: 1.5rem 0;
}

.markdown-content ol li,
.preview-layout ol li {
  padding-left: 0.5rem;
  margin-bottom: 0.75rem;
  line-height: 1.6;
}

/* 중첩된 순서 있는 리스트 스타일 */
.markdown-content ol ol,
.preview-layout ol ol {
  list-style-type: lower-alpha;
  margin: 0.75rem 0 0.75rem 1rem;
}

.markdown-content ol ol ol,
.preview-layout ol ol ol {
  list-style-type: lower-roman;
}

.markdown-content h1 {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 2rem 0 1.5rem;
  color: #111;
  line-height: 1.2;
}

.markdown-content h2 {
  font-size: 2rem;
  font-weight: 700;
  margin: 2rem 0 1.2rem;
  color: #111;
  line-height: 1.2;
}

.markdown-content h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 1.8rem 0 1rem;
  color: #111;
  line-height: 1.2;
}

.markdown-content h4 {
  font-size: 1.3rem;
  font-weight: 600;
  margin: 1.5rem 0 1rem;
  color: #111;
  line-height: 1.2;
}

.markdown-content h5 {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 1.2rem 0 0.8rem;
  color: #111;
  line-height: 1.2;
}

.markdown-content p {
  margin-bottom: 1.2rem;
  color: #333;
}

.markdown-content img {
  max-width: 100%;
  height: auto;
  margin: 1.5rem 0;
  border-radius: 4px;
}

.markdown-content blockquote {
  margin: 1.5rem 0;
  padding: 1rem 1.5rem;
  border-left: 4px solid #ddd;
  background-color: #f8f9fa;
  color: #666;
  font-style: italic;
}

.markdown-content pre {
  margin: 1.5rem 0;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 4px;
  overflow-x: auto;
}

.markdown-content code {
  background-color: #f8f9fa;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: monospace;
  font-size: 0.9em;
  color: #e83e8c;
}

.markdown-content ul,
.markdown-content ol {
  margin: 1.2rem 0;
  padding-left: 2rem;
}

.markdown-content li {
  margin-bottom: 0.5rem;
}

.markdown-content a {
  color: #0066cc;
  text-decoration: none;
}

.markdown-content a:hover {
  text-decoration: underline;
}

.markdown-content hr {
  margin: 2rem 0;
  border: 0;
  border-top: 1px solid #eee;
}

.markdown-content table {
  width: 100%;
  margin: 1.5rem 0;
  border-collapse: collapse;
}

.markdown-content th,
.markdown-content td {
  padding: 0.75rem;
  border: 1px solid #ddd;
}

.markdown-content th {
  background-color: #f8f9fa;
  font-weight: 600;
}
.sidebar-nav-item {
  padding: 4px 0;
}
.sidebar-nav-item > div {
  cursor: pointer;
  padding-left: 8px;
}
.sidebar-nav-item .text-xs {
  padding-left: 12px;
  display: block;
}

.markdown-content,
.preview-layout,
.section-container {
  white-space: normal !important;
  word-break: break-word !important;
}

`

export default function BlogEditorPage() {
  if (process.env.VERCEL_ENV === 'production') {
    notFound()
  }

  const { data: session } = useSession()

  const router = useRouter()
  const [id, setId] = useState(0)
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [url, setUrl] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailURL, setThumbnailURL] = useState('') // 썸네일 URL 직접 입력 옵션
  const [isPublished, setIsPublished] = useState(false)
  const [tags, setTags] = useState('')
  const [description, setDescription] = useState('')
  const [authorId, setAuthorId] = useState(1) // 기본값 1로 설정
  const [authorName, setAuthorName] = useState('유성민')
  const [categoryId, setCategoryId] = useState(3) // 기본값 1로 설정
  const [categoryName, setCategoryName] = useState('AI Insight')

  const [publishedAt, setPublishedAt] = useState(
    new Date().toISOString().slice(0, 10),
  ) // published_at은 date 타입
  const [isPreviewMode, setIsPreviewMode] = useState(false) // isPreviewMode 상태 복원
  const [availableAuthors, setAvailableAuthors] = useState([]) // availableTags 제거
  const [availableCategories, setAvailableCategories] = useState([])
  const [thumbnailType, setThumbnailType] = useState('AI') // 'AI' 또는 'file'
  const [isMetaSectionOpen, setIsMetaSectionOpen] = useState(true) // 새로운 상태 추가
  const editorRef = useRef()
  // 에디터 내용을 위한 상태 추가
  const initialEditorValue = '내용을 쓰면 오른쪽에 미리보기가 나옵니다.'
  const [markdownContent, setMarkdownContent] = useState(initialEditorValue)
  // 블로그 목록 상태와 사이드바 상태 추가
  const [blogList, setBlogList] = useState([])
  const [showBlogList, setShowBlogList] = useState(false)
  const [showModifyBlog, setShowModifyBlog] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [headings, setHeadings] = useState([])
  const [activeHeading, setActiveHeading] = useState([])
  const previewRef = useRef(null)
  const [isTopArticle, setIsTopArticle] = useState(false)
  const [isBestArticle, setIsBestArticle] = useState(false)
  const [errors, setErrors] = useState({
    title: false,
    url: false,
    thumbnailURL: false,
    description: false,
    tags: false,
    authorId: false,
    categoryId: false,
    content: false,
    section: false, // 추가: Top/Best 선택 에러
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImages, setGeneratedImages] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [selectedAuthors, setSelectedAuthors] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [thumbnailFile, setThumbnailFile] = useState(null)
  const [uploadedThumbnail, setUploadedThumbnail] = useState(null)
  const [editorWidth, setEditorWidth] = useState(50) // 에디터 너비 상태 추가 (50%)

  // 태그 및 작성자 정보 불러오기 - 태그 관련 로직 제거
  useEffect(() => {
    const fetchAuthors = async () => {
      // 작성자 목록 불러오기
      const { data: authorsData, error: authorsError } = await supabaseClient
        .from('author')
        .select('*')

      if (!authorsError && authorsData) {
        setAvailableAuthors(authorsData)
      }
    }

    const fetchCategories = async () => {
      // 작성자 목록 불러오기
      const { data: categoriesData, error: categoriesError } =
        await supabaseClient.from('category').select('*')

      if (!categoriesError && categoriesData) {
        setAvailableCategories(categoriesData)
      }
    }

    fetchCategories()
    fetchAuthors()
  }, [])

  const handleHeadingClick = (id) => {
    const el = document.querySelector(`#${id}`)
    if (el && previewRef.current) {
      const containerTop = previewRef.current.getBoundingClientRect().top
      const elTop = el.getBoundingClientRect().top
      const offset = elTop - containerTop + previewRef.current.scrollTop - 80 // 여백 고려

      previewRef.current.scrollTo({
        top: offset,
        behavior: 'smooth',
      })

      setActiveHeading(id)
    }
  }

  const assignHeadingIds = () => {
    setTimeout(() => {
      const content = document.querySelector('.case-study-content')
      if (!content) return

      const headingElements = content.querySelectorAll('h1, h2')
      headingElements.forEach((el, index) => {
        el.id = `heading-${index}`
      })
    }, 200)
  }

  // 블로그 목록 가져오기
  const fetchBlogList = async () => {
    const { data, error } = await supabaseClient
      .from('blog')
      .select('id, title, is_published', 'published_at')
      .order('published_at', { ascending: false })

    if (error) {
      console.error('블로그 목록 불러오기 실패:', error)
      toast.error('블로그 목록을 불러오는데 실패했습니다.')
      return
    }

    setBlogList(data || [])
  }

  // 블로그 목록 버튼 클릭 핸들러
  const handleBlogListClick = async () => {
    // 현재 상태를 토글
    const newState = !showBlogList
    setShowBlogList(newState)
    setIsPreviewMode(false)

    // 블로그 목록이 표시될 예정이고 아직 데이터가 없으면 가져오기
    if (newState && blogList.length === 0) {
      await fetchBlogList()
    }
  }

  // 블로그 항목 클릭 핸들러
  const handleBlogItemClick = async (blogId) => {
    // Fetch blog data
    const { data, error } = await supabaseClient
      .from('blog')
      .select('*')
      .eq('id', blogId)
      .single()

    if (error) {
      console.error('[handleBlogItemClick] 블로그 데이터 불러오기 실패:', error)
      toast.error('블로그 데이터를 불러오는데 실패했습니다.')
      return
    }

    // Fetch tags for this blog
    const { data: authorsData, error: authorsError } = await supabaseClient
      .from('blog_authors')
      .select(
        `
      author_id,
      author:author_id(id, name)
    `,
      )
      .eq('blog_id', blogId)

    if (authorsError) {
      console.error(
        '[handleBlogItemClick] 저자 데이터 불러오기 실패:',
        authorsError,
      )
      // toast.error('태그 데이터를 불러오는데 실패했습니다.'); // 에디터 업데이트 실패와 무관하므로 주석처리 가능
    }
    const authorString = authorsData[0].author.name
    const authorNumber = authorsData[0].author.id

    const { data: categoriesData, error: categoriesError } =
      await supabaseClient
        .from('blog_categories')
        .select(
          `
      category_id,
      category:category_id(id, name)
    `,
        )
        .eq('blog_id', blogId)

    if (categoriesError) {
      console.error(
        '[handleBlogItemClick] 카테고리 데이터 불러오기 실패:',
        categoriesError,
      )
      // toast.error('태그 데이터를 불러오는데 실패했습니다.'); // 에디터 업데이트 실패와 무관하므로 주석처리 가능
    }
    const categoryString = categoriesData[0].category.name
    const categoryNumber = categoriesData[0].category.id

    const { data: tagsData, error: tagsError } = await supabaseClient
      .from('blog_tags')
      .select(
        `
      tag_id,
      tag:tag_id(id, name)
    `,
      )
      .eq('blog_id', blogId)

    if (tagsError) {
      console.error(
        '[handleBlogItemClick] 태그 데이터 불러오기 실패:',
        tagsError,
      )
      // toast.error('태그 데이터를 불러오는데 실패했습니다.'); // 에디터 업데이트 실패와 무관하므로 주석처리 가능
    }

    // Extract tag names and format as "#tag1 #tag2 #tag3"
    let tagString = ''
    if (tagsData && tagsData.length > 0) {
      tagString = tagsData.map((item) => `#${item.tag.name}`).join(' ')
    }

    // 데이터로 폼 업데이트
    if (data) {
      setId(data.id)
      setTitle(data.title || '')
      setSlug(`https://blog.hurdlers.kr/posts/${data.id}`) // 슬러그 업데이트
      setUrl(data.url || '')
      setThumbnailURL(data.thumbnail || '')
      // 썸네일 미리보기 설정
      if (data.thumbnail) {
        setUploadedThumbnail(data.thumbnail)
      }
      setIsPublished(data.is_published || false)
      setIsTopArticle(data.section === 'top' || false)
      setIsBestArticle(data.section === 'best' || false)
      setTags(tagString || data.tags || '')
      setDescription(data.description || '')
      setAuthorId(authorNumber || 1)
      setAuthorName(authorString || '유성민')
      setCategoryId(categoryNumber || 1)
      setCategoryName(categoryString || 'Top Article')
      setPublishedAt((data.published_at || '').slice(0, 10))
      setShowModifyBlog(true)

      // 에디터 내용 업데이트
      if (editorRef.current) {
        const editorInstance = editorRef.current.getInstance()
        if (editorInstance) {
          try {
            // HTML 내용을 직접 설정
            editorInstance.setHTML(data.body || '')
            setMarkdownContent(data.body || '')

            // 에디터 내용이 설정된 후 스크롤 초기화
            setTimeout(() => {
              // 메타데이터 섹션 스크롤 초기화
              const metadataSection = document.querySelector(
                '.flex-1.overflow-y-auto',
              )
              if (metadataSection) {
                metadataSection.scrollTop = 0
              }

              // 에디터 스크롤 초기화
              const editorEl = document.querySelector(
                '.toastui-editor-md-container .toastui-editor',
              )
              if (editorEl) {
                editorEl.scrollTop = 0
              }

              // 프리뷰 스크롤 초기화
              const previewContainer = document.querySelector('.preview-layout')
              if (previewContainer) {
                previewContainer.scrollTop = 0
              }
            }, 100)
          } catch (e) {
            console.error(
              '[handleBlogItemClick] Error setting editor content:',
              e,
            )
          }
        } else {
          console.error('[handleBlogItemClick] Editor instance is null!')
        }
      } else {
        console.error('[handleBlogItemClick] Editor ref is null!')
      }

      // 목록 닫기
      setShowBlogList(false)

      toast.success('블로그 불러오기 완료!')
    }
  }
  // 슬러그 자동 생성
  const generateSlug = async () => {
    const result = await fetch('/api/blog/url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title,
      }),
    })

    const url = await result.json()
    setUrl(url)
  }

  // 새로운 블로그 폴더 ID 생성 함수
  const getNewBlogFolderId = async () => {
    // 가장 최근 블로그 ID를 가져옴
    const { data, error } = await supabaseClient
      .from('blog')
      .select('id')
      .order('id', { ascending: false })
      .limit(1)

    if (error) {
      console.error('최근 블로그 ID 가져오기 실패:', error)
      return 1 // 기본값
    }

    // 최근 ID + 1 반환
    return data && data.length > 0 ? data[0].id + 1 : 1
  }

  // 폴더 존재 여부 확인 및 생성 함수
  const ensureFolderExists = async (bucketName, folderPath) => {
    try {
      // 폴더 존재 여부 확인 (빈 파일을 만들어 확인)
      const checkFile = `${folderPath}/.folder_check`
      const { data, error } = await supabaseClient.storage
        .from(bucketName)
        .list(folderPath)

      // 폴더가 없으면 생성 (빈 파일을 업로드하여 폴더 생성)
      if (error || data.length === 0) {
        const { error: createError } = await supabaseClient.storage
          .from(bucketName)
          .upload(checkFile, new Blob([''], { type: 'text/plain' }))

        if (createError) {
          console.error('폴더 생성 실패:', createError)
          return false
        }
      }

      return true
    } catch (error) {
      console.error('폴더 확인/생성 중 오류:', error)
      return false
    }
  }

  // 썸네일 업로드 함수 수정
  const handleThumbnailUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setThumbnailFile(file)

    // Create a preview URL
    const previewUrl = URL.createObjectURL(file)
    setUploadedThumbnail(previewUrl)
    setThumbnailURL(previewUrl)
  }

  // 빈 태그 생성 핸들러
  const handleGenerateTags = async () => {
    const result = await fetch('/api/blog/tag', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        body: markdownContent,
      }),
    })

    const tagsData = await result.json()

    let tagString = ''
    if (tagsData && tagsData.length > 0) {
      tagString =
        tagsData.split(', ').length === 1
          ? tagsData.split(',')
          : tagsData.split(', ')
      tagString = tagString.map((item) => `#${item}`).join(' ')
    }

    setTags(tagString)
    return
  }

  const handleGenerateDescription = async () => {
    const result = await fetch('/api/blog/description', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        body: markdownContent,
      }),
    })

    const descriptionString = await result.json()

    setDescription(descriptionString)

    return
  }

  const handleGenerateThumbnail = async () => {
    try {
      if (!description) {
        return
      }

      setIsGenerating(true)
      setGeneratedImages([])
      setThumbnailURL('')

      // 1. 프롬프트 먼저 생성 요청
      const promptRes = await fetch('/api/blog/thumbnailText', {
        method: 'POST',
        body: JSON.stringify({
          body: description,
        }),
      })

      const { prompt } = await promptRes.json()

      // 2. 이미지 3장 반복 생성 요청
      const urls = []

      for (let i = 0; i < 1; i++) {
        const imgRes = await fetch('/api/blog/thumbnail', {
          method: 'POST',
          body: JSON.stringify({ body: prompt }),
        })

        const { base64Image } = await imgRes.json()

        if (base64Image) urls.push(`data:image/png;base64,${base64Image}`)
      }

      setGeneratedImages(urls)
    } catch (err) {
      console.error('썸네일 생성 오류:', err)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleNewPost = () => {
    toast.info(
      <div className="flex flex-col items-center">
        <div className="mb-4">글을 새로 작성하시겠습니까?</div>
        <div className="flex space-x-4">
          <button
            onClick={() => {
              // 페이지 새로고침
              window.location.reload()
              // 토스트 알림 닫기
              toast.dismiss()
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            확인
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            취소
          </button>
        </div>
      </div>,
      {
        position: 'top-center',
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: true,
      },
    )
  }

  const handleImageUpload = async (blob, callback) => {
    try {
      const file = blob
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `blog-images/${id}/${fileName}`

      const { data, error } = await supabaseClient.storage
        .from('blog')
        .upload(filePath, file)

      if (error) {
        console.error('Error uploading image:', error)
        return
      }

      const {
        data: { publicUrl },
      } = supabaseClient.storage.from('blog').getPublicUrl(filePath)

      // Use the callback to insert the image
      callback(publicUrl, file.name)
    } catch (error) {
      console.error('Error in handleImageUpload:', error)
    }
  }

  // handleDelete 함수 추가
  const handleDelete = async () => {
    // 삭제 확인 다이얼로그
    const isConfirmed = await new Promise((resolve) => {
      toast.warn(
        <div>
          <div className="mb-1">정말로 이 블로그 글을 삭제하시겠습니까?</div>
          <div className="mb-4">이 작업은 되돌릴 수 없습니다.</div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => {
                toast.dismiss()
                resolve(false)
              }}
              className="px-2 py-1 bg-gray-500 text-white rounded"
            >
              취소
            </button>
            <button
              onClick={() => {
                toast.dismiss()
                resolve(true)
              }}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              삭제
            </button>
          </div>
        </div>,
        {
          autoClose: false,
          closeButton: false,
          closeOnClick: false,
          draggable: false,
        },
      )
    })
    if (!isConfirmed) return

    try {
      // 1. blog_tags 테이블에서 관련 태그 관계 삭제
      const { error: tagDeleteError } = await supabaseClient
        .from('blog_tags')
        .delete()
        .eq('blog_id', id)

      if (tagDeleteError) {
        console.error('태그 관계 삭제 실패:', tagDeleteError)
        throw new Error('태그 관계 삭제에 실패했습니다.')
      }

      // 2. blog_authors 테이블에서 관련 저자 관계 삭제
      const { error: authorDeleteError } = await supabaseClient
        .from('blog_authors')
        .delete()
        .eq('blog_id', id)

      if (authorDeleteError) {
        console.error('저자 관계 삭제 실패:', authorDeleteError)
        throw new Error('저자 관계 삭제에 실패했습니다.')
      }

      // 3. blog-images 버킷에서 이미지 폴더 삭제
      const { data: imageFiles, error: listImagesError } =
        await supabaseClient.storage.from('blog-images').list(`blog-${id}`)

      if (!listImagesError && imageFiles && imageFiles.length > 0) {
        const { error: deleteImagesError } = await supabaseClient.storage
          .from('blog-images')
          .remove(imageFiles.map((file) => `blog-${id}/${file.name}`))

        if (deleteImagesError) {
          console.error('이미지 파일 삭제 실패:', deleteImagesError)
          throw new Error('이미지 파일 삭제에 실패했습니다.')
        }
      }

      // 4. thumbnails 버킷에서 썸네일 폴더 삭제
      const { data: thumbnailFiles, error: listThumbnailsError } =
        await supabaseClient.storage.from('thumbnails').list(`blog-${id}`)

      if (!listThumbnailsError && thumbnailFiles && thumbnailFiles.length > 0) {
        const { error: deleteThumbnailsError } = await supabaseClient.storage
          .from('thumbnails')
          .remove(thumbnailFiles.map((file) => `blog-${id}/${file.name}`))

        if (deleteThumbnailsError) {
          console.error('썸네일 파일 삭제 실패:', deleteThumbnailsError)
          throw new Error('썸네일 파일 삭제에 실패했습니다.')
        }
      }

      // 5. 마지막으로 blog 테이블에서 블로그 글 삭제
      const { error: blogDeleteError } = await supabaseClient
        .from('blog')
        .delete()
        .eq('id', id)

      if (blogDeleteError) {
        console.error('블로그 글 삭제 실패:', blogDeleteError)
        throw new Error('블로그 글 삭제에 실패했습니다.')
      }

      toast.success('블로그 글이 성공적으로 삭제되었습니다!')
      // 페이지 새로고침
      window.location.reload()
    } catch (error) {
      console.error('삭제 중 오류 발생:', error)
      toast.error(error.message || '삭제 중 오류가 발생했습니다.')
    }
  }

  // handleInit 함수 추가
  const handleInit = async () => {
    const isConfirmed = await new Promise((resolve) => {
      toast.warn(
        <div>
          <div className="mb-1">정말로 이 블로그 글을 초기화 하시겠습니까?</div>
          <div className="mb-4">이 작업은 되돌릴 수 없습니다.</div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => {
                toast.dismiss()
                resolve(false)
              }}
              className="px-2 py-1 bg-gray-500 text-white rounded"
            >
              취소
            </button>
            <button
              onClick={() => {
                toast.dismiss()
                resolve(true)
              }}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              삭제
            </button>
          </div>
        </div>,
        {
          autoClose: false,
          closeButton: false,
          closeOnClick: false,
          draggable: false,
        },
      )
    })
    if (!isConfirmed) return

    // 제목 초기화
    setTitle('')
    // URL 초기화
    setUrl('')
    // 썸네일 초기화
    setThumbnail(null)
    setThumbnailURL('')
    setThumbnailType('AI')
    // 태그 초기화
    setTags('')
    // 설명 초기화
    setDescription('')
    // 에디터 내용 초기화
    if (editorRef.current) {
      const editorInstance = editorRef.current.getInstance()
      editorInstance.setHTML('')
      setMarkdownContent('')
    }
    // 발행일 초기화 (오늘 날짜로)
    setPublishedAt(new Date().toISOString().slice(0, 10))
    // 발행 상태 초기화
    setIsPublished(false)

    toast.success('모든 필드가 초기화되었습니다.')
  }

  // Top과 Best 체크박스 핸들러 수정
  const handleTopArticleChange = (e) => {
    if (e.target.checked && isBestArticle) {
      setErrors((prev) => ({ ...prev, section: true }))
      return
    }
    setIsTopArticle(e.target.checked)
    setErrors((prev) => ({ ...prev, section: false }))
  }

  const handleBestArticleChange = (e) => {
    if (e.target.checked && isTopArticle) {
      setErrors((prev) => ({ ...prev, section: true }))
      return
    }
    setIsBestArticle(e.target.checked)
    setErrors((prev) => ({ ...prev, section: false }))
  }

  // 유효성 검사 함수
  const validateForm = () => {
    // isPublished가 false면 유효성 검사 없이 통과
    if (!isPublished) {
      return true
    }

    // isPublished가 true일 때만 유효성 검사 수행
    const newErrors = {
      title: !title.trim(),
      url: !url.trim(),
      description: !description.trim(),
      tags: !tags.trim(),
      authorId: !authorId,
      categoryId: !categoryId,
      content:
        !editorRef.current?.getInstance().getMarkdown().trim() ||
        editorRef.current?.getInstance().getMarkdown() ===
          '내용을 쓰면 오른쪽에 미리보기가 나옵니다.',
    }

    setErrors(newErrors)
    return !Object.values(newErrors).some((error) => error)
  }

  const handleTagProcessing = async () => {
    const tagIds = []

    const tagArr = tags.split('#').slice(1).join('').split(' ')

    for (const name of tagArr) {
      // 먼저 해당 태그가 이미 존재하는지 확인
      const { data: existingTag, error: findError } = await supabaseClient
        .from('tag')
        .select('id')
        .eq('name', name)
        .single()

      if (findError && findError.code !== 'PGRST116') {
        console.error('태그 확인 오류:', findError)
        continue
      }

      if (existingTag) {
        // 이미 존재하면 ID만 추가
        tagIds.push(existingTag.id)
      } else {
        // 존재하지 않으면 새로 삽입
        const { data: newTag, error: insertError } = await supabaseClient
          .from('tag')
          .insert([{ name }])
          .select()
          .single()

        if (insertError) {
          console.error('태그 삽입 오류:', insertError)
          continue
        }

        tagIds.push(newTag.id)
      }
    }

    setSelectedTags(tagIds)
    return tagIds
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      const publishedAt = new Date().toISOString()

      if (isTopArticle) {
        await supabaseClient
          .from('blog')
          .update({ section: null })
          .eq('section', 'top')
      }

      // ✅ 썸네일 처리 로직 추가
      let updatedThumbnailURL = thumbnailURL
      if (thumbnailURL) {
        if (thumbnailURL.startsWith('blob:')) {
          try {
            const response = await fetch(thumbnailURL)
            const blob = await response.blob()
            const filename = `blog-${id}/thumbnail-${Date.now()}`

            const { data, error: uploadError } = await supabaseClient.storage
              .from('thumbnails')
              .upload(filename, blob)

            if (uploadError) throw uploadError

            const {
              data: { publicUrl },
            } = supabaseClient.storage.from('thumbnails').getPublicUrl(filename)

            updatedThumbnailURL = publicUrl
          } catch (error) {
            console.error('썸네일 업로드 중 오류:', error)
            throw new Error('썸네일 업로드에 실패했습니다.')
          }
        } else if (
          !thumbnailURL.includes(
            'supabase.co/storage/v1/object/public/thumbnails/blog-',
          )
        ) {
          const uploadRes = await fetch('/api/blog/upload-thumbnail', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              base64Image: thumbnailURL,
              blogId: id,
            }),
          })

          const { url: newURL, error: uploadError } = await uploadRes.json()
          if (uploadError) throw new Error(uploadError)
          updatedThumbnailURL = newURL
        }
      }

      // HTML 내용을 그대로 저장
      const htmlContent = editorRef.current.getInstance().getHTML()

      const { data: blogData, error: blogError } = await supabaseClient
        .from('blog')
        .insert([
          {
            title,
            body: htmlContent,
            description,
            published_at: publishedAt,
            is_published: isPublished,
            url: url,
            section: isTopArticle ? 'top' : isBestArticle ? 'best' : null,
            thumbnail: updatedThumbnailURL, // ✅ 업데이트된 썸네일 URL 사용
          },
        ])
        .select()

      if (blogError) throw blogError

      const blogId = blogData[0].id

      // 태그 처리
      const selectedTags = await handleTagProcessing()

      if (selectedTags.length > 0) {
        const tagRelations = selectedTags.map((tagId) => ({
          blog_id: blogId,
          tag_id: tagId,
        }))

        const { error: tagError } = await supabaseClient
          .from('blog_tags')
          .insert(tagRelations)

        if (tagError) throw tagError
      }

      if (categoryId) {
        const { error: categoryError } = await supabaseClient
          .from('blog_categories')
          .insert([
            {
              blog_id: blogId,
              category_id: categoryId,
            },
          ])

        if (categoryError) throw categoryError
      }

      if (authorId) {
        const { error: authorError } = await supabaseClient
          .from('blog_authors')
          .insert([
            {
              blog_id: blogId,
              author_id: authorId,
            },
          ])

        if (authorError) throw authorError
      }

      toast.success('블로그 저장 완료!')
    } catch (error) {
      console.error('Error:', error)
      alert('글 등록 중 오류가 발생했습니다.')
    }
  }

  const handleModifySubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      if (isTopArticle) {
        await supabaseClient
          .from('blog')
          .update({ section: null })
          .eq('section', 'top')
          .neq('id', id)
      }

      if (isBestArticle) {
        const { data: currentBlog } = await supabaseClient
          .from('blog')
          .select('section')
          .eq('id', id)
          .single()

        if (!currentBlog || currentBlog.section !== 'best') {
          const { data: bestArticles, error: countError } = await supabaseClient
            .from('blog')
            .select('id, published_at')
            .eq('section', 'best')
            .order('published_at', { ascending: true })

          if (countError) throw countError

          if (bestArticles && bestArticles.length >= 4) {
            await supabaseClient
              .from('blog')
              .update({ section: null })
              .eq('id', bestArticles[0].id)
          }
        }
      }

      // ✅ 썸네일 처리 로직 수정
      let updatedThumbnailURL = thumbnailURL
      const { data: existingBlog } = await supabaseClient
        .from('blog')
        .select('thumbnail')
        .eq('id', id)
        .single()

      // 새로운 썸네일이 업로드되었거나 변경된 경우에만 처리
      if (thumbnailURL && thumbnailURL !== existingBlog.thumbnail) {
        if (thumbnailURL.startsWith('blob:')) {
          try {
            const response = await fetch(thumbnailURL)
            const blob = await response.blob()
            const filename = `blog-${id}/thumbnail-${Date.now()}`

            const { data, error: uploadError } = await supabaseClient.storage
              .from('thumbnails')
              .upload(filename, blob)

            if (uploadError) throw uploadError

            const {
              data: { publicUrl },
            } = supabaseClient.storage.from('thumbnails').getPublicUrl(filename)

            updatedThumbnailURL = publicUrl
          } catch (error) {
            console.error('썸네일 업로드 중 오류:', error)
            throw new Error('썸네일 업로드에 실패했습니다.')
          }
        } else if (
          !thumbnailURL.includes(
            'supabase.co/storage/v1/object/public/thumbnails/blog-',
          )
        ) {
          const uploadRes = await fetch('/api/blog/upload-thumbnail', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              base64Image: thumbnailURL,
              blogId: id,
            }),
          })

          const { url: newURL, error: uploadError } = await uploadRes.json()
          if (uploadError) throw new Error(uploadError)
          updatedThumbnailURL = newURL
        }
      } else {
        // 썸네일이 변경되지 않았다면 기존 썸네일 유지
        updatedThumbnailURL = existingBlog.thumbnail
      }

      // ✅ 블로그 수정
      const updateData = {
        title,
        description,
        body: editorRef.current.getInstance().getHTML(), // HTML 형식으로 저장
        is_published: isPublished,
        url: url,
        section: isTopArticle ? 'top' : isBestArticle ? 'best' : null,
      }

      // 썸네일이 변경된 경우에만 업데이트 데이터에 포함
      if (thumbnailURL !== existingBlog.thumbnail) {
        updateData.thumbnail = updatedThumbnailURL
      }

      const { error: blogError } = await supabaseClient
        .from('blog')
        .update(updateData)
        .eq('id', id)

      if (blogError) throw blogError

      // 태그 수정
      await supabaseClient.from('blog_tags').delete().eq('blog_id', id)

      // 태그 처리
      const selectedTags = await handleTagProcessing()

      if (selectedTags.length > 0) {
        const tagRelations = selectedTags.map((tagId) => ({
          blog_id: id,
          tag_id: tagId,
        }))

        const { error: tagError } = await supabaseClient
          .from('blog_tags')
          .insert(tagRelations)

        if (tagError) throw tagError
      }

      // 카테고리 수정
      await supabaseClient.from('blog_categories').delete().eq('blog_id', id)

      if (categoryId) {
        const { error: categoryError } = await supabaseClient
          .from('blog_categories')
          .insert([
            {
              blog_id: id,
              category_id: categoryId,
            },
          ])

        if (categoryError) throw categoryError
      }

      // 작성자 수정
      await supabaseClient.from('blog_authors').delete().eq('blog_id', id)

      if (authorId) {
        const { error: authorError } = await supabaseClient
          .from('blog_authors')
          .insert([
            {
              blog_id: id,
              author_id: authorId,
            },
          ])

        if (authorError) throw authorError
      }

      toast.success('블로그 수정 완료!')
    } catch (error) {
      console.error('Error:', error)
      alert('글 수정 중 오류가 발생했습니다.')
    }
  }

  const getProcessedHTML = () => {
    if (!editorRef.current) return ''

    const editorInstance = editorRef.current.getInstance()
    const html = editorInstance.getHTML() || markdownContent || ''

    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')

    const headings = doc.querySelectorAll('h1, h2, h3')

    headings.forEach((el, idx) => {
      el.id = `heading-${idx}`
    })

    return doc.body.innerHTML
  }

  // Add this function inside the BlogStudio component, before the return statement
  const extractHeadings = () => {
    if (!editorRef.current) return []

    const editorInstance = editorRef.current.getInstance()
    const html = editorInstance.getHTML() || markdownContent || ''
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    const elements = [...doc.querySelectorAll('h1, h2')]

    let headings = []
    let currentH1 = null
    let idCounter = 0

    elements.forEach((el) => {
      const level = parseInt(el.tagName.replace('H', ''))
      const id = `heading-${idCounter++}`
      el.id = id

      if (level === 1) {
        currentH1 = { id, text: el.textContent, level, children: [] }
        headings.push(currentH1)
      } else if (level === 2 && currentH1) {
        currentH1.children.push({ id, text: el.textContent, level })
      }
    })

    return headings
  }

  // useEffect 수정
  useEffect(() => {
    if (editorRef.current) {
      const updateHeadings = () => {
        const extractedHeadings = extractHeadings()
        setHeadings(extractedHeadings)
      }

      // 에디터 내용 변경 이벤트에 리스너 추가
      const editorInstance = editorRef.current.getInstance()
      editorInstance.on('change', updateHeadings)

      // 초기 헤딩 추출
      updateHeadings()

      return () => {
        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        editorInstance.off('change', updateHeadings)
      }
    }
  }, [markdownContent])

  // 링크 복사 함수 구현
  const copyLinkToClipboard = () => {
    // 현재 URL 가져오기
    const currentUrl = window.location.href

    // 클립보드에 복사
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        // 복사 성공 시, 상태 변경
        setIsCopied(true)

        // 2초 후 텍스트 원상복구
        setTimeout(() => {
          setIsCopied(false)
        }, 2000)
      })
      .catch((err) => {
        console.error('링크 복사 실패:', err)
        toast.error('링크 복사에 실패했습니다.')
      })
  }

  const shareToLinkedIn = () => {
    const url = encodeURIComponent(window.location.href)
    const title = encodeURIComponent(document.title || '')
    // 블로그 포스트 요약에는 실제 본문 내용 일부를 사용할 수 있습니다
    const summary = encodeURIComponent(`${title} - 블로그 내용 요약`)
    const source = encodeURIComponent('귀하의 사이트 이름')

    const linkedinUrl = `https://www.linkedin.com/shareArticle?url=${url}&title=${title}&summary=${summary}&source=${source}`

    // 새 창에서 링크드인 공유 URL 열기
    window.open(linkedinUrl, '_blank', 'width=600,height=600')
  }

  const handleContactClick = () => {
    router.push('/contact')
  }

  // 스크롤 관련 useEffect 추가
  useEffect(() => {
    if (!isPreviewMode) return

    // 명시적으로 DOM에 ID 할당 및 스크롤 이벤트 연결
    const assignIds = () => {
      const headingElements = document.querySelectorAll(
        '.case-study-content h1',
      )

      // 기존 IDs 제거 및 재할당
      headingElements.forEach((el, index) => {
        const id = `heading-${index}`
        el.id = id
      })
    }

    // DOM이 렌더링된 후 ID 할당
    const timer = setTimeout(assignIds, 300)

    // 스크롤 이벤트에서도 ID 재할당 (필요한 경우)
    window.addEventListener(
      'scroll',
      () => {
        const currentHeadings = document.querySelectorAll(
          '.case-study-content h1',
        )
        if (currentHeadings.length > 0 && !currentHeadings[0].id) {
          assignIds()
        }
      },
      { passive: true },
    )

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', assignIds)
    }
  }, [isPreviewMode, markdownContent])

  useEffect(() => {
    if (isPreviewMode) {
      assignHeadingIds()
    }
  }, [isPreviewMode, markdownContent])

  useEffect(() => {
    if (!isPreviewMode || !previewRef.current) return

    const container = previewRef.current

    const handleScroll = () => {
      const headingElements = container.querySelectorAll('h1, h2')
      if (!headingElements.length) return

      const scrollTop = container.scrollTop
      const containerTop = container.getBoundingClientRect().top
      const threshold = 300

      let currentId = null

      headingElements.forEach((el) => {
        const offsetTop =
          el.getBoundingClientRect().top - containerTop + scrollTop
        if (offsetTop - threshold <= scrollTop) {
          currentId = el.id
        }
      })

      if (!currentId) return

      // h2 → h1 매핑
      let activeIds = [currentId]

      for (const h1 of headings) {
        if (h1.id === currentId) {
          activeIds = [h1.id]
          break
        }

        const matchedH2 = h1.children.find((h2) => h2.id === currentId)
        if (matchedH2) {
          activeIds = [h1.id, matchedH2.id]
          break
        }
      }

      setActiveHeading(activeIds)
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      container.removeEventListener('scroll', handleScroll)
    }
  }, [isPreviewMode, markdownContent, headings])

  // 리사이즈 핸들러 함수 개선
  const handleResize = (e) => {
    const container = e.target.closest('.flex-1.flex')
    if (!container) return

    const containerWidth = container.offsetWidth
    const newEditorWidth = (e.clientX / containerWidth) * 100

    // 최소 10%, 최대 90%로 제한 완화
    if (newEditorWidth >= 10 && newEditorWidth <= 90) {
      setEditorWidth(newEditorWidth)
    }
  }

  return (
    <div>
      {!session ? (
        <div className="flex bg-[#1a1a1a] justify-center items-center h-screen flex-col">
          <div className="text-white text-sm mb-5">
            블로그 에디터 페이지는 구글 로그인이 필요합니다.
          </div>
          <AuthButton />
        </div>
      ) : (
        <div className="flex h-screen bg-[#1a1a1a] text-white">
          <style jsx global>
            {editorStyles}
          </style>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          {/* 좌측 사이드바 */}
          <div className="w-12 bg-[#1a1a1a] border-r border-[#333] flex flex-col items-center py-4">
            <div className="mb-6 cursor-pointer" onClick={handleNewPost}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <div className="h-full flex flex-col justify-between">
              <div className="flex flex-col items-center">
                <button
                  className={`p-2 rounded hover:bg-[#333] mb-2 ${
                    showBlogList ? 'bg-[#333]' : ''
                  }`}
                  onClick={handleBlogListClick}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
              <div>
                <button className="p-2 rounded hover:bg-[#333]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* 블로그 목록 사이드바 - 조건부 렌더링 */}
          {showBlogList && (
            <div className="w-64 bg-[#222] border-r border-[#333] overflow-y-auto">
              <div className="p-4 border-b border-[#333]">
                <div className="text-lg font-medium">블로그 목록</div>
              </div>
              <div className="p-2">
                {blogList.length === 0 ? (
                  <div className="text-center text-gray-400 py-4">
                    <div>로딩 중...</div>
                  </div>
                ) : (
                  <ul className="space-y-1">
                    {blogList.map((blog) => (
                      <li
                        key={blog.id}
                        className="px-3 py-2 rounded cursor-pointer hover:bg-[#333] transition-colors flex items-center"
                        onClick={() => handleBlogItemClick(blog.id)}
                      >
                        {/* Status indicator dot */}
                        <span
                          className={`w-2 h-2 rounded-full mr-2 flex-shrink-0 ${
                            blog.is_published ? 'bg-green-500' : 'bg-gray-500'
                          }`}
                          title={blog.is_published ? 'Published' : 'Draft'}
                        ></span>
                        <div className="text-sm truncate">{blog.title}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          {/* 메인 콘텐츠 영역 */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* 통합된 헤더 바 - 프리뷰 토글 버튼 복원 */}
            <div className="h-12 bg-[#1a1a1a] border-b border-[#333] flex items-center justify-between px-4">
              <div className="text-sm font-medium text-white">
                <AuthButton />
                {/* 조건부 텍스트 복원 */}
              </div>
              <div className="flex space-x-2">
                <button
                  className={`px-3 py-1 text-xs rounded text-white ${
                    !isPreviewMode
                      ? 'bg-[#333] hover:bg-[#444]'
                      : 'bg-transparent hover:bg-[#333]'
                  }`}
                  onClick={() => setIsPreviewMode(false)}
                >
                  Editor
                </button>
                <button
                  className={`px-3 py-1 text-xs rounded text-white ${
                    isPreviewMode
                      ? 'bg-[#333] hover:bg-[#444]'
                      : 'bg-transparent hover:bg-[#333]'
                  }`}
                  onClick={() => setIsPreviewMode(true)}
                >
                  Preview
                </button>
              </div>
            </div>

            {/* 에디터와 프리뷰 컨테이너 - 조건부 너비/표시 복원 */}
            <div className="flex-1 flex overflow-hidden">
              {/* 편집기 */}
              <div
                className={`border-r border-[#333] ${
                  isPreviewMode ? 'hidden' : 'block'
                }`}
                style={{ width: `${editorWidth}%` }}
              >
                <div className="h-full flex flex-col">
                  {/* 메타데이터 섹션 */}
                  <div
                    className={`flex-1 ${
                      isMetaSectionOpen ? 'overflow-y-auto' : ''
                    }`}
                  >
                    <div className="p-4">
                      {/* 메타 섹션 토글 헤더 */}
                      <div
                        className="flex items-center justify-between mb-4 cursor-pointer hover:bg-[#2a2a2a] p-2 rounded"
                        onClick={() => setIsMetaSectionOpen(!isMetaSectionOpen)}
                      >
                        <div className="text-sm font-medium text-gray-300">
                          Blog Metadata
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-4 w-4 text-gray-400 transform transition-transform ${
                            isMetaSectionOpen ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>

                      {/* 메타 섹션 컨텐츠 */}
                      <div
                        className={`space-y-6 transition-all duration-300 ${
                          isMetaSectionOpen ? 'block' : 'hidden'
                        }`}
                      >
                        <div className="mb-6">
                          <label className="block text-xs text-gray-400 mb-1 flex items-center justify-between">
                            <span>Title</span>
                            {errors.title && (
                              <span className="text-red-500 text-xs">
                                필수 입력값입니다
                              </span>
                            )}
                          </label>
                          <input
                            type="text"
                            value={title}
                            onChange={(e) => {
                              setTitle(e.target.value)
                              setErrors((prev) => ({ ...prev, title: false }))
                            }}
                            placeholder="Write the blog post title"
                            className={`w-full bg-[#222] border ${
                              errors.title ? 'border-red-500' : 'border-[#333]'
                            } rounded p-2 text-white focus:outline-none focus:border-blue-500`}
                          />
                        </div>

                        <div className="mb-6">
                          <label className="block text-xs text-gray-400 mb-1 flex items-center justify-between">
                            <span>URL</span>
                            {errors.url && (
                              <span className="text-red-500 text-xs">
                                필수 입력값입니다
                              </span>
                            )}
                          </label>
                          <div className="flex">
                            <input
                              type="text"
                              value={url}
                              onChange={(e) => {
                                setUrl(e.target.value)
                                setErrors((prev) => ({ ...prev, url: false }))
                              }}
                              placeholder="Generate the blog post URL"
                              className={`w-full bg-[#222] border ${
                                errors.url ? 'border-red-500' : 'border-[#333]'
                              } rounded p-2 text-white focus:outline-none focus:border-blue-500`}
                            />
                            <button
                              onClick={generateSlug}
                              className="px-3 py-2 bg-[#333] hover:bg-[#444] text-white rounded-r text-sm"
                            >
                              Generate
                            </button>
                          </div>
                        </div>

                        <div className="mb-6">
                          <label className="block text-xs text-gray-400 mb-1 flex items-center justify-between">
                            <span>Description</span>
                            {errors.description && (
                              <span className="text-red-500 text-xs">
                                필수 입력값입니다
                              </span>
                            )}
                          </label>
                          <div className="flex">
                            <input
                              type="text"
                              value={description}
                              onChange={(e) => {
                                setDescription(e.target.value)
                                setErrors((prev) => ({
                                  ...prev,
                                  description: false,
                                }))
                              }}
                              placeholder="Generate the blog AI description"
                              className={`flex-1 bg-[#222] border ${
                                errors.description
                                  ? 'border-red-500'
                                  : 'border-[#333]'
                              } rounded-l p-2 text-white focus:outline-none focus:border-blue-500`}
                            />
                            <button
                              onClick={handleGenerateDescription}
                              className="px-3 py-2 bg-[#333] hover:bg-[#444] text-white rounded-r text-sm"
                            >
                              Generate
                            </button>
                          </div>
                        </div>

                        <div className="mb-6">
                          <label className="block text-xs text-gray-400 mb-1 flex items-center justify-between">
                            <span>Tags</span>
                            {errors.tags && (
                              <span className="text-red-500 text-xs">
                                필수 입력값입니다
                              </span>
                            )}
                          </label>
                          <div className="flex">
                            <input
                              type="text"
                              value={tags}
                              onChange={(e) => {
                                setTags(e.target.value)
                                setErrors((prev) => ({ ...prev, tags: false }))
                              }}
                              placeholder="Generate the blog AI tags"
                              className={`flex-1 bg-[#222] border ${
                                errors.tags ? 'border-red-500' : 'border-[#333]'
                              } rounded-l p-2 text-white focus:outline-none focus:border-blue-500`}
                            />
                            <button
                              onClick={handleGenerateTags}
                              className="px-3 py-2 bg-[#333] hover:bg-[#444] text-white rounded-r text-sm"
                            >
                              Generate
                            </button>
                          </div>
                        </div>

                        <div className="mb-6">
                          <label className="block text-xs text-gray-400 mb-1 flex items-center justify-between">
                            <span className="flex items-center">
                              Thumbnail
                              {isGenerating && (
                                <>
                                  <span className="mx-2"></span>
                                  <svg
                                    className="animate-spin h-3 w-3 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                    ></circle>
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                  </svg>
                                  <span className="text-xs text-gray-400">
                                    썸네일 생성중...
                                  </span>
                                </>
                              )}
                            </span>
                            {errors.thumbnailURL && (
                              <span className="text-red-500 text-xs">
                                필수 입력값입니다
                              </span>
                            )}
                          </label>
                          <div className="flex space-x-2">
                            <button
                              onClick={handleGenerateThumbnail}
                              className="px-3 py-2 bg-[#333] hover:bg-[#444] text-white rounded text-sm"
                            >
                              {isGenerating
                                ? 'Generating...'
                                : generatedImages.length === 0
                                ? 'Generate'
                                : 'Regenerate'}
                            </button>
                            <label className="px-3 py-2 bg-[#333] hover:bg-[#444] text-white rounded text-sm cursor-pointer">
                              Upload
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleThumbnailUpload}
                                className="hidden"
                              />
                            </label>
                          </div>
                        </div>
                        {(generatedImages.length > 0 || uploadedThumbnail) && (
                          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {generatedImages.map((url, idx) => (
                              <div
                                key={idx}
                                className={`cursor-pointer border-4 rounded overflow-hidden ${
                                  thumbnailURL === url
                                    ? 'border-4 border-blue-400 shadow-[0_0_15px_4px_rgba(59,130,246,0.7)]'
                                    : 'border-4 border-transparent'
                                }`}
                                onClick={() => setThumbnailURL(url)}
                              >
                                <img
                                  src={url}
                                  alt={`Generated thumbnail ${idx + 1}`}
                                  className="w-full h-auto"
                                />
                              </div>
                            ))}
                            {uploadedThumbnail && (
                              <div
                                className={`cursor-pointer border-4 rounded overflow-hidden ${
                                  thumbnailURL === uploadedThumbnail
                                    ? 'border-4 border-blue-400 shadow-[0_0_15px_4px_rgba(59,130,246,0.7)]'
                                    : 'border-4 border-transparent'
                                }`}
                                onClick={() =>
                                  setThumbnailURL(uploadedThumbnail)
                                }
                              >
                                <img
                                  src={uploadedThumbnail}
                                  alt="Uploaded thumbnail"
                                  className="w-full h-auto"
                                />
                              </div>
                            )}
                          </div>
                        )}

                        <div className="mb-6">
                          <label className="block text-xs text-gray-400 mb-1 flex items-center justify-between">
                            <span>Author</span>
                            {errors.authorId && (
                              <span className="text-red-500 text-xs">
                                필수 입력값입니다
                              </span>
                            )}
                          </label>
                          <select
                            value={authorId}
                            onChange={(e) => {
                              const selectedAuthor = availableAuthors.find(
                                (author) =>
                                  author.id === Number(e.target.value),
                              )
                              setAuthorId(Number(e.target.value))
                              setAuthorName(selectedAuthor.name)
                              setErrors((prev) => ({
                                ...prev,
                                authorId: false,
                              }))
                            }}
                            className={`w-full bg-[#222] border ${
                              errors.authorId
                                ? 'border-red-500'
                                : 'border-[#333]'
                            } rounded p-2 text-white focus:outline-none focus:border-blue-500`}
                          >
                            {availableAuthors.map((author) => (
                              <option key={author.id} value={author.id}>
                                {author.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="mb-6">
                          <label className="block text-xs text-gray-400 mb-1 flex items-center justify-between">
                            <span>Category</span>
                            {errors.categoryId && (
                              <span className="text-red-500 text-xs">
                                필수 입력값입니다
                              </span>
                            )}
                          </label>
                          <select
                            value={categoryId}
                            onChange={(e) => {
                              const selectedCategory = availableCategories.find(
                                (category) =>
                                  category.id === Number(e.target.value),
                              )
                              setCategoryId(Number(e.target.value))
                              setCategoryName(selectedCategory.name)
                              setErrors((prev) => ({
                                ...prev,
                                categoryId: false,
                              }))
                            }}
                            className={`w-full bg-[#222] border ${
                              errors.categoryId
                                ? 'border-red-500'
                                : 'border-[#333]'
                            } rounded p-2 text-white focus:outline-none focus:border-blue-500`}
                          >
                            {availableCategories.map((category) => (
                              <option key={category.id} value={category.id}>
                                {category.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex flex-col gap-4">
                          <div className="flex gap-4">
                            <div>
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={Boolean(isTopArticle)}
                                  onChange={handleTopArticleChange}
                                  className="mr-2 bg-[#222] border border-[#333]"
                                />
                                <span className="text-sm">Top Article</span>
                              </label>
                            </div>

                            <div>
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={Boolean(isBestArticle)}
                                  onChange={handleBestArticleChange}
                                  className="mr-2 bg-[#222] border border-[#333]"
                                />
                                <span className="text-sm">Best Article</span>
                              </label>
                            </div>
                          </div>
                          {errors.section && (
                            <span className="text-red-500 text-xs">
                              Top Article과 Best Article은 동시에 선택할 수
                              없습니다
                            </span>
                          )}
                        </div>

                        <div className="mb-6">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={Boolean(isPublished)}
                              onChange={(e) => setIsPublished(e.target.checked)}
                              className="mr-2 bg-[#222] border border-[#333]"
                            />
                            <span className="text-sm">Published</span>
                          </label>
                        </div>
                      </div>

                      {/* 에디터 섹션 */}
                      <div
                        className={`${
                          isMetaSectionOpen
                            ? 'h-[300px]'
                            : 'h-[calc(100vh-200px)]'
                        } transition-all duration-300`}
                      >
                        <label className="block text-xs text-gray-400 mt-5 mb-1 flex items-center justify-between">
                          <span>Content</span>
                          {errors.content && (
                            <span className="text-red-500 text-xs">
                              필수 입력값입니다
                            </span>
                          )}
                        </label>
                        <div
                          className={`h-full border ${
                            errors.content ? 'border-red-500' : 'border-[#333]'
                          } rounded bg-white`}
                        >
                          <Editor
                            ref={editorRef}
                            initialValue={initialEditorValue}
                            height="100%"
                            initialEditType="wysiwyg"
                            useCommandShortcut={true}
                            hideModeSwitch={true}
                            theme="light"
                            usageStatistics={false}
                            toolbarItems={[
                              ['heading', 'bold', 'italic', 'strike'],
                              ['hr', 'quote'],
                              ['ul', 'ol', 'task', 'indent', 'outdent'],
                              ['table', 'image', 'link'],
                              ['code', 'codeblock'],
                            ]}
                            hooks={{
                              addImageBlobHook: handleImageUpload,
                            }}
                            onChange={() => {
                              const editorInstance =
                                editorRef.current?.getInstance()
                              if (editorInstance) {
                                const currentHTML = editorInstance.getHTML()
                                setMarkdownContent(currentHTML)
                                setErrors((prev) => ({
                                  ...prev,
                                  content: false,
                                }))
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 버튼 섹션 */}
                  <div className="p-4 bg-[#1a1a1a] border-t border-[#333]">
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={showModifyBlog ? handleDelete : handleInit}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-sm"
                      >
                        {showModifyBlog ? 'Delete' : 'Init'}
                      </button>
                      <button
                        onClick={
                          showModifyBlog ? handleModifySubmit : handleSubmit
                        }
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm"
                      >
                        {showModifyBlog ? 'Modify' : 'Submit'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 리사이즈 핸들러 개선 */}
              {!isPreviewMode && (
                <div
                  className="w-1 hover:w-2 bg-[#333] cursor-col-resize transition-all duration-200 hover:bg-blue-500 active:bg-blue-600"
                  style={{
                    userSelect: 'none',
                    touchAction: 'none',
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    const handleMouseMove = (event) => {
                      event.preventDefault()
                      const container = e.target.closest('.flex-1.flex')
                      if (!container) return

                      const containerWidth = container.offsetWidth
                      const newEditorWidth =
                        (event.clientX / containerWidth) * 100

                      // 최소 10%, 최대 90%로 제한 완화
                      if (newEditorWidth >= 10 && newEditorWidth <= 90) {
                        setEditorWidth(newEditorWidth)
                      }
                    }

                    const handleMouseUp = () => {
                      document.removeEventListener('mousemove', handleMouseMove)
                      document.removeEventListener('mouseup', handleMouseUp)
                      document.body.style.cursor = 'default'
                    }

                    document.addEventListener('mousemove', handleMouseMove)
                    document.addEventListener('mouseup', handleMouseUp)
                    document.body.style.cursor = 'col-resize'
                  }}
                />
              )}

              {/* 프리뷰 섹션 */}
              <div
                className={`${isPreviewMode ? 'w-full' : 'block'} bg-white`}
                style={{
                  width: isPreviewMode ? '100%' : `${100 - editorWidth}%`,
                }}
              >
                <div
                  className="h-full overflow-y-auto preview-layout"
                  ref={previewRef}
                >
                  {isPreviewMode ? (
                    // 프리뷰 모드일 때 케이스 스터디 레이아웃
                    <div>
                      <div className="case-study-layout">
                        {/* 왼쪽 사이드바 */}
                        <div className="case-study-sidebar">
                          <div className="back-button">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="black"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                            <span className="ml-2 text-black font-bold">
                              All articles
                            </span>
                          </div>
                          <div className="toc-sidebar fixed right-4 top-24 z-10"></div>
                          <div className="sidebar-nav">
                            <div className="text-xs font-semibold text-gray-900">
                              INDEX
                            </div>

                            <div className="custom-scrollspy">
                              {headings.map((heading) => (
                                <div
                                  key={heading.id}
                                  className="sidebar-nav-item"
                                >
                                  <div
                                    onClick={() =>
                                      handleHeadingClick(heading.id)
                                    }
                                    className={`block py-2 px-2 cursor-pointer duration-200 text-gray-800 ${
                                      activeHeading.includes(heading.id)
                                        ? 'text-underline font-bold text-sm'
                                        : 'text-ss'
                                    } hover:underline`}
                                  >
                                    {heading.text}
                                  </div>

                                  {heading.children?.length > 0 && (
                                    <div className="ml-4 border-l border-gray-300 pl-2">
                                      {heading.children.map((child) => (
                                        <div
                                          key={child.id}
                                          onClick={() =>
                                            handleHeadingClick(child.id)
                                          }
                                          className={`block py-1 px-2 cursor-pointer duration-200 text-xs text-gray-800 ${
                                            activeHeading.includes(child.id)
                                              ? 'text-underline font-bold'
                                              : ''
                                          } hover:underline`}
                                        >
                                          {child.text}
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* 본문 콘텐츠 - 기존 디자인 유지 */}
                        <div className="case-study-content">
                          <div className="max-w-2xl mx-auto">
                            <div className="text-4xl mt-3 mb-8 text-black">
                              {title}
                            </div>
                            <div className="flex items-center justify-between mb-10">
                              {/* Author */}
                              {authorId && availableAuthors.length > 0 && (
                                <div className="text-sm font-medium text-black">
                                  <span className="text-gray-500 text-xs">
                                    Author
                                  </span>{' '}
                                  {availableAuthors.find(
                                    (a) => a.id === Number(authorId),
                                  )?.name || 'Unknown Author'}
                                </div>
                              )}
                              {/* Date */}
                              <div className="text-sm text-black">
                                <span className="text-gray-500 text-xs">
                                  Date
                                </span>{' '}
                                {new Date(publishedAt).toLocaleDateString(
                                  'en-US',
                                  {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                  },
                                )}
                              </div>
                            </div>
                            {/* 썸네일 */}
                            <div className="preview-thumbnail aspect-w-16 aspect-h-9 mb-10">
                              {thumbnailURL ? (
                                <img
                                  src={thumbnailURL}
                                  alt="Preview"
                                  className="object-cover w-full h-full"
                                  onError={(e) => {
                                    e.target.onerror = null
                                    e.target.src = ''
                                  }}
                                />
                              ) : (
                                <div className="w-full h-64 flex items-center justify-center bg-gray-100">
                                  {/* Placeholder SVG */}
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-20 w-20 text-gray-300"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={1.5}
                                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                  </svg>
                                </div>
                              )}
                            </div>
                            {/* Content Preview */}
                            <div className="markdown-content">
                              <div
                                className="section-container"
                                dangerouslySetInnerHTML={{
                                  __html: getProcessedHTML(), // 🔥 가공된 HTML로 렌더링
                                }}
                              />
                            </div>
                            {/* 태그 표시 - 버튼 형태로 변경 */}
                            {tags && (
                              <div className="mt-8 pt-4 border-t border-gray-200">
                                <div className="flex flex-wrap gap-2">
                                  {tags
                                    .split('#') // # 기준으로 분리
                                    .map((tag) => tag.trim()) // 앞뒤 공백 제거
                                    .filter((tag) => tag !== '') // 빈 문자열 제거
                                    .map((tag, index) => (
                                      <span
                                        key={index}
                                        className="inline-block px-3 py-1 border border-gray-300 rounded-full text-sm text-gray-500 bg-white hover:bg-gray-50 cursor-default"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* 오른쪽 사이드바 */}
                        <div className="case-study-right-sidebar">
                          <div className="share-section">
                            <span className="text-black">SHARE ARTICLE</span>
                            <div className="share-buttons">
                              <div
                                className="share-button hover:bg-gray-100 flex items-center cursor-pointer"
                                role="button"
                                tabIndex="0"
                                aria-label="Copy link to clipboard"
                                //onClick={copyLinkToClipboard}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' || e.key === ' ') {
                                    copyLinkToClipboard()
                                  }
                                }}
                              >
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 23 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="mr-2"
                                >
                                  <g clipPath="url(#clip0_2053_4072)">
                                    <rect
                                      width="23"
                                      height="24"
                                      fill="white"
                                    ></rect>
                                    <path
                                      d="M9.75418 5.65742L11.169 4.24255C13.5117 1.89985 17.31 1.89985 19.6527 4.24255V4.24255C21.9954 6.58524 21.9954 10.3835 19.6527 12.7262L16.823 15.5559C14.4803 17.8986 10.682 17.8986 8.33931 15.5559V15.5559"
                                      stroke="currentColor"
                                      strokeWidth="1.6"
                                      strokeLinecap="round"
                                    ></path>
                                    <path
                                      d="M12.5779 19.7977L11.163 21.2125C8.82029 23.5552 5.02203 23.5552 2.67933 21.2125V21.2125C0.336631 18.8698 0.336628 15.0716 2.67932 12.7289L5.50907 9.89913C7.85177 7.55644 11.65 7.55643 13.9927 9.89913V9.89913"
                                      stroke="currentColor"
                                      strokeWidth="1.6"
                                      strokeLinecap="round"
                                    ></path>
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_2053_4072">
                                      <rect
                                        width="23"
                                        height="24"
                                        fill="white"
                                      ></rect>
                                    </clipPath>
                                  </defs>
                                </svg>
                                {isCopied ? 'Copied!' : 'Copy link'}
                              </div>
                              <div
                                className="share-button hover:bg-gray-100 flex items-center cursor-pointer"
                                role="button"
                                tabIndex="0"
                                aria-label="Share on LinkedIn"
                                //onClick={shareToLinkedIn}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' || e.key === ' ') {
                                    shareToLinkedIn()
                                  }
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="mr-2"
                                >
                                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                  <rect
                                    x="2"
                                    y="9"
                                    width="4"
                                    height="12"
                                  ></rect>
                                  <circle cx="4" cy="4" r="2"></circle>
                                </svg>
                                Post on LinkedIn
                              </div>
                            </div>
                          </div>

                          <div className="mt-8 share-buttons">
                            <button
                              className="hover:bg-gray-900 flex items-center cursor-pointer contact-button text-white"
                              //onClick={handleContactClick}
                            >
                              <span>Contact Us</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="ml-2"
                              >
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // 에디터 모드일 때 기존 레이아웃
                    <div className="p-8 bg-white text-black">
                      <div className="max-w-2xl mx-auto">
                        <div className="text-4xl mb-8">{title}</div>

                        <div className="flex items-center justify-between mb-10">
                          {/* Author */}
                          {authorId && availableAuthors.length > 0 && (
                            <div className="text-sm font-medium">
                              <span className="text-gray-500">Author</span>{' '}
                              {availableAuthors.find(
                                (a) => a.id === Number(authorId),
                              )?.name || 'Unknown Author'}
                            </div>
                          )}
                          {/* Date */}
                          <div className="text-sm">
                            <span className="text-gray-500">Date</span>{' '}
                            {new Date(publishedAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </div>
                        </div>

                        {/* 썸네일 */}
                        <div className="preview-thumbnail aspect-w-16 aspect-h-9 mb-10">
                          {thumbnailURL ? (
                            <img
                              src={thumbnailURL}
                              alt="Preview"
                              className="object-cover w-full h-full"
                              onError={(e) => {
                                e.target.onerror = null
                                e.target.src = ''
                              }}
                            />
                          ) : (
                            <div className="w-full h-64 flex items-center justify-center bg-gray-100">
                              {/* Placeholder SVG */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-20 w-20 text-gray-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                          )}
                        </div>

                        {/* Content Preview */}
                        <div
                          className="markdown-content"
                          dangerouslySetInnerHTML={{
                            __html:
                              editorRef.current?.getInstance().getHTML() || '',
                          }}
                        />

                        {/* 태그 표시 - 버튼 형태로 변경 */}
                        {tags && (
                          <div className="mt-8 pt-4 border-t border-gray-200">
                            <div className="flex flex-wrap gap-2">
                              {tags
                                .split('#') // # 기준으로 분리
                                .map((tag) => tag.trim()) // 앞뒤 공백 제거
                                .filter((tag) => tag !== '') // 빈 문자열 제거
                                .map((tag, index) => (
                                  <span
                                    key={index}
                                    className="inline-block px-3 py-1 border border-gray-300 rounded-full text-sm text-gray-500 bg-white hover:bg-gray-50 cursor-default"
                                  >
                                    {tag}
                                  </span>
                                ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
