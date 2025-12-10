import { ServerResponse } from 'http'
import { createProxyMiddleware, Options } from 'http-proxy-middleware'

const authString = `Basic ${Buffer.from(`${process.env.SEPAL_USER}:${process.env.SEPAL_PASSWORD}`).toString('base64')}`

const options: Options = {
  target: 'https://sepal.io',
  changeOrigin: true,
  pathRewrite: {
    '^': '/api/gee', // replace everything (the stripped path) with '/api/gee' + original path
  },
  on: {
    proxyReq: (proxyReq, _req, _res) => {
      proxyReq.setHeader('authorization', authString)
    },
    error: (_err, _req, res) => {
      if (res instanceof ServerResponse) {
        res.end(`Sepal proxy error [${res.statusCode}]`)
      } else {
        // raw socket fallback
        res.end()
      }
    },
  },
}

export const sepalProxy = createProxyMiddleware(options)
