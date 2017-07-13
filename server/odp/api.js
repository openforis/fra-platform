const R = require('ramda')
const db = require('../db/db')
const odpRepository = require('./odpRepository')
const {sendErr} = require('../requestUtils')

module.exports.init = app => {

  app.get('/odp', (req, res) => {
    const odp = R.isNil(req.query.odpId) ? Promise.resolve({}) : odpRepository.getOdp(req.query.odpId)
    const odps = odpRepository.listOriginalDataPoints(req.query.countryIso)
    Promise.all([odp, odps])
      .then(([odpResult, odpsResult]) => {
        const result = R.merge(
          odpResult,
          {
            reservedYears: R.pipe(
              R.values,
              R.map(R.prop('year')),
              R.uniq,
              R.reject(R.equals(R.defaultTo(null, odpResult.year))) // odp's year is not reserved for the odp itself
            )(odpsResult)
          }
        )
        return res.json(result)
      })
      .catch(err => sendErr(res, err))
  })

  app.get('/odps/:countryIso', (req, res) => {
    odpRepository.listAndValidateOriginalDataPoints(req.params.countryIso)
      .then(resp => res.json(R.sort((a, b) => a.year - b.year, R.values(resp))))
      .catch(err => {
        console.error(err)
        res.status(500).json({error: 'Could not retrieve data'})
      })
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

  app.delete('/odp/draft', (req, res) =>
    db.transaction(odpRepository.deleteDraft, [req.query.odpId])
      .then(() => res.json({}))
      .catch(err => sendErr(res, err))
  )

  app.post('/odp/markAsActual', (req, res) =>
    db.transaction(odpRepository.markAsActual, [req.query.odpId])
      .then(() => res.json({})
      ).catch(err => sendErr(res, err))
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
