/** @type {import('next').NextConfig} */
const withImages = require("next-images");
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV !== "production",
});

const nextConfig = withImages({
  reactStrictMode: false,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  images: {
    loader: "custom",
    disableStaticImages: true,
  },
});

module.exports = withPWA(nextConfig);
