import session from 'express-session'
import connectPgSimple from 'connect-pg-simple'
import * as db from './db/db_deprecated'

const pgSession = connectPgSimple(session)

const sessionOptions = {
  secret: process.env.FOO_COOKIE_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: false },
  store: new pgSession({
    pool: db.pool,
    tableName: 'user_sessions',
  }),
}

export const init = (app: any) => app.use(session(sessionOptions))
