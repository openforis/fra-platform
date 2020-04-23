const Manager = require('./manager')
const VersionService = require('../../versioning/service')

module.exports.init = (app) => {
  app.get('/statisticalFactsheets/', async (req, res) => {
    const schemaName = await VersionService.getDatabaseSchema(req)
    const [
      extentOfForest,
      growingStockTotal,
      carbonStock,
      forestCharacteristics,
      forestAreaWithinProtectedAreas,
      specificForestCategories,
      forestOwnership,
      primaryDesignatedManagementObjective,
    ] = await Promise.all([
      Manager.getExtentOfForest(schemaName),
      Manager.getGrowingStockTotal(schemaName),
      Manager.getCarbonStock(schemaName),
      Manager.getForestCharacteristics(schemaName),
      Manager.getForestAreaWithinProtectedAreas(schemaName),
      Manager.getSpecificForestCategories(schemaName),
      Manager.getForestOwnership(schemaName),
      Manager.getPrimaryDesignatedManagementObjective(schemaName),
    ])

    res.json({
      carbonStock,
      extentOfForest,
      forestAreaWithinProtectedAreas,
      forestCharacteristics,
      forestOwnership,
      growingStockTotal,
      primaryDesignatedManagementObjective,
      specificForestCategories,
    })
  })

  app.get('/statisticalFactsheets/forestCharacteristics', async (req, res) => {
    const schemaName = await VersionService.getDatabaseSchema(req)
    const forestCharacteristics = await Manager.getForestCharacteristics(schemaName)

    res.json({
      forestCharacteristics,
    })
  })

  app.get('/statisticalFactsheets/extentOfForest', async (req, res) => {
    const schemaName = await VersionService.getDatabaseSchema(req)
    const extentOfForest = await Manager.getExtentOfForest(schemaName)

    res.json({
      extentOfForest,
    })
  })

  app.get('/statisticalFactsheets/growingStockTotal', async (req, res) => {
    const schemaName = await VersionService.getDatabaseSchema(req)
    const growingStockTotal = await Manager.getGrowingStockTotal(schemaName)

    res.json({
      growingStockTotal,
    })
  })

  app.get('/statisticalFactsheets/carbonStock', async (req, res) => {
    const schemaName = await VersionService.getDatabaseSchema(req)
    const carbonStock = await Manager.getCarbonStock(schemaName)
    // Note:
    // statisticalFactsheets: carbon stock in biomass (Gt) is:
    // Table 2D: Sum(Carbon in above-ground biomass, Carbon in below-ground biomass)

    res.json({
      carbonStock,
    })
  })

  app.get('/statisticalFactsheets/specificForestCategories', async (req, res) => {
    const schemaName = await VersionService.getDatabaseSchema(req)
    const specificForestCategories = await Manager.getSpecificForestCategories(schemaName)

    res.json({
      specificForestCategories,
    })
  })

  app.get('/statisticalFactsheets/forestAreaWithinProtectedAreas', async (req, res) => {
    const schemaName = await VersionService.getDatabaseSchema(req)
    const forestAreaWithinProtectedAreas = await Manager.getForestAreaWithinProtectedAreas(schemaName)

    res.json({
      forestAreaWithinProtectedAreas,
    })
  })

  app.get('/statisticalFactsheets/primaryDesignatedManagementObjective', async (req, res) => {
    const schemaName = await VersionService.getDatabaseSchema(req)
    const primaryDesignatedManagementObjective = await Manager.getPrimaryDesignatedManagementObjective(schemaName)

    res.json({
      primaryDesignatedManagementObjective,
    })
  })

  app.get('/statisticalFactsheets/forestOwnership', async (req, res) => {
    const schemaName = await VersionService.getDatabaseSchema(req)
    const forestOwnership = await Manager.getForestOwnership(schemaName)

    res.json({
      forestOwnership,
    })
  })
}
