const { getStatisticalFactsheetTableAgg } = require('./statisticalFactsheetsRepository')

const VersionService = require('../versioning/service')

module.exports.init = (app) => {
  app.get('/statisticalFactsheets/', async (req, res) => {
    const schemaName = await VersionService.getDatabaseSchema(req)
    const statisticalFactsheetData = await getStatisticalFactsheetTableAgg(schemaName)

    res.json(statisticalFactsheetData)
  })
}
