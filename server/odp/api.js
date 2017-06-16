const R = require('ramda')

const odpRepository = require('../eof/odpRepository')

module.exports.init = app => {

  app.get('/api/odp/:countryIso', (req, res) => {
    odpRepository.readOriginalDataPoints(req.params.countryIso)
      .then(resp => res.json(R.values(resp)))
      .catch(err => {
        console.error(err)
        res.status(500).json({error: 'Could not retrieve data'})
      })
  })
}
