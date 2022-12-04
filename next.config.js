/** @type {import('next').NextConfig} */
const withImages = require("next-images");
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = withImages({
  reactStrictMode: false,
  swcMinify: true,
  images: {
    loader: "custom",
    disableStaticImages: true,
  },
});

module.exports = withPWA(nextConfig);
