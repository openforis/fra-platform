import path from 'path'
import compression from 'compression'
import wwwhisper from 'connect-wwwhisper'
import cookieParser from 'cookie-parser'
import express from 'express'
import morgan from 'morgan'

import { Objects } from 'utils/objects'

import { Api } from 'server/api'
import { Proxy } from 'server/proxy/proxy'
import { SocketServer } from 'server/service/socket'
import { ProcessEnv } from 'server/utils'
import { Logger } from 'server/utils/logger'

import { swaggerInit } from './swagger/swaggerInit'
import { sendErr } from './utils/requests'
import * as resourceCacheControl from './resourceCacheControl'

export const serverInit = (): void => {
  const app = express()

  Proxy.init(app)

  app.use(wwwhisper(false))
  app.use(cookieParser())
  app.set('query parser', 'extended')
  // TODO: pass content-type from our client requests - now it's empty and therefore solution below
  // app.use(express.json({ limit: '5000kb', type: ['application/json', 'application/*+json'] }))
  app.use(
    express.json({
      limit: '5000kb',
      type: (req) => {
        const contentType = req.headers['content-type']
        return (
          Objects.isEmpty(contentType) || contentType.startsWith('application/json') || contentType.includes('+json')
        )
      },
    })
  )
  resourceCacheControl.init(app)
  app.use(compression({ threshold: 512 }))

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
  }

  app.use('/assets', express.static(`${__dirname}/../client/assets`))
  app.use('/css', express.static(`${__dirname}/../client/css`))
  app.use('/img', express.static(`${__dirname}/../client/img`))
  app.use('/video', express.static(`${__dirname}/../client/video`))

  /*
   * Initialize API
   */
  Api.init(app)

  swaggerInit(app)

  app.use('/{*splat}', express.static(path.resolve(__dirname, '..', 'client')))

  // Custom error-handling for handling custom exceptions and
  // sending the uncaught errors as json instead of HTML
  // http://expressjs.com/en/guide/error-handling.html
  // NB: This must not be an arrow function to make express detect this as an error handler.
  app.use((err: any, _req: any, res: any, _: any) => {
    if (err) sendErr(res, err)
  })

  // allowing to let passportjs to use https in heroku - see https://stackoverflow.com/questions/20739744/passportjs-callback-switch-between-http-and-https
  app.enable('trust proxy')

  const server = app.listen(ProcessEnv.port, () => {
    Logger.info(`FRA Platform server listening on port ${process.env.PORT}  with pid: ${process.pid}`)
  })

  SocketServer.init(server)
}
