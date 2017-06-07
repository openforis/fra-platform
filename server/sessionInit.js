const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)
const db = require('./db/db')

const sessionOptions = {
  secret: "f80e6754-70f7-44e9-83b0-3a69fbb696bb",
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
  store: new pgSession({
    pool : db.pool,
    tableName : 'user_sessions'
  })
}

module.exports.init = app => app.use(session(sessionOptions))
