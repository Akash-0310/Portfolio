import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
    turbopackLocalPostcssConfig: true,
  },
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
