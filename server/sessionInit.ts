const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'db'.
const db = require('./db/db')

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

module.exports.init = (app: any) => app.use(session(sessionOptions))
