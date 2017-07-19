module.exports.init = app => {
  app.get('/loggedInUser/', (req, res) => {
    const userInfo = req.session.passport.user
    res.json({userInfo})
  })
}
