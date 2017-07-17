const countryRepository = require('./countryRepository')

module.exports.init = app => {
  app.get('/country/all', (req, res) => {
    countryRepository.getAllCountries().then(result => {
      res.json(result.rows)
    }).catch(err => {
      console.error(err)
      res.status(500).json({error: 'Could not retrieve country data'})
    })
  })

}
