This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 리다이렉트 설정

이 프로젝트는 기존 블로그 URL들을 새로운 도메인으로 리다이렉트하는 설정이 포함되어 있습니다.

### 리다이렉트 규칙

#### hurdlers.kr → blog.hurdlers.kr
- `https://hurdlers.kr/resource/blogs` → `https://blog.hurdlers.kr/`
- `https://hurdlers.kr/resource/blogs/{글제목}` → `https://blog.hurdlers.kr/posts/{글제목}`

#### 101.hurdlers.kr → blog.hurdlers.kr  
- `https://101.hurdlers.kr/blog` → `https://blog.hurdlers.kr/`
- `https://101.hurdlers.kr/blog/detail/{글제목}` → `https://blog.hurdlers.kr/posts/{글제목}`

### 예시
- `https://hurdlers.kr/resource/blogs/how-to-design-data-for-marketers` → `https://blog.hurdlers.kr/posts/how-to-design-data-for-marketers`
- `https://101.hurdlers.kr/blog/detail/ai-marketing-guide` → `https://blog.hurdlers.kr/posts/ai-marketing-guide`

리다이렉트 설정은 `next.config.mjs` 파일의 `redirects()` 함수에서 관리됩니다.
