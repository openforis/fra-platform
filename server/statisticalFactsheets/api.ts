const { getStatisticalFactsheetData } = require('./service')

const VersionService = require('../versioning/service')

module.exports.init = (app) => {
  app.get('/statisticalFactsheets/', async (req, res) => {
    const schemaName = await VersionService.getDatabaseSchema(req)
    const {
      query: { rowNames, level },
    } = req
    const statisticalFactsheetData = await getStatisticalFactsheetData(schemaName, level, rowNames)
    res.json(statisticalFactsheetData)
  })
}
