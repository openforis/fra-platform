const {
  getStatisticalFactsheetTableAgg,
  getCarbonAndGrowingStock,
  getPrimaryDesignatedManagementObjective,
  getForestArea,
  getForestAreaPercent,
  getPrimaryForest,
  getForestOwnership,
  getForestAreaWithinProtectedAreas,
  getNaturallyRegenerating,
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

  app.get('/statisticalFactsheets/forestArea/:level', async (req, res) => {
    const schemaName = await VersionService.getDatabaseSchema(req)
    const forestArea = await getForestArea(schemaName, req.params.level)

    res.json(forestArea)
  })

  app.get('/statisticalFactsheets/forestAreaPercent/:level', async (req, res) => {
    const schemaName = await VersionService.getDatabaseSchema(req)
    const forestAreaPercent = await getForestAreaPercent(schemaName, req.params.level)

    res.json(forestAreaPercent)
  })

  app.get('/statisticalFactsheets/primaryForest/:level', async (req, res) => {
    const schemaName = await VersionService.getDatabaseSchema(req)
    const primaryForest = await getPrimaryForest(schemaName, req.params.level)

    res.json(primaryForest)
  })

  app.get('/statisticalFactsheets/forestOwnership/:level', async (req, res) => {
    const schemaName = await VersionService.getDatabaseSchema(req)
    const forestOwnership = await getForestOwnership(schemaName, req.params.level)

    res.json(forestOwnership)
  })

  app.get('/statisticalFactsheets/forestAreaWithinProtectedAreas/:level', async (req, res) => {
    const schemaName = await VersionService.getDatabaseSchema(req)
    const forestAreaWithinProtectedAreas = await getForestAreaWithinProtectedAreas(schemaName, req.params.level)

    res.json(forestAreaWithinProtectedAreas)
  })
  app.get('/statisticalFactsheets/naturallyRegenerating/:level', async (req, res) => {
    const schemaName = await VersionService.getDatabaseSchema(req)
    const naturallyRegenerating = await getNaturallyRegenerating(schemaName, req.params.level)

    res.json(naturallyRegenerating)
  })
}
