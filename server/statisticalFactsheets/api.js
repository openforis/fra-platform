const {
  getStatisticalFactsheetTableAgg,
  getStatisticalFactsheetData,
  getStatisticalFactsheetLevelISOs,
} = require('./statisticalFactsheetsRepository')

const VersionService = require('../versioning/service')

module.exports.init = (app) => {
  app.get('/statisticalFactsheets/levelISOs', async (req, res) => {
    const schemaName = await VersionService.getDatabaseSchema(req)
    const statisticalFactsheetLevelIso = await getStatisticalFactsheetLevelISOs(schemaName)
    res.json(statisticalFactsheetLevelIso)
  })

  app.get('/statisticalFactsheets/:levelIso', async (req, res) => {
    const schemaName = await VersionService.getDatabaseSchema(req)
    const {
      params: { levelIso },
      query: { rowNames },
    } = req
    const statisticalFactsheetData = await getStatisticalFactsheetData(schemaName, levelIso, rowNames)
    res.json(statisticalFactsheetData)
  })

  app.get('/statisticalFactsheets/', async (req, res) => {
    const schemaName = await VersionService.getDatabaseSchema(req)
    const statisticalFactsheetData = await getStatisticalFactsheetTableAgg(schemaName)

    res.json(statisticalFactsheetData)
  })
}
