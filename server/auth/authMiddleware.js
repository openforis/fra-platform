const R = require('ramda')
const { setLoggedInCookie } = require('./loggedInCookie')

module.exports.init = (app) => {
  app.use((req, res, next) => {
    const loggedInCookieValue = R.path(['session', 'passport', 'user'], req)
      ? 'true'
      : 'false'
    setLoggedInCookie(res, loggedInCookieValue)
    next()
  })
}
