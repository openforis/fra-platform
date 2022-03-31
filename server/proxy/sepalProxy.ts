import { createProxyMiddleware } from 'http-proxy-middleware'
import { Request, Response } from 'express'

import { ApiEndPoint } from '@common/api/endpoint'

const sepalToken = process.env.SEPAL_TOKEN

const options = {
  target: 'https://sepal.io',
  changeOrigin: true,
  pathRewrite: {
    [ApiEndPoint.Geo.sepalProxy()]: '/api/gee',
  },
  connection: 'keep-alive',
  onProxyReq: (proxyReq: any) => {
    proxyReq.setHeader('authorization', `Basic ${sepalToken}`)
  },

  onError: (_err: Error, _req: Request, res: Response) => {
    res.status(500)
    res.end('Sepal proxy error')
  },
}

export const sepalProxy = createProxyMiddleware(options)
