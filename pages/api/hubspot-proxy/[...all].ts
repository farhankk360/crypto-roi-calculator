import { NextApiResponse, NextApiRequest } from 'next'
import httpProxyMiddleware from 'next-http-proxy-middleware'

export default (req: NextApiRequest, res: NextApiResponse) => {
  return httpProxyMiddleware(req, res, {
    target: 'https://hubspot.cryptoroicalculator.com',
    pathRewrite: [
      {
        patternStr: '^/funnels/sales/.*',
        // @ts-ignore
        replaceStr: req.query.all.map((path) => `/${path}`).join(''),
      },
      {
        patternStr: '^/(hs|_hcms|hubfs|hs-fs|cs/c|e3t)/.*',
        replaceStr: req.url,
      },
    ],
  })
}
