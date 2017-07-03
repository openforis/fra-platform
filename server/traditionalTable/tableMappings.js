const R = require('ramda')
const assert = require('assert')
const specificForestCategories = require('./mappings/specificForestCategories')
const forestAreaChange = require('./mappings/forestAreaChange')
const primaryDesignatedManagementObjective = require('./mappings/primaryDesignatedManagementObjective')
const areaAffectedByFire = require('./mappings/areaAffectedByFire')

const mappings = {
  specificForestCategories,
  forestAreaChange,
  primaryDesignatedManagementObjective,
  areaAffectedByFire
}

const getIndex = (name, names) => {
  const idx = R.findIndex((x) => x === name, names)
  return idx === -1 ? -1 : idx
}

const getName = (idx, names) => names[idx]

const Mapping = (mapping) =>
  R.merge(mapping,
    {
      getRowName: (idx) => getName(idx, mapping.rows.names),
      getRowIndex: (name) => getIndex(name, mapping.rows.names),
      getFullRowCount: () => mapping.rows.names.length,
      getColumnName: (idx) => getName(idx, mapping.columns.names),
      getColumnIndex: (name) => getIndex(name, mapping.columns.names),
      getFullColumnCount: () => mapping.columns.names.length
    })

const assertSanity = (mappingObj) => {
  const errMsg = 'Malformed FRA table mapping'
  assert(mappingObj.getFullRowCount() > 0, errMsg)
  assert(mappingObj.getFullColumnCount() > 0, errMsg)
  assert(mappingObj, errMsg)
  assert(mappingObj.rows.names.length > 0, errMsg)
  assert(mappingObj.columns.names.length > 0, errMsg)
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
