/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ["page.tsx", "api.ts", "api.tsx."],
  env: {
    baseURL: "https://api-deslocamento.herokuapp.com/api/v1/",
  },
};

module.exports = nextConfig;
