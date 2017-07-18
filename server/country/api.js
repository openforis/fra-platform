const R = require('ramda')
const countryRepository = require('./countryRepository')

module.exports.init = app => {
  app.get('/country/all', (req, res) => {
    const user = R.path(['session', 'passport', 'user'], req)
    if (!user) {
      res.status(401).json({error: 'Not logged in'})
      return
    }
    countryRepository.getAllowedCountries(user.roles).then(result => {
      res.json(result.rows)
    }).catch(err => {
      console.error(err)
      res.status(500).json({error: 'Could not retrieve country data'})
    })
  })
}
