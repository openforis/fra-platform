const R = require('ramda')
const db = require('../db/db')
const odpRepository = require('./odpRepository')
const {sendErr} = require('../requestUtils')

module.exports.init = app => {

  app.get('/odp', (req, res) => {
    if (R.not(R.isNil(req.query.odpId))) {
      console.log('odpid', req.query.odpId)
      console.log('-1', R.equals('-1', req.query.odpId))
      const odp = R.equals('-1', req.query.odpId) ? Promise.resolve({}) : odpRepository.getOdp(req.query.odpId)
      const odps = odpRepository.listOriginalDataPoints(req.query.countryIso)
      Promise.all([odp, odps])
        .then(resp => {
          const result = R.merge(
            resp[0],
            {
              odpYears: R.pipe(R.values, R.map(R.prop('year')), R.uniq)(resp[1])
            }
          )
          return res.json(result)
        })
        .catch(err => sendErr(res, err))
    }
    else if (R.not(R.isNil(req.query.countryIso))) {
      odpRepository.listOriginalDataPoints(req.query.countryIso)
        .then(resp => res.json(R.sort((a, b) => a.year - b.year, R.values(resp))))
        .catch(err => {
          console.error(err)
          res.status(500).json({error: 'Could not retrieve data'})
        })
    }
  })

  app.delete('/odp', (req, res) => {
    db.transaction(odpRepository.deleteOdp, [req.query.odpId])
      .then(() => res.json({}))
      .catch(err => sendErr(res, err))
  })

  app.post('/odp/draft', (req, res) => {
    const countryIso = req.query.countryIso
    return db.transaction(odpRepository.saveDraft, [countryIso, req.body])
      .then(result => res.json(result))
      .catch(err => sendErr(res, err))
  })

  app.post('/odp/markAsActual', (req, res) =>
    db.transaction(odpRepository.markAsActual, [req.query.odpId])
      .then(() => res.json({}))
      .catch(err => sendErr(res, err))
  )

  app.get('/prevOdp/:countryIso/:year', (req, res) => {
    odpRepository.listOriginalDataPoints(req.params.countryIso)
      .then(resp => {
        const prevOdp = R.pipe(
          R.filter(o => o.year !== 0 && o.year < req.params.year),
          R.sort((a, b) => b.year - a.year),
          R.head
        )(R.values(resp))

        prevOdp
          ? odpRepository.getOdp(prevOdp.odpId).then(odp => res.json(odp)).catch(err => sendErr(res, err))
          : res.json({})
      })
      .catch(err => sendErr(res, err))

  })

}
