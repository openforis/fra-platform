import * as path from 'path'
import * as bodyParser from 'body-parser'
import * as compression from 'compression'
import * as wwwhisper from 'connect-wwwhisper'
import * as cookieParser from 'cookie-parser'
import * as express from 'express'
import * as morgan from 'morgan'

import { Api } from 'server/api'
import { Proxy } from 'server/proxy/proxy'
import { initSchedulers } from 'server/schedulers'
import { SocketServer } from 'server/service/socket'
import { ProcessEnv } from 'server/utils'
import { Logger } from 'server/utils/logger'

import { sendErr } from './utils/requests'
import * as resourceCacheControl from './resourceCacheControl'

export const serverInit = () => {
  const app = express()
  Proxy.init(app)
  app.use(wwwhisper(false))
  app.use(cookieParser())

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
  }

  app.use(bodyParser.json({ limit: '5000kb' }))

  resourceCacheControl.init(app)

  app.use(compression({ threshold: 512 }))

  app.use('/img/', express.static(`${__dirname}/../../web-resources/img`))
  app.use('/css/', express.static(`${__dirname}/../../web-resources/css`))
  app.use('/video', express.static(`${__dirname}/../../web-resources/video`))

  app.use('/style', express.static(`${__dirname}/../client/style`))
  app.use('/js', express.static(`${__dirname}/../client/js`))
  app.use('/woff2.css', express.static(`${__dirname}/../client/woff2.css`))

  /*
   * Initialize API
   */
  Api.init(app)

  app.use('/*', express.static(path.resolve(__dirname, '..', 'client')))

  // Custom error-handling for handling custom exceptions and
  // sending the uncaught errors as json instead of HTML
  // http://expressjs.com/en/guide/error-handling.html
  // NB: This must not be an arrow function to make express detect this as an error handler.
  app.use((err: any, _req: any, res: any, _: any) => {
    if (err) sendErr(res, err)
  })

  // allowing to let passportjs to use https in heroku - see https://stackoverflow.com/questions/20739744/passportjs-callback-switch-between-http-and-https
  app.enable('trust proxy')

  initSchedulers()

  const server = app.listen(ProcessEnv.port, () => {
    Logger.info(`FRA Platform server listening on port ${process.env.PORT}  with pid: ${process.pid}`)
  })

  SocketServer.init(server)
}
