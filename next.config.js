/** @type {import('next').NextConfig} */
const withImages = require("next-images");
const nextConfig = withImages({
  reactStrictMode: false,
  swcMinify: true,
  images: {
    loader: "custom",
    disableStaticImages: true,
  },
});

module.exports = nextConfig;
