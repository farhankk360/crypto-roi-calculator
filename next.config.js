// /** @type {import('next').NextConfig} */
// module.exports = {
//   reactStrictMode: true,
// }

/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

const hubspotHeaders = [
  { key: 'host', value: 'hubspot.cryptoroicalculator.com' },
  {
    key: 'X-HS-Public-Host',
    value: 'hubspot.cryptoroicalculator.com',
  },
  {
    key: 'X-HubSpot-Trust-Forwarded-For',
    value: 'true',
  },
  {
    key: 'X-Forwarded-Proto',
    value: 'https',
  },
  {
    key: 'x-hs-zone',
    value: 'hscoscdn40.net',
  },
]

module.exports = withPWA({
  async rewrites() {
    return [
      {
        source: '/funnels/sales/:path*',
        destination: 'https://hubspot.cryptoroicalculator.com/sales/:path*',
      },
      {
        source: '/funnels/application/:path*',
        destination:
          'https://hubspot.cryptoroicalculator.com/application/:path*',
      },
      {
        source: '/(hs|_hcms|hubfs|hs-fs|cs/c|e3t)/:path*',
        destination: 'https://hubspot.cryptoroicalculator.com/:path*',
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/(hs|_hcms|hubfs|hs-fs|cs/c|e3t)/:path*',
        headers: hubspotHeaders,
      },
      {
        source: '/funnels/sales/:path*',
        headers: hubspotHeaders,
      },
      {
        source: '/funnels/application/:path*',
        headers: hubspotHeaders,
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
