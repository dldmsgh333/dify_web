/** @type {import('next').NextConfig} */

const allowedOrigins = process.env.IFRAME_WHITELIST_ORIGINS?.split(',').map(o => o.trim()).filter(Boolean)

const frameAncestors =
  allowedOrigins.length > 0
    ? `frame-ancestors ${allowedOrigins.join(' ')};`
    : ''

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value:
    frameAncestors, // 👈 여기서 iframe 허용 도메인 제한
  },
]

const nextConfig = {
  productionBrowserSourceMaps: false, // enable browser source map generation during the production build
  // Configure pageExtensions to include md and mdx
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  experimental: {
    // appDir: true,
  },
  // fix all before production. Now it slow the develop speed.
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // https://nextjs.org/docs/api-reference/next.config.js/ignoring-typescript-errors
    ignoreBuildErrors: true,
  },
  output: 'standalone',
  async headers() {
    return [
      {
        source: '/(.*)', // 모든 경로에 csp 적용
        headers: securityHeaders,
      },
    ]
  },
}

module.exports = nextConfig
