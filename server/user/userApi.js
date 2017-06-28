const db = require('../db/db')
const userRepository = require('./userRepository')
const {sendErr} = require('../requestUtils')

const setLoggedInCookie = (res, value) => res.cookie('loggedIn', value, {maxAge: 30 * 24 * 60 * 60 * 1000})

module.exports.init = app => {
  //Every response contains a logged-in value:
  app.use((req, res, next) => {
    const loggedInCookieValue = req.session.loggedInUser
      ? 'true'
      : 'false'
    setLoggedInCookie(res, loggedInCookieValue)
    next()
  })
  app.post('/api/login/:email', (req, res) => {
    userRepository.getUserInfo(req.params.email)
      .then(result => {
        if (result) {
          req.session.loggedInUser = result
          // We'll have to override the cookie value which has already been set in the middleware:
          setLoggedInCookie(res, 'true')
        } else {
          req.session.loggedInUser = null
          setLoggedInCookie(res, 'false')
        }
        res.json({loginStatus: result ? 'ok' : 'fail'})
      })
      .catch(err => sendErr(res, err))
  })
  app.get('/api/loggedInUser/', (req, res) => {
    console.log('==== session:')
    console.log(req.session)
    if (req.session.loggedInUser)
      res.json({userInfo: req.session.loggedInUser})
    else
      res.status(401).json({error: 'Not logged in'})
  })
}
