/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["writertools.s3.amazonaws.com"],
  },
};

export default nextConfig;
