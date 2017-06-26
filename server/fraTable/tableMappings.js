const R = require('ramda')
const assert = require('assert')
const specificForestCategories = require('./mappings/specificForestCategories')

const mappings = {specificForestCategories}

const getIndex = (name, names, indexOffset) => {
  const idx = R.findIndex((x) => x === name, names)
  return idx === -1 ? -1 : idx +  indexOffset
}

const getName = (idx, names, indexOffset) => names[idx - indexOffset]

const Mapping = (mapping) => ({
  mapping: mapping,
  getRowName: (idx) => getName(idx, mapping.rows.names, mapping.rows.indexOffset),
  getRowIndex: (name) => getIndex(name, mapping.rows.names, mapping.rows.indexOffset),
  getFullRowCount: () => mapping.rows.names.length + mapping.rows.indexOffset,
  getColumnName: (idx) => getName(idx, mapping.columns.names, mapping.columns.indexOffset),
  getColumnIndex: (name) => getIndex(name, mapping.columns.names, mapping.columns.indexOffset),
  getFullColumnCount: () => mapping.columns.names.length + mapping.columns.indexOffset
})

const assertSanity = (mappingObj) => {
  const errMsg = 'Malformed FRA table mapping'
  assert(mappingObj.getFullRowCount() > 0, errMsg)
  assert(mappingObj.getFullColumnCount() > 0, errMsg)
  assert(mappingObj.mapping, errMsg)
  assert(mappingObj.mapping.rows.names.length > 0, errMsg)
  assert(mappingObj.mapping.columns.names.length > 0, errMsg)
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
