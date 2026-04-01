/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@trpc/server', '@trpc/client', '@trpc/react-query', '@trpc/next'],
}

module.exports = nextConfig