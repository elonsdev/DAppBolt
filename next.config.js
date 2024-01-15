/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

const withPWA = require("next-pwa")({
  dest: "public", // Destination directory for the PWA files
});

module.exports = withPWA(nextConfig);
