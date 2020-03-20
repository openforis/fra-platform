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
    console.log(JSON.stringify(req.hostname))
    const schemaName = await VersionService.getDatabaseSchema()
    const growingStockTotal = await getGrowingStockTotal(schemaName)
    const carbonStock = await getCarbonStock(schemaName)
    const specificForestCategories = await getSpecificForestCategories(schemaName)
    const forestAreaWithinProtectedAreas = await getForestAreaWithinProtectedAreas(schemaName)
    const primaryDesignatedManagementObjective = await getPrimaryDesignatedManagementObjective(schemaName)
    const forestOwnership = await getForestOwnership()

    res.json({
      growingStockTotal,
      carbonStock,
      specificForestCategories,
      forestAreaWithinProtectedAreas,
      primaryDesignatedManagementObjective,
      forestOwnership,
    })
  })
}
