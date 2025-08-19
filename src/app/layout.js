// app/layout.tsx
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import { AlertProvider } from '@/context/AlertContext'
import { GTMComponent } from '@/components/shared/gtm'
import { SessionWrapper } from '@/components/shared/SessionProvider'
import { createMetadata } from '@/utils/createMetadata'
import { getOrganizationJSONLD, getBlogJSONLD } from '@/utils/createJSONLD'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata = createMetadata({
  title: 'AX 마케팅 플랫폼 | 허들러스101',
  description:
    '허들러스101 AX 마케팅 플랫폼으로 AI 기반 마케팅 자동화 및 데이터를 활용한 혁신적인 전략을 구현하세요. AI 기술로 마케팅 성과를 극대화하고 효율적인 캠페인 운영을 지원합니다.',
  path: '/',
})

export default function RootLayout({ children }) {
  const organizationStructuredData = getOrganizationJSONLD()
  const blogStructuredData = getBlogJSONLD()

  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="manifest" href="/manifest.json" />

        {process.env.VERCEL_ENV === 'production' && (
          <meta
            name="naver-site-verification"
            content="37dfdd1ff69ebd977a906e2ce93cb51036492a43"
          />
        )}

        {/* 조직 구조화된 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
        
        {/* 블로그 구조화된 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(blogStructuredData),
          }}
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GTMComponent gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
        <SessionWrapper>
          <AlertProvider>{children}</AlertProvider>
          <Analytics />
        </SessionWrapper>
      </body>
    </html>
  )
}
