const R = require('ramda')
const CarbonStockRepository = require('../carbonStock/repository/carbonStock')
const ExtentOfForestRepository = require('../extentOfForest/repository/extentOfForestView')
const ForestCharacteristicsRepository = require('../forestCharacteristics/repository/forestCharacteristicsView')
const GrowingStockRepository = require('../growingStock/repository/growingStockTotalView')
const SpecificForestCategoriesRepository = require('../specificForestCategories/repository/specificForestCategories')
const ForestAreaWithinProtectedAreasRepository = require('../forestAreaWithinProtectedAreas/repository/forestAreaWithinProtectedAreas')
const ForestOwnershipRepository = require('../forestOwnership/repository/forestOwnership')
const PrimaryDesignatedManagementObjectiveRepository = require('../primaryDesignatedManagementObjective/repository/primaryDesignatedManagementObjective')
const countryConfig = require('../../country/countryConfig')

const Utils = require('./utils')

const KEYS = {
  faoStat: 'faoStat',
  area: 'area',
  totalArea: 'totalArea',
}

const _getTotalArea = ({ countryIso, year }) => R.pathOr(0, [countryIso, KEYS.faoStat, year, KEYS.area], countryConfig)

const getExtentOfForest = async (schemaName) => {
  const extentOfForest = await ExtentOfForestRepository.getExtentOfForestView(schemaName)

  return extentOfForest.map((element) => ({
    ...element,
    [KEYS.totalArea]: _getTotalArea(element),
  }))
}

const getGrowingStockTotal = async (schemaName) => {
  const growingStockTotal = await GrowingStockRepository.getGrowingStockTotal(schemaName)

  return Utils.yearsToRowValue(growingStockTotal)
}

const getCarbonStock = async (schemaName) => {
  const carbonStock = await CarbonStockRepository.getCarbonStock(schemaName)

  return Utils.yearsToRowValue(carbonStock)
}

const getForestCharacteristics = async (schemaName) => {
  const forestCharacteristics = await ForestCharacteristicsRepository.getForestCharacteristicsView(schemaName)
  return forestCharacteristics
}

const getSpecificForestCategories = async (schemaName) => {
  const specificForestCategories = await SpecificForestCategoriesRepository.getSpecificForestCategories(schemaName)

  return Utils.yearsToRowValue(specificForestCategories)
}

const getForestAreaWithinProtectedAreas = async (schemaName) => {
  const specificForestCategories = await ForestAreaWithinProtectedAreasRepository.getForestAreaWithinProtectedAreas(
    schemaName
  )

  return Utils.yearsToRowValue(specificForestCategories)
}

const getForestOwnership = async (schemaName) => {
  const forestOwnership = await ForestOwnershipRepository.getForestOwnership(schemaName)

  return Utils.yearsToRowValue(forestOwnership)
}

const getPrimaryDesignatedManagementObjective = async (schemaName) => {
  const forestOwnership = await PrimaryDesignatedManagementObjectiveRepository.getPrimaryDesignatedManagementObjective(
    schemaName
  )

  return Utils.yearsToRowValue(forestOwnership)
}

// const getSample = async () => {
//   return Object.keys(countryConfig).map((key) => ({
//     countryIso: key,
//     [KEYS.totalArea]: _getTotalArea({ countryIso: key, year: 2015 }),
//   }))
// }

module.exports = {
  getPrimaryDesignatedManagementObjective,
  getCarbonStock,
  getExtentOfForest,
  getForestAreaWithinProtectedAreas,
  getForestCharacteristics,
  getForestOwnership,
  getGrowingStockTotal,
  // getSample,
  getSpecificForestCategories,
}
