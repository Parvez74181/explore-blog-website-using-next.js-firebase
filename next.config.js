/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "drive.google.com",
      "ws-na.amazon-adsystem.com",
      "m.media-amazon.com",
    ],
  },
};

module.exports = nextConfig;
