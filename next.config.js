/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Codigo para permitir traer imagenes de esa url
  images: {
    domains: ["raw.githubusercontent.com"]
  }
}

module.exports = nextConfig
