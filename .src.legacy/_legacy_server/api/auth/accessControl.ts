import * as R from 'ramda'

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
  /^\/auth\/google.*/,
]

const checkAuth = (req: any, res: any, next: any) => {
  if (!req.user) {
    const acceptHeader = req.header('Accept')
    if (acceptHeader && acceptHeader.indexOf('application/json') !== -1) {
      res.status(401).json({ error: 'Not logged in' })
    } else {
      res.redirect('/login/')
    }
  } else {
    next()
  }
}

export const init = (app: any) => {
  app.use((req: any, res: any, next: any) => {
    if (R.any((allowedRegex: any) => req.path.match(allowedRegex), allowedPaths)) {
      next()
    } else {
      checkAuth(req, res, next)
    }
  })
}
