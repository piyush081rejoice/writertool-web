/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["writertools.s3.amazonaws.com", "writertools-v1.s3.amazonaws.com"],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false, // Add other fallbacks if necessary
    };
    return config;
  },
};

export default nextConfig;
