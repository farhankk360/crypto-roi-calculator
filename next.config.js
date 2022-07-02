// /** @type {import('next').NextConfig} */
// module.exports = {
//   reactStrictMode: true,
// }

/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  pwa: {
    dest: 'public',
    runtimeCaching,
    register: true,
    skipWaiting: true,
  },
})
