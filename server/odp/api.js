const R = require('ramda')

const db = require('../db/db')
const odpRepository = require('../eof/odpRepository')

module.exports.init = app => {

  app.get('/api/odp', (req, res) => {
    if(R.not(R.isNil(req.query.odpId))) {
      odpRepository.getOdp(req.query.odpId)
        .then(resp => res.json(resp))
        .catch(err => sendErr(res, err))
    }
    if(R.not(R.isNil(req.query.countryIso))) {
      odpRepository.readOriginalDataPoints(req.query.countryIso, true)
        .then(resp => res.json(R.sort((a,b) => a.year - b.year, R.values(resp))))
        .catch(err => {
          console.error(err)
          res.status(500).json({error: 'Could not retrieve data'})
        })
    }
  })

  app.delete('/api/odp', (req, res) => {
    db.transaction(odpRepository.deleteOdp, [req.query.odpId])
      .then(() => res.json({}))
      .catch(err => sendErr(res, err))
  })

  app.post('/api/odp/draft', (req, res) => {
    const countryIso = req.query.countryIso
    db.transaction(odpRepository.saveDraft, [countryIso, req.body])
      .then(result => res.json(result))
      .catch(err => sendErr(res, err))
  })

  app.post('/api/odp/markAsActual', (req, res) =>
    db.transaction(odpRepository.markAsActual, [req.query.odpId])
      .then(() => res.json({}))
      .catch(err => sendErr(res, err))
  )
}
