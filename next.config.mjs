/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.externals.push({
      canvas: 'canvas',
      bufferutil: 'bufferutil',
      'utf-8-validate': 'utf-8-validate',
    })
    return config
  },
  // Add other configuration options as needed
};

export default nextConfig;