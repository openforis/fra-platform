const R = require('ramda')
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
  getColumnName: (idx) => getName(idx, mapping.columns.names, mapping.columns.indexOffset),
  getColumnIndex: (name) => getIndex(name, mapping.columns.names, mapping.columns.indexOffset),
})

const getMapping = (tableSpecName) => {
  const mappingData = mappings[tableSpecName]
  if (!mappingData) throw new Error(`Could not find mapping for tableSpecName ${tableSpecName}`)
  return Mapping(mappingData)
}

module.exports.Mapping = Mapping
module.exports.getMapping = getMapping
