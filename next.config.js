/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "tmpfiles.org",
      },
      {
        protocol: "https",
        hostname: "catbox.moe",
      },
      {
        protocol: "https",
        hostname: "files.catbox.moe",
      }
    ],
  },
};

module.exports = nextConfig;
