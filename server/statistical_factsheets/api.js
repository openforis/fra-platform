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
  app.get('/statistical_factsheets/', async (req, res) => {
    const schemaName = await VersionService.getDatabaseSchema()
    const growingStockTotal = await getGrowingStockTotal(schemaName)
    const carbonStock = await getCarbonStock(schemaName)
    const specificForestCategories = await getSpecificForestCategories(schemaName)
    const forestAreaWithinProtectedAreas = await getForestAreaWithinProtectedAreas(schemaName)
    const primaryDesignatedManagementObjective = await getPrimaryDesignatedManagementObjective(schemaName)
    const forestOwnership = await getForestOwnership(schemaName)

    res.json({
      growingStockTotal,
      carbonStock,
      specificForestCategories,
      forestAreaWithinProtectedAreas,
      primaryDesignatedManagementObjective,
      forestOwnership,
    })
  })

  app.get('/statistical_factsheets/growing_stock_total', async (req, res) => {
    const schemaName = await VersionService.getDatabaseSchema()
    const growingStockTotal = await getGrowingStockTotal(schemaName)

    res.json({
      growingStockTotal,
    })
  })

  app.get('/statistical_factsheets/carbon_stock', async (req, res) => {
    const schemaName = await VersionService.getDatabaseSchema()
    const carbonStock = await getCarbonStock(schemaName)

    res.json({
      carbonStock,
    })
  })

  app.get('/statistical_factsheets/specific_forest_categories', async (req, res) => {
    const schemaName = await VersionService.getDatabaseSchema()
    const specificForestCategories = await getSpecificForestCategories(schemaName)

    res.json({
      specificForestCategories,
    })
  })

  app.get('/statistical_factsheets/forest_areaWithin_protected_areas', async (req, res) => {
    const schemaName = await VersionService.getDatabaseSchema()
    const forestAreaWithinProtectedAreas = await getForestAreaWithinProtectedAreas(schemaName)

    res.json({
      forestAreaWithinProtectedAreas,
    })
  })

  app.get('/statistical_factsheets/primary_designated_management_objective', async (req, res) => {
    const schemaName = await VersionService.getDatabaseSchema()
    const primaryDesignatedManagementObjective = await getPrimaryDesignatedManagementObjective(schemaName)

    res.json({
      primaryDesignatedManagementObjective,
    })
  })

  app.get('/statistical_factsheets/forest_ownership', async (req, res) => {
    const schemaName = await VersionService.getDatabaseSchema()
    const forestOwnership = await getForestOwnership(schemaName)

    res.json({
      forestOwnership,
    })
  })
}
