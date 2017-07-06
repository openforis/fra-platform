module.exports.init = app => {

  app.get('/loggedInUser/', (req, res) => {
    const userInfo = req.session.passport ? req.session.passport.user : null

    userInfo
      ? res.json({userInfo})
      : res.status(401).json({error: 'Not logged in'})
  })

}
