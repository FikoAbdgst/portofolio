import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  // Build and dev never share a cache dir, so `next build` can't corrupt a running `next dev`.
  distDir: process.env.NODE_ENV === "development" ? ".next" : ".next-build",
  images: {
    unoptimized: true,
  },
}

export default nextConfig