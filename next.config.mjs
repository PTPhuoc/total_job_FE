/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["localhost", "127.0.0.1"], // thêm hostname server của bạn
  },
};

export default nextConfig;
