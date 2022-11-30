/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    loader: "custom",
    disableStaticImages: true,
  },
};

module.exports = nextConfig;
