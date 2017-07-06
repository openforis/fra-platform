const R = require('ramda')
const db = require('../db/db')
const odpRepository = require('./odpRepository')
const {sendErr} = require('../requestUtils')

module.exports.init = app => {

  app.get('/api/odp', (req, res) => {
    if (R.not(R.isNil(req.query.odpId))) {
      odpRepository.getOdp(req.query.odpId)
        .then(resp => res.json(resp))
        .catch(err => sendErr(res, err))
    }
    if (R.not(R.isNil(req.query.countryIso))) {
      odpRepository.listOriginalDataPoints(req.query.countryIso)
        .then(resp => res.json(R.sort((a, b) => a.year - b.year, R.values(resp))))
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
    return db.transaction(odpRepository.saveDraft, [countryIso, req.body])
      .then(result => res.json(result))
      .catch(err => sendErr(res, err))
  })

  const validateOdp = odp => {
    const validYear = R.not(R.or(R.pathEq('year', 0, odp), R.isNil(odp.year)))
    const defaultTo0 = R.defaultTo(0)// R.pipe(v => console.log("---- v " , v) || v, R.defaultTo(0) , v => (Number(v)) )
    const validClasses = R.map(cls => R.pipe(
      // c => console.log("**** " , c) || c,
      o => R.sum(defaultTo0(o.forestPercent), defaultTo0(o.otherWoodedLandPercent), defaultTo0(o.otherLandPercent)),
      // c => console.log("****2 " , c) || c,
      R.equals(100),
      validPercentage => ({validPercentage})
    )(cls), odp.nationalClasses)
    return {validYear, validClasses}
  }

  app.post('/api/odp/markAsActual', (req, res) =>
    db.transaction(odpRepository.markAsActual, [req.query.odpId])
      .then(() =>
        odpRepository.getOdp(req.query.odpId)
          .then(odp => {
            // console.log('=== resp ', odp)
            res.json(validateOdp(odp))
          })
      ).catch(err => sendErr(res, err))
  )

  app.get('/api/prevOdp/:countryIso/:year', (req, res) => {
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
