const R = require('ramda')
const assert = require('assert')
const specificForestCategories = require('./mappings/specificForestCategories')
const forestAreaChange = require('./mappings/forestAreaChange')
const holderOfManagementRights = require('./mappings/holderOfManagementRights')
const primaryDesignatedManagementObjective = require('./mappings/primaryDesignatedManagementObjective')
const areaAffectedByFire = require('./mappings/areaAffectedByFire')
const growingStockComposition = require('./mappings/growingStockComposition')
const nonWoodForestProductsRemovals = require('./mappings/nonWoodForestProductsRemovals')
const nonWoodForestProductsRemovalsCurrency = require('./mappings/nonWoodForestProductsRemovalsCurrency')
const biomassStock = require('./mappings/biomassStock')
const carbonStock = require('./mappings/carbonStock')
const carbonStockSoilDepth = require('./mappings/carbonStockSoilDepth')
const degradedForest = require('./mappings/degradedForest')
const employment = require('./mappings/employment')
const graduationOfStudents = require('./mappings/graduationOfStudents')
const forestAreaWithinProtectedAreas = require('./mappings/forestAreaWithinProtectedAreas')
const totalAreaWithDesignatedManagementObjective = require('./mappings/totalAreaWithDesignatedManagementObjective')
const annualReforestation = require('./mappings/annualReforestation')
const forestOwnership = require('./mappings/forestOwnership')
const disturbances = require('./mappings/disturbances')
const areaOfPermanentForestEstate = require('./mappings/areaOfPermanentForestEstate')
const forestPolicy = require('./mappings/forestPolicy')
const otherLandWithTreeCover = require('./mappings/otherLandWithTreeCover')
const climaticDomain = require('./mappings/climaticDomain')

const mappings = {
  specificForestCategories,
  forestAreaChange,
  primaryDesignatedManagementObjective,
  areaAffectedByFire,
  growingStockComposition,
  holderOfManagementRights,
  nonWoodForestProductsRemovals,
  nonWoodForestProductsRemovalsCurrency,
  degradedForest,
  employment,
  graduationOfStudents,
  forestOwnership,
  forestAreaWithinProtectedAreas,
  totalAreaWithDesignatedManagementObjective,
  annualReforestation,
  disturbances,
  biomassStock,
  carbonStock,
  carbonStockSoilDepth,
  areaOfPermanentForestEstate,
  forestPolicy,
  otherLandWithTreeCover,
  climaticDomain
}

const getRowIndex = (name, names) => {
  const idx = R.findIndex((x) => x === name, names)
  return idx === -1 ? -1 : idx
}

const getRowName = (idx, names) => names[idx]

const getColumnName = (idx, columns) => R.path([idx, 'name'], columns)

const getColumnIndex = (name, columns) => R.findIndex((x) => x.name === name, columns)

const Mapping = (mapping) =>
  R.merge(mapping,
    {
      getRowName: (idx) => getRowName(idx, mapping.rows.names),
      getRowIndex: (name) => getRowIndex(name, mapping.rows.names),
      getFullRowCount: () => mapping.rows.names.length,
      getColumn: (idx) => mapping.columns[idx],
      getColumnName: (idx) => getColumnName(idx, mapping.columns),
      getColumnIndex: (name) => getColumnIndex(name, mapping.columns),
      getFullColumnCount: () => mapping.columns.length
    })

const assertSanity = (mappingObj) => {
  const errMsg = 'Malformed FRA table mapping'
  assert(mappingObj.getFullRowCount() > 0, errMsg)
  assert(mappingObj.getFullColumnCount() > 0, errMsg)
  assert(mappingObj, errMsg)
  assert(mappingObj.rows.names.length > 0, errMsg)
  assert(mappingObj.columns.length > 0, errMsg)
}

const getMapping = (tableSpecName) => {
  const mappingData = mappings[tableSpecName]
  if (!mappingData) throw new Error(`Could not find mapping for tableSpecName ${tableSpecName}`)
  const mappingObj = Mapping(mappingData)
  assertSanity(mappingObj)
  return mappingObj
}

module.exports.Mapping = Mapping
module.exports.getMapping = getMapping
