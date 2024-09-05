/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["writertools.s3.amazonaws.com","writertools-v1.s3.amazonaws.com"],
  },
};

export default nextConfig;
