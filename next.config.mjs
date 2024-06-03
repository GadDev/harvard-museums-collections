/** @type {import('next').NextConfig} */

const BASE_URL = process.env.NODE_ENV === 'production' ? '/test-2-space' : ''

const nextConfig = {
  // output: 'export', // <=== enables static exports, required for github pages deployment
  reactStrictMode: true,
}

export default nextConfig
