const countryRepository = require('./countryRepository')

module.exports.init = app => {
  app.get('/country/all', (req, res) => {
    const user = req.session.passport.user
    countryRepository.getAllowedCountries(user.roles).then(result => {
      res.json(result)
    }).catch(err => {
      console.error(err)
      res.status(500).json({error: 'Could not retrieve country data'})
    })
  })
}
