const {
  getStatisticalFactsheetTableAgg,
  getCarbonAndGrowingStock,
  getPrimaryDesignatedManagementObjective,
} = require('./statisticalFactsheetsRepository')

const VersionService = require('../versioning/service')

module.exports.init = (app) => {
  app.get('/statisticalFactsheets/', async (req, res) => {
    const schemaName = await VersionService.getDatabaseSchema(req)
    const statisticalFactsheetData = await getStatisticalFactsheetTableAgg(schemaName)

    res.json(statisticalFactsheetData)
  })

  app.get('/statisticalFactsheets/carbonAndGrowingStock/:level', async (req, res) => {
    const schemaName = await VersionService.getDatabaseSchema(req)
    const carbonAndGrowingStock = await getCarbonAndGrowingStock(schemaName, req.params.level)

    res.json(carbonAndGrowingStock)
  })

  app.get('/statisticalFactsheets/primaryDesignatedManagementObjective/:level', async (req, res) => {
    const schemaName = await VersionService.getDatabaseSchema(req)
    const primaryDesignatedManagementObjective = await getPrimaryDesignatedManagementObjective(
      schemaName,
      req.params.level
    )

    res.json(primaryDesignatedManagementObjective)
  })
}
