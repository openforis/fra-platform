const R = require('ramda')

const allowedPaths = [
  /^\/login.*/,
  /^\/js\/login*/,
  /^\/style\/login*/,
  /^\/resetPassword.*/,
  /^\/img\//,
  /^\/css\//,
  /^\/ckeditor\//,
  /^\/js\//,
  /^\/style\//,
  /^\/favicon.ico\/?$/,
  /^\/auth\/google.*/
]

const checkAuth = (req, res, next) => {
  if (!req.user) {
    const acceptHeader = req.header('Accept')
    if (acceptHeader && acceptHeader.indexOf('application/json') !== -1) {
      res.status(401).json({error: 'Not logged in'})
    } else {
      res.redirect('/login/')
    }
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
