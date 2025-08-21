/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'oaidalleapiprodscus.blob.core.windows.net',
      },
      {
        protocol: 'https',
        hostname: 'jkgoxcoplnjtxuhmoqxl.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'image.msscdn.net',
      },
    ],
    disableStaticImages: true,
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    loader: 'default',
    loaderFile: '',
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    unoptimized: false,
  },
  async headers() {
    return [
      {
        source: '/_next/image',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      // hurdlers.kr/resource/blogs를 blog.hurdlers.kr로 리다이렉트
      {
        source: '/resource/blogs',
        destination: 'https://blog.hurdlers.kr/',
        permanent: true,
        has: [
          {
            type: 'host',
            value: 'hurdlers.kr',
          },
        ],
      },
      // hurdlers.kr/resource/blogs/{글제목}을 blog.hurdlers.kr/{글제목}로 리다이렉트
      {
        source: '/resource/blogs/:slug*',
        destination: 'https://blog.hurdlers.kr/posts/:slug*',
        permanent: true,
        has: [
          {
            type: 'host',
            value: 'hurdlers.kr',
          },
        ],
      },
      // 101.hurdlers.kr의 블로그 관련 URL들을 blog.hurdlers.kr로 리다이렉트
      {
        source: '/blog',
        destination: 'https://blog.hurdlers.kr/',
        permanent: true,
        has: [
          {
            type: 'host',
            value: '101.hurdlers.kr',
          },
        ],
      },
      {
        source: '/blog/detail/:slug*',
        destination: 'https://blog.hurdlers.kr/posts/:slug*',
        permanent: true,
        has: [
          {
            type: 'host',
            value: '101.hurdlers.kr',
          },
        ],
      },
    ]
  },
  experimental: {
    optimizeCss: false,
    optimizePackageImports: ['lucide-react'],
    inlineCss: false,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

export default nextConfig
