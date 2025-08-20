'use client'

export default function TitleShareButtons({ title }) {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    alert('링크가 복사되었습니다.')
  }

  const handleShareLinkedIn = () => {
    const url = encodeURIComponent(window.location.href)
    const encodedTitle = encodeURIComponent(`${title} - Hurdlers 블로그에서 발행`)
    const summary = encodeURIComponent(`고객 경험을 한 차원 높이는 AX 마케팅 | hurdlers.kr | #Hurdlers #허들러스 #AX마케팅 #고객경험`)
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${encodedTitle}&summary=${summary}`,
      '_blank',
    )
  }

  const handleShareFacebook = () => {
    const url = encodeURIComponent(window.location.href)
    const titleText = `${title} - Hurdlers 블로그`
    const summary = `고객 경험을 한 차원 높이는 AX 마케팅 | #Hurdlers #허들러스 #AX마케팅 #고객경험`
    const fullText = `${titleText}\n\n${summary}`
    window.open(
      `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(fullText)}&u=${url}`,
      '_blank',
    )
  }

  const handleShareTwitter = () => {
    const text = `${title} - Hurdlers 블로그에서 발행 | 고객 경험을 한 차원 높이는 AX 마케팅\n\n#Hurdlers #허들러스 #AX마케팅 #고객경험\n\nhurdlers.kr\n\n${window.location.href}`
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
      '_blank',
    )
  }

  return (
    <div className="flex items-center gap-2 lg:hidden">
      <button
        onClick={handleCopyLink}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      </button>
      <button
        onClick={handleShareFacebook}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </button>
      <button
        onClick={handleShareTwitter}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      </button>
      <button
        onClick={handleShareLinkedIn}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </button>
    </div>
  )
}
