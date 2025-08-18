'use client'

import { useState } from 'react'

export default function TestVectorSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [chatResponse, setChatResponse] = useState('')
  const [chatLoading, setChatLoading] = useState(false)

  // 벡터 검색 테스트
  const handleSearch = async () => {
    if (!query) return

    setLoading(true)
    setResults([])

    try {
      const response = await fetch('/api/test-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, limit: 5 }),
      })

      const data = await response.json()
      setResults(data.results || [])
    } catch (error) {
      console.error('검색 오류:', error)
      alert('검색 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  // 제품 목록 조회 테스트
  const handleProductListSearch = async () => {
    setLoading(true)
    setResults([])

    try {
      const response = await fetch('/api/test-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isProductList: true, limit: 10 }),
      })

      const data = await response.json()
      setResults(data.results || [])
    } catch (error) {
      console.error('제품 목록 조회 오류:', error)
      alert('제품 목록 조회 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  // 채팅 API 테스트
  const handleChatTest = async () => {
    if (!query) return

    setChatLoading(true)
    setChatResponse('')

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: query }],
        }),
      })

      if (response.body) {
        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let done = false
        let text = ''

        while (!done) {
          const { value, done: doneReading } = await reader.read()
          done = doneReading
          const chunk = decoder.decode(value)
          text += chunk
          setChatResponse(text)
        }
      }
    } catch (error) {
      console.error('채팅 API 오류:', error)
      setChatResponse('채팅 API 호출 중 오류가 발생했습니다.')
    } finally {
      setChatLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">벡터 검색 테스트</h1>

      <div className="mb-6">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="검색어 입력"
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? '검색 중...' : '벡터 검색 테스트'}
          </button>
          <button
            onClick={handleProductListSearch}
            disabled={loading}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
          >
            {loading ? '조회 중...' : '제품 목록 조회'}
          </button>
          <button
            onClick={handleChatTest}
            disabled={chatLoading || !query}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:bg-gray-400"
          >
            {chatLoading ? '응답 생성 중...' : '채팅 API 테스트'}
          </button>
        </div>

        {/* 검색 결과 */}
        {results.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              검색된 문서 ({results.length})
            </h2>
            <div className="space-y-4">
              {results.map((result, index) => (
                <div key={index} className="p-4 border rounded bg-gray-50">
                  <pre className="whitespace-pre-wrap">
                    {result.pageContent}
                  </pre>
                  <div className="mt-2 text-sm text-gray-500">
                    <strong>메타데이터:</strong>{' '}
                    {JSON.stringify(result.metadata)}
                    {result.similarity && (
                      <div>
                        <strong>유사도:</strong> {result.similarity.toFixed(4)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 채팅 API 응답 */}
        {chatResponse && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">채팅 API 응답:</h2>
            <div className="p-4 border rounded bg-gray-50">
              <div className="whitespace-pre-wrap">{chatResponse}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
