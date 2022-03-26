import { createProxyMiddleware } from 'http-proxy-middleware'
import { ApiEndPoint } from '@common/api/endpoint'

const options = {
  target: 'https://sepal.io',
  changeOrigin: true,
  pathRewrite: {
    [ApiEndPoint.Geo.sepalProxy()]: '/api/gee',
  },
  connection: 'keep-alive',
  logLevel: 'debug' as const,
  // @ts-ignore
  onProxyReq: (proxyReq: any, req: any, res: any) => {
    console.log('--------------------------------------------')
    console.log('ON PROXY REQ')
    console.log('--------------------------------------------')
    console.log(proxyReq)
    console.log('--------------------------------------------')
    console.log('ON PROXY REQ: REQ')
    console.log('--------------------------------------------')
    console.log(req)
    console.log('--------------------------------------------')
    console.log('ON PROXY REQ: RES')
    console.log('--------------------------------------------')
    console.log(res)
  },
  // @ts-ignore
  onProxyRes: (proxyReq: any, req: any, res: any) => {
    console.log('--------------------------------------------')
    console.log('ON PROXY RES')
    console.log('--------------------------------------------')
    console.log(proxyReq)
    console.log('--------------------------------------------')
    console.log('ON PROXY RES: REQ')
    console.log('--------------------------------------------')
    console.log(req)
    console.log('--------------------------------------------')
    console.log('ON PROXY RES: RES')
    console.log('--------------------------------------------')
    console.log(res)
  },
  // @ts-ignore
  onError: (err, req, res, target) => {
    console.error(err)
    res.writeHead(500, {
      'Content-Type': 'text/plain',
    })
    res.end('Something went wrong. And we are reporting a custom error message.')
  },
}

export const sepalProxy = createProxyMiddleware(options)
