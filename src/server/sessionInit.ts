import * as connectPgSimple from 'connect-pg-simple'
import { Express } from 'express'
import * as session from 'express-session'

import { DB } from 'server/db'

export const init = (app: Express): void => {
  const PgSession = connectPgSimple(session)

  const sessionOptions = {
    secret: process.env.FOO_COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: false,
    },
    store: new PgSession({
      pgPromise: DB,
      tableName: 'user_sessions',
    }),
  }

  app.use(session(sessionOptions))
}
