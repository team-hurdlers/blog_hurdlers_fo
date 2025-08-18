import Footer from '@/components/shared/footer'
import PrivacyHeader from '@/components/privacy/privacy-header'
import PrivacyContent from '@/components/privacy/privacy-content'
import { createMetadata } from '@/utils/createMetadata'
import { getPrivacyPolicyJSONLD } from '@/utils/createJSONLD'

export const metadata = createMetadata({
  title: 'AX 마케팅 플랫폼 | 개인정보처리방침 | 허들러스101',
  description:
    '허들러스101은 고객의 개인정보 보호를 최우선으로 합니다. 개인정보 수집 및 이용, 보관, 처리 방침을 투명하게 안내드립니다.',
  path: '/privacy',
})

export default function PrivacyPage() {
  const privacyStructuredData = getPrivacyPolicyJSONLD()

  return (
    <>
      {/* <Header /> */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(privacyStructuredData),
        }}
      />
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <PrivacyHeader />
          <PrivacyContent />
        </div>
      </main>
      <Footer />
    </>
  )
}
