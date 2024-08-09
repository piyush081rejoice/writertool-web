// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: false,
//   images: {
//     domains: ["writertools.s3.amazonaws.com","writertools-v1.s3.amazonaws.com"],
//   },
// };

// export default nextConfig;

// /** @type {import('next').NextConfig} */
// import CompressionPlugin from 'compression-webpack-plugin';

// const nextConfig = {
//   reactStrictMode: false,
//   images: {
//     domains: [
//       "writertools.s3.amazonaws.com",
//       "writertools-v1.s3.amazonaws.com"
//     ],
//   },
//   webpack: (config, { isServer }) => {
//     if (!isServer) {
//       config.plugins.push(
//         new CompressionPlugin({
//           algorithm: 'gzip', // or 'brotliCompress' for Brotli
//           test: /\.(js|css|html|svg)$/, // Files to compress
//           threshold: 10240, // Minimum size in bytes for compression (10KB)
//           minRatio: 0.8, // Compression ratio
//         })
//       );
//     }
//     return config;
//   },
// };

// export default nextConfig;


import CompressionPlugin from 'compression-webpack-plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'writertools.s3.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'writertools-v1.s3.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(
        new CompressionPlugin({
          algorithm: 'gzip', // or 'brotliCompress' for Brotli
          test: /\.(js|css|html|svg)$/, // Files to compress
          threshold: 10240, // Minimum size in bytes for compression (10KB)
          minRatio: 0.8, // Compression ratio
        })
      );
    }
    return config;
  },
};

export default nextConfig;
