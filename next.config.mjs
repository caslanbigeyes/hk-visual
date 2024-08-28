/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // 忽略构建时的 TypeScript 错误
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
