import R from 'ramda'

import specificForestCategories from './mappings/specificForestCategories'

const mappings = {specificForestCategories}

const getIndex = (name, names, indexOffset) => {
  const idx = R.findIndex((x) => x === name, names)
  return idx === -1 ? -1 : idx +  indexOffset
}

const getName = (idx, names, indexOffset) => names[idx - indexOffset]

export const Mapping = (mapping) => ({
  getRowName: (idx) => getName(idx, mapping.rows.names, mapping.rows.indexOffset) ,//mapping.rows.names[idx - mapping.rows.indexOffset],
  getRowIndex: (name) => getIndex(name, mapping.rows.names, mapping.rows.indexOffset),
  getColumnName: (idx) => getName(idx, mapping.columns.names, mapping.columns.indexOffset),//mapping.columns.names[idx - mapping.columns.indexOffset],
  getColumnIndex: (name) => getIndex(name, mapping.columns.names, mapping.columns.indexOffset),
  getRowIndexOffset: () => mapping.rows.indexOffset,
  getColumnIndexOffset: () => mapping.rows.indexOffset
})

export const getMapping = (tableSpecName) => {
  const mappingData = mappings[tableSpecName]
  if (!mappingData) throw new Error(`Could not find mapping for tableSpecName ${tableSpecName}`)
  return Mapping(mappingData)
}
