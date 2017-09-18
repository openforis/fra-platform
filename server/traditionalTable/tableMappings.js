const R = require('ramda')
const assert = require('assert')
const specificForestCategories = require('./mappings/specificForestCategories')
const forestAreaChange = require('./mappings/forestAreaChange')
const primaryDesignatedManagementObjective = require('./mappings/primaryDesignatedManagementObjective')
const areaAffectedByFire = require('./mappings/areaAffectedByFire')
const growingStockComposition = require('./mappings/growingStockComposition')

const mappings = {
  specificForestCategories,
  forestAreaChange,
  primaryDesignatedManagementObjective,
  areaAffectedByFire,
  growingStockComposition
}

const getIndexInNameArray = (name, names) => {
  const idx = R.findIndex((x) => x === name, names)
  return idx === -1 ? -1 : idx
}

const getNameForIndexInNameArray = (idx, names) => names[idx]

const getNameFromObjectArray = (idx, objects) => R.path([idx, 'name'], objects)

const getIndexFromObjectArray = (name, objects) => R.findIndex((x) => x.name === name, objects)

const Mapping = (mapping) =>
  R.merge(mapping,
    {
      getRowName: (idx) => getNameForIndexInNameArray(idx, mapping.rows.names),
      getRowIndex: (name) => getIndexInNameArray(name, mapping.rows.names),
      getFullRowCount: () => mapping.rows.names.length,
      getColumn: (idx) => mapping.columns[idx],
      getColumnName: (idx) => getNameFromObjectArray(idx, mapping.columns),
      getColumnIndex: (name) => getIndexFromObjectArray(name, mapping.columns),
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
