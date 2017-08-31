const R = require('ramda')
const { setLoggedInCookie } = require('./loggedInCookie')

module.exports.init = (app) => {
  app.use((req, res, next) => {
    const loggedInCookieValue = req.user
      ? 'true'
      : 'false'
    setLoggedInCookie(res, loggedInCookieValue)
    next()
  })
}
