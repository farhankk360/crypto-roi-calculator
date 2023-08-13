// /** @type {import('next').NextConfig} */
// module.exports = {
//   reactStrictMode: true,
// }

/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  async rewrites() {
    return [
      {
        source: '/funnels/sales/:path*',
        destination: '/api/hubspot-proxy/sales/:path*',
      },
      {
        source: '/(hs|_hcms|hubfs|hs-fs|cs/c|e3t)/:path*',
        destination: '/api/hubspot-proxy/:path*',
      },
    ]
  },
  pwa: {
    dest: 'public',
    runtimeCaching,
    register: true,
    skipWaiting: true,
  },
})
