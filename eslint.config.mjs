/** @type {import('next').NextConfig} */
const eslintConfig = {
  extends: ['next/babel', 'next/core-web-vitals'],
  rules: {
    // 기본 규칙만 사용
    'react/no-unescaped-entities': 'off',
    '@next/next/no-page-custom-font': 'off',
  },
  ignorePatterns: [
    'node_modules/',
    '.next/',
    'out/',
    'build/',
    '*.d.ts'
  ]
}

export default eslintConfig;
