// app/not-found.js
'use client'

import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex flex-col justify-center items-center h-screen text-center px-8">
      <h1 className="font-bold text-8xl mb-8">500</h1>
      <h2 className="font-bold text-3xl mb-6">내부 서버 오류</h2>
      <p className="mb-8 text-lg text-gray-600">
        문제가 발생했습니다. 잠시 후 다시 시도해주세요.
      </p>
      <div className="flex  gap-4">
        <button
          onClick={() => reset()}
          className="bg-black text-white font-bold text-base px-6 py-3 rounded hover:bg-gray-900 transition"
        >
          다시 시도
        </button>
        <Link
          href="/"
          className="bg-black text-white font-bold text-base px-6 py-3 rounded hover:bg-gray-900 transition"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </main>
  )
}
