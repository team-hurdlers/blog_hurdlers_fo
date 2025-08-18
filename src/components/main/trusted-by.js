import Image from 'next/image'

export default function TrustedBySection() {
  // 파트너 로고 데이터 배열 - 삼성, LG 그룹별로 정렬
  const partners = [
    // 삼성 그룹
    {
      src: '/v3/partner/partner-samsungmedison.png',
      alt: 'Samsung Medison',
      group: 'samsung',
    },
    {
      src: '/v3/partner/partner-samsungcorporation.png',
      alt: 'Samsung Corporation',
      group: 'samsung',
    },
    {
      src: '/v3/partner/partner-samsungeletronic.png',
      alt: 'Samsung Electronics',
      group: 'samsung',
    },

    // LG 그룹
    {
      src: '/v3/partner/partner-lginotech.png',
      alt: 'LG Innotek',
      group: 'lg',
    },
    { src: '/v3/partner/partner-lgcns.png', alt: 'LG CNS', group: 'lg' },
    {
      src: '/v3/partner/partner-lgeletronics.png',
      alt: 'LG Electronics',
      group: 'lg',
    },
    { src: '/v3/partner/partner-lguplus.png', alt: 'LG U+', group: 'lg' },

    // 기타 회사들
    {
      src: '/v3/partner/partner-shinhan.png',
      alt: 'Shinhan Card',
      group: 'other',
    },
    {
      src: '/v3/partner/partner-koreatourism.png',
      alt: 'Korea Tourism Organization',
      group: 'other',
    },
    { src: '/v3/partner/partner-hunet.png', alt: 'Hunet', group: 'other' },
  ]

  return (
    <section className="relative z-10 bg-transparent py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex flex-col justify-center items-center gap-8 mb-20">
          <div className="text-center">
            <h2 className="inline-block px-4 py-2 border border-black rounded-md font-medium text-base text-black bg-gray-50">
              TRUSTED BY
            </h2>
          </div>

          {/* 모바일 뷰 (576px 미만) - 1열에 2개씩 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-1 w-full">
            {partners.map((partner, i) => (
              <div
                key={`partner-${i}`}
                className="flex items-center justify-center p-2 h-24"
              >
                <Image
                  src={partner.src || '/placeholder.svg'}
                  alt={partner.alt}
                  width={186}
                  height={60}
                  className="h-auto w-auto max-h-[50px] sm:max-h-[55px] md:max-h-[60px] max-w-[150px] sm:max-w-[170px] md:max-w-[186px] object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
