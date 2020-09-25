const R = require('ramda')
const assert = require('assert')

const fra = require('./mappings/fra')
const panEuropean = require('./mappings/panEuropean')

const mappings = {
  ...fra,
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
