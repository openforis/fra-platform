const R = require('ramda')

const odpRepository = require('../eof/odpRepository')

module.exports.init = app => {

  app.get('/api/odp/:countryIso', (req, res) => {
    odpRepository.readOriginalDataPoints(req.params.countryIso, true)
      .then(resp => {
        res.json(R.sort((a,b) => a.year - b.year, R.values(resp)))
      })
      .catch(err => {
        console.error(err)
        res.status(500).json({error: 'Could not retrieve data'})
      })
  })
}
