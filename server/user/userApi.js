module.exports.init = app => {

  app.get('/api/loggedInUser/', (req, res) => {
    const userInfo = req.session.passport ? req.session.passport.user : null
    console.log('==== req.session ')
    console.log(req.session)
    userInfo
      ? res.json({userInfo})
      : res.status(401).json({error: 'Not logged in'})
  })

}
