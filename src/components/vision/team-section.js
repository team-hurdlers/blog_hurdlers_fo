import Image from 'next/image'
import Link from 'next/link'

export default function TeamSection() {
  const teamMembers = [
    {
      name: '유성민',
      title: 'CEO',
      description: [
        'AI와 그로스 마케팅을 잇는 개척자',
        'AI 시대의 마케팅 설계자',
      ],
      image: '/v3/vision/team/yoo-seongmin.jpg',
      linkedin: 'https://www.linkedin.com/in/yoo-seongmin',
    },
    {
      name: '이정훈',
      title: 'CSO',
      description: ['AX 시대를 창조한 선구자', '현대 마케팅 시스템의 설계자'],
      image: '/v3/vision/team/lee-junghoon.jpg',
      linkedin: 'https://www.linkedin.com/in/마케팅엔지니어코리아이정훈',
    },
    {
      name: '유준혁',
      title: 'CTO',
      description: [
        'AI 플랫폼을 실현하는 기술 드라이버',
        'AI 서비스의 기술적 기반을 만든 설계자',
      ],
      image: '/v3/vision/team/yoo-junhyuk.jpg',
      linkedin: 'https://www.linkedin.com/in/준혁-유-526a2723a',
    },
    {
      name: '박희진',
      title: '수석 엔지니어',
      description: [
        '허들러스 기술 혁신의 핵심 엔진',
        '사용자 경험을 기술로 실현하는 설계자',
      ],
      image: '/v3/vision/team/park-heejin.jpg',
      linkedin: 'https://www.linkedin.com/in/park-heejin',
    },
    {
      name: '신승우',
      title: 'AI 디자이너',
      description: [
        '감각과 기술의 경계를 허무는 AI 디자이너',
        '새로운 세상을 구현하는 AI 콘텐츠 제작',
      ],
      image: '/v3/vision/team/shin-seung-woo.jpg',
      linkedin: 'https://www.linkedin.com/in/bot-super-896166361',
    },
  ]

  return (
    <section className="py-10 md:py-16 px-4 max-w-7xl mx-auto">
      <div className="flex justify-center mb-10">
        <div className="inline-block px-4 py-2 border border-black rounded-md font-medium text-base text-black bg-gray-50">
          Meet Our Team
        </div>
      </div>

      <h2 className="text-4xl md:text-5xl font-bold mb-12">
        Aware. Precise. Human.
      </h2>

      <div className="flex flex-wrap justify-center gap-8 max-w-[1200px] mx-auto">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="flex flex-col border border-gray-200 rounded w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)]"
          >
            <div className="relative h-40 md:h-64 w-full">
              <Image
                src={member.image || '/placeholder.svg'}
                alt={member.name}
                fill
                style={{ objectFit: 'cover' }}
                className="grayscale"
              />
            </div>
            <div className="p-3 md:p-4">
              <h3 className="text-lg md:text-xl font-bold">{member.name}</h3>
              <p className="text-sm md:text-base text-gray-600 mb-2">
                {member.title}
              </p>

              <div className="mb-3 md:mb-4">
                {member.description.map((line, i) => (
                  <p key={i} className="text-xs md:text-sm text-gray-700">
                    {line}
                  </p>
                ))}
              </div>

              <Link
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="hover:text-blue-600"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
