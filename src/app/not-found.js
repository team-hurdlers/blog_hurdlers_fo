// app/not-found.js
'use client'

import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex flex-col justify-center items-center h-screen text-center px-8">
      <h1 className="font-bold text-8xl mb-8">404</h1>
      <h2 className="font-bold text-3xl mb-6">페이지를 찾을 수 없습니다</h2>
      <p className="mb-8 text-lg text-gray-600">
        존재하지 않는 페이지입니다. 주소를 다시 확인해주세요.
      </p>
      <Link
        href="/"
        className="bg-black text-white font-bold text-base px-6 py-3 rounded hover:bg-gray-900 transition"
      >
        홈으로 돌아가기
      </Link>
    </main>
  )
}
