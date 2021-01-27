// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'assert'.
const assert = require('assert')

const fra = require('./mappings/fra')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'panEuropea... Remove this comment to see the full error message
const panEuropean = require('./mappings/panEuropean')

const mappings = {
  ...fra,
  ...panEuropean,
}

const getRowIndex = (name: any, names: any) => {
  const idx = R.findIndex((x: any) => x === name, names)
  return idx === -1 ? -1 : idx
}

const getRowName = (idx: any, names: any) => names[idx]

const getColumnName = (idx: any, columns: any) => R.path([idx, 'name'], columns)

const getColumnIndex = (name: any, columns: any) => R.findIndex((x: any) => x.name === name, columns)

const Mapping = (mapping: any) =>
  R.merge(mapping, {
    getRowName: (idx: any) => getRowName(idx, mapping.rows.names),
    getRowIndex: (name: any) => getRowIndex(name, mapping.rows.names),
    getFullRowCount: () => mapping.rows.names.length,
    getColumn: (idx: any) => mapping.columns[idx],
    getColumnName: (idx: any) => getColumnName(idx, mapping.columns),
    getColumnIndex: (name: any) => getColumnIndex(name, mapping.columns),
    getFullColumnCount: () => mapping.columns.length,
  })

const assertSanity = (mappingObj: any) => {
  const errMsg = 'Malformed FRA table mapping'
  assert(mappingObj.getFullRowCount() > 0, errMsg)
  assert(mappingObj.getFullColumnCount() > 0, errMsg)
  assert(mappingObj, errMsg)
  assert(mappingObj.rows.names.length > 0, errMsg)
  assert(mappingObj.columns.length > 0, errMsg)
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getMapping... Remove this comment to see the full error message
const getMapping = (tableSpecName: any) => {
  const mappingData = mappings[tableSpecName]
  if (!mappingData) throw new Error(`Could not find mapping for tableSpecName ${tableSpecName}`)
  const mappingObj = Mapping(mappingData)
  assertSanity(mappingObj)
  return mappingObj
}

module.exports.Mapping = Mapping
module.exports.getMapping = getMapping
