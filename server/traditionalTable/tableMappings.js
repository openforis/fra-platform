const R = require('ramda')
const assert = require('assert')
const specificForestCategories = require('./mappings/fra/specificForestCategories')
const forestAreaChange = require('./mappings/fra/forestAreaChange')
const holderOfManagementRights = require('./mappings/fra/holderOfManagementRights')
const primaryDesignatedManagementObjective = require('./mappings/fra/primaryDesignatedManagementObjective')
const areaAffectedByFire = require('./mappings/fra/areaAffectedByFire')
const areaAffectedByFirePrint1 = require('./mappings/fra/areaAffectedByFirePrint1')
const areaAffectedByFirePrint2 = require('./mappings/fra/areaAffectedByFirePrint2')
const growingStockComposition = require('./mappings/fra/growingStockComposition')
const nonWoodForestProductsRemovals = require('./mappings/fra/nonWoodForestProductsRemovals')
const nonWoodForestProductsRemovalsCurrency = require('./mappings/fra/nonWoodForestProductsRemovalsCurrency')
const biomassStock = require('./mappings/fra/biomassStock')
const carbonStock = require('./mappings/fra/carbonStock')
const carbonStockSoilDepth = require('./mappings/fra/carbonStockSoilDepth')
const degradedForest = require('./mappings/fra/degradedForest')
const employment = require('./mappings/fra/employment')
const employmentPrint1 = require('./mappings/fra/employmentPrint1')
const employmentPrint2 = require('./mappings/fra/employmentPrint2')
const graduationOfStudents = require('./mappings/fra/graduationOfStudents')
const graduationOfStudentsPrint1 = require('./mappings/fra/graduationOfStudentsPrint1')
const graduationOfStudentsPrint2 = require('./mappings/fra/graduationOfStudentsPrint2')
const forestAreaWithinProtectedAreas = require('./mappings/fra/forestAreaWithinProtectedAreas')
const totalAreaWithDesignatedManagementObjective = require('./mappings/fra/totalAreaWithDesignatedManagementObjective')
const annualReforestation = require('./mappings/fra/annualReforestation')
const forestOwnership = require('./mappings/fra/forestOwnership')
const disturbances = require('./mappings/fra/disturbances')
const disturbancesPrint1 = require('./mappings/fra/disturbancesPrint1')
const disturbancesPrint2 = require('./mappings/fra/disturbancesPrint2')
const areaOfPermanentForestEstate = require('./mappings/fra/areaOfPermanentForestEstate')
const forestPolicy = require('./mappings/fra/forestPolicy')
const otherLandWithTreeCover = require('./mappings/fra/otherLandWithTreeCover')
const climaticDomain = require('./mappings/fra/climaticDomain')
const sustainableDevelopmentAgencyIndicator = require('./mappings/fra/sustainableDevelopmentAgencyIndicator')
const sustainableDevelopmentAgencySubIndicator1 = require('./mappings/fra/sustainableDevelopmentAgencySubIndicator1')
const sustainableDevelopmentAgencySubIndicator2 = require('./mappings/fra/sustainableDevelopmentAgencySubIndicator2')
const sustainableDevelopmentAgencySubIndicator3 = require('./mappings/fra/sustainableDevelopmentAgencySubIndicator3')
const sustainableDevelopmentAgencySubIndicator4 = require('./mappings/fra/sustainableDevelopmentAgencySubIndicator4')

const panEuropean = require('./mappings/panEuropean')

const mappings = {
  specificForestCategories,
  forestAreaChange,
  primaryDesignatedManagementObjective,
  areaAffectedByFire,
  areaAffectedByFirePrint1,
  areaAffectedByFirePrint2,
  growingStockComposition,
  holderOfManagementRights,
  nonWoodForestProductsRemovals,
  nonWoodForestProductsRemovalsCurrency,
  degradedForest,
  employment,
  employmentPrint1,
  employmentPrint2,
  graduationOfStudents,
  graduationOfStudentsPrint1,
  graduationOfStudentsPrint2,
  forestOwnership,
  forestAreaWithinProtectedAreas,
  totalAreaWithDesignatedManagementObjective,
  annualReforestation,
  disturbances,
  disturbancesPrint1,
  disturbancesPrint2,
  biomassStock,
  carbonStock,
  carbonStockSoilDepth,
  areaOfPermanentForestEstate,
  forestPolicy,
  otherLandWithTreeCover,
  climaticDomain,
  sustainableDevelopmentAgencyIndicator,
  sustainableDevelopmentAgencySubIndicator1,
  sustainableDevelopmentAgencySubIndicator2,
  sustainableDevelopmentAgencySubIndicator3,
  sustainableDevelopmentAgencySubIndicator4,

  ...panEuropean,
}

const getRowIndex = (name, names) => {
  const idx = R.findIndex((x) => x === name, names)
  return idx === -1 ? -1 : idx
}

const getRowName = (idx, names) => names[idx]

const getColumnName = (idx, columns) => R.path([idx, 'name'], columns)

const getColumnIndex = (name, columns) => R.findIndex((x) => x.name === name, columns)

const Mapping = (mapping) =>
  R.merge(mapping, {
    getRowName: (idx) => getRowName(idx, mapping.rows.names),
    getRowIndex: (name) => getRowIndex(name, mapping.rows.names),
    getFullRowCount: () => mapping.rows.names.length,
    getColumn: (idx) => mapping.columns[idx],
    getColumnName: (idx) => getColumnName(idx, mapping.columns),
    getColumnIndex: (name) => getColumnIndex(name, mapping.columns),
    getFullColumnCount: () => mapping.columns.length,
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
