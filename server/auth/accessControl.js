const R = require('ramda')

const allowedPaths = [
  /^\/login.html.*/,
  /^\/img\//,
  /^\/css\//,
  /^\/auth\/google.*/]

const checkAuth = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({error: 'Not logged in'})
  } else {
    next()
  }
}

module.exports.init = app => {
  app.use((req, res, next) => {
    if (R.any(allowedRegex => req.path.match(allowedRegex), allowedPaths)) {
      next()
    } else {
      checkAuth(req, res, next)
    }
  })
}
