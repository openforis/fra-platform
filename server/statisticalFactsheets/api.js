const {
  getGrowingStockTotal,
  getCarbonStock,
  getSpecificForestCategories,
  getForestAreaWithinProtectedAreas,
  getPrimaryDesignatedManagementObjective,
  getForestOwnership,
} = require('./repository')
const VersionService = require('../versioning/service')

module.exports.init = app => {
  app.get('/statisticalFactsheets/', async (req, res) => {
    const schemaName = await VersionService.getDatabaseSchema()
    const [
      growingStockTotal,
      carbonStock,
      specificForestCategories,
      forestAreaWithinProtectedAreas,
      primaryDesignatedManagementObjective,
      forestOwnership,
    ] = await Promise.all([
      getGrowingStockTotal(schemaName),
      getCarbonStock(schemaName),
      getSpecificForestCategories(schemaName),
      getForestAreaWithinProtectedAreas(schemaName),
      getPrimaryDesignatedManagementObjective(schemaName),
      getForestOwnership(schemaName)
    ])

    res.json({
      growingStockTotal,
      carbonStock,
      specificForestCategories,
      forestAreaWithinProtectedAreas,
      primaryDesignatedManagementObjective,
      forestOwnership,
    })
  })

  app.get('/statisticalFactsheets/growingStockTotal', async (req, res) => {
    const schemaName = await VersionService.getDatabaseSchema()
    const growingStockTotal = await getGrowingStockTotal(schemaName)

    res.json({
      growingStockTotal,
    })
  })

  app.get('/statisticalFactsheets/carbonStock', async (req, res) => {
    const schemaName = await VersionService.getDatabaseSchema()
    const carbonStock = await getCarbonStock(schemaName)

    res.json({
      carbonStock,
    })
  })

  app.get('/statisticalFactsheets/specificForestCategories', async (req, res) => {
    const schemaName = await VersionService.getDatabaseSchema()
    const specificForestCategories = await getSpecificForestCategories(schemaName)

    res.json({
      specificForestCategories,
    })
  })

  app.get('/statisticalFactsheets/forestAreaWithinProtectedAreas', async (req, res) => {
    const schemaName = await VersionService.getDatabaseSchema()
    const forestAreaWithinProtectedAreas = await getForestAreaWithinProtectedAreas(schemaName)

    res.json({
      forestAreaWithinProtectedAreas,
    })
  })

  app.get('/statisticalFactsheets/primaryDesignatedManagementObjective', async (req, res) => {
    const schemaName = await VersionService.getDatabaseSchema()
    const primaryDesignatedManagementObjective = await getPrimaryDesignatedManagementObjective(schemaName)

    res.json({
      primaryDesignatedManagementObjective,
    })
  })

  app.get('/statisticalFactsheets/forestOwnership', async (req, res) => {
    const schemaName = await VersionService.getDatabaseSchema()
    const forestOwnership = await getForestOwnership(schemaName)

    res.json({
      forestOwnership,
    })
  })
}
