import { Request, Response } from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'

import { ApiEndPoint } from 'meta/api/endpoint'

const authString = `Basic ${Buffer.from(`${process.env.SEPAL_USER}:${process.env.SEPAL_PASSWORD}`).toString('base64')}`

const options = {
  target: 'https://sepal.io',
  changeOrigin: true,
  pathRewrite: {
    [ApiEndPoint.Geo.sepalProxy()]: '/api/gee',
  },
  connection: 'keep-alive',
  onProxyReq: (proxyReq: any) => {
    proxyReq.setHeader('authorization', authString)
  },

  onError: (_err: Error, _req: Request, res: Response) => {
    res.status(500)
    res.end('Sepal proxy error')
  },
}

export const sepalProxy = createProxyMiddleware(options)
