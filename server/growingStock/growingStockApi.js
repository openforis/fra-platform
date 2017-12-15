const db = require('../db/db')
const R = require('ramda')
const {sendErr} = require('../utils/requestUtils')
const {checkCountryAccessFromReqParams} = require('../utils/accessControl')
const {getFraValues} = require('../eof/api')
const repository = require('./growingStockRepository')

module.exports.init = app => {

  app.get('/growingStock/:countryIso', async (req, res) => {
    checkCountryAccessFromReqParams(req)
    try {
      const growingStockTotal = await repository.readGrowingStock(req.params.countryIso, 'growing_stock_total')
      const growingStockAvg = await repository.readGrowingStock(req.params.countryIso, 'growing_stock_avg')
      const pairTable = (table) => R.pipe(
        R.map(v => [v.year, v]),
        R.fromPairs
      )(table)
      const totalTable = pairTable(growingStockTotal)
      const avgTable = pairTable(growingStockAvg)

      const focArea = await repository.getFocArea(req.params.countryIso)
      const eofArea = await repository.getEofArea(req.params.countryIso)
      const years = R.uniq(R.pluck('year', [...focArea, ...eofArea]))
      const groupedFoc = R.groupBy(R.prop('year'), focArea)
      const groupedEof = R.groupBy(R.prop('year'), eofArea)
      const mergeFocEofByYear = R.map(year => {
        const obj = {
          naturalForestArea: null,
          plantationForestArea: null,
          otherPlantedForestArea: null,
          forestArea: null,
          otherWoodedLand: null,
        }
        const yearFoc = R.path([year, 0], groupedFoc) || {}
        const yearEof = R.path([year, 0], groupedEof) || {}
        return [year, R.merge(obj, R.merge(yearFoc, yearEof))]
      }, years)
      const focEofArea = R.fromPairs(mergeFocEofByYear)
      res.json({avgTable, totalTable, focEofArea})
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.post('/growingStock/:countryIso', async (req, res) => {
    checkCountryAccessFromReqParams(req)
    try {
      await db.transaction(repository.persistBothGrowingStock, [req.user, req.params.countryIso, req.body])
      res.json({})
    } catch (err) {
      sendErr(res, err)
    }
  })

}
