'use client'

import { useState } from 'react'

export default function ShareButtons({ title }) {
  const [isCopied, setIsCopied] = useState(false)

  const copyLinkToClipboard = () => {
    const currentUrl = window.location.href
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        setIsCopied(true)
        setTimeout(() => {
          setIsCopied(false)
        }, 2000)
      })
      .catch((err) => {
        console.error('링크 복사 실패:', err)
      })
  }

  const shareToLinkedIn = () => {
    const url = encodeURIComponent(window.location.href)
    const encodedTitle = encodeURIComponent(title)
    const summary = encodeURIComponent(`${title} - 블로그 내용 요약`)
    const source = encodeURIComponent('Your Site Name')

    const linkedinUrl = `https://www.linkedin.com/shareArticle?url=${url}&title=${encodedTitle}&summary=${summary}&source=${source}`
    window.open(linkedinUrl, '_blank', 'width=600,height=600')
  }

  return (
    <div>
      <span className="flex items-center text-sm font-bold text-black px-4 py-3 border-b border-[#e0e0e0]">
        SHARE ARTICLE
      </span>
      <div className="flex flex-col mx-5">
        <div
          className="flex items-center px-4 py-3 rounded cursor-pointer text-sm text-[#333] border-b border-[#e8e8e8] hover:bg-gray-100"
          role="button"
          tabIndex="0"
          onClick={copyLinkToClipboard}
          aria-label="Copy link to clipboard"
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
              <rect width="23" height="24" fill="white"></rect>
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
                <rect width="23" height="24" fill="white"></rect>
              </clipPath>
            </defs>
          </svg>
          {isCopied ? 'Copied!' : 'Copy link'}
        </div>
        <div
          className="flex items-center px-4 py-3 rounded cursor-pointer text-sm text-[#333] border-b border-[#e8e8e8] hover:bg-gray-100"
          role="button"
          tabIndex="0"
          onClick={shareToLinkedIn}
          aria-label="Share on LinkedIn"
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
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2"></circle>
          </svg>
          Post on LinkedIn
        </div>
      </div>
    </div>
  )
}
