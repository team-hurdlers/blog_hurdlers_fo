import Link from 'next/link'
import Image from 'next/image'

export default function MissionSection() {
  return (
    <section className="w-full">
      {/* White section with mission statement */}
      <div className="w-full py-10 md:py-24 px-4 flex flex-col items-center relative z-20 bg-white">
        <div className="inline-block mb-8">
          <div className="inline-block px-4 py-2 border border-black rounded-md font-medium text-base text-black bg-gray-50">
            Mission
          </div>
        </div>

        <div className="max-w-3xl text-center text-xl md:text-3xl font-bold md:leading-[1.5]">
          <p>
            우리는 데이터를 인사이트로,
            <br />
            자동화를 지능으로,
            <br />
            복잡함을 명료함으로 바꾸어
            <br />
            마케터를 번뇌에서 해방시키는 것을
            <br />
            우리의 사명으로 합니다.
          </p>
        </div>
      </div>
    </section>
  )
}
