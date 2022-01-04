import * as R from 'ramda'
import * as assert from 'assert'

import fra from './mappings/fra'
import panEuropean from './mappings/panEuropean'

export const mappings: { [key: string]: any } = {
  ...fra,
  ...panEuropean,
}

export const getRowIndex = (name: any, names: any) => {
  const idx = R.findIndex((x: any) => x === name, names)
  return idx === -1 ? -1 : idx
}

export const getRowName = (idx: any, names: any) => names[idx]

export const getColumnName = (idx: any, columns: any) => R.path([idx, 'name'], columns)

export const getColumnIndex = (name: any, columns: any) => R.findIndex((x: any) => x.name === name, columns)

export const Mapping = (mapping: any): TableMapping =>
  R.merge(mapping, {
    getRowName: (idx: any) => getRowName(idx, mapping.rows.names),
    getRowIndex: (name: any) => getRowIndex(name, mapping.rows.names),
    getFullRowCount: () => mapping.rows.names.length,
    getColumn: (idx: any) => mapping.columns[idx],
    getColumnName: (idx: any) => getColumnName(idx, mapping.columns),
    getColumnIndex: (name: any) => getColumnIndex(name, mapping.columns),
    getFullColumnCount: () => mapping.columns.length,
  }) as TableMapping

export const assertSanity = (mappingObj: any) => {
  const errMsg = 'Malformed FRA table mapping'
  assert(mappingObj.getFullRowCount() > 0, errMsg)
  assert(mappingObj.getFullColumnCount() > 0, errMsg)
  assert(mappingObj, errMsg)
  assert(mappingObj.rows.names.length > 0, errMsg)
  assert(mappingObj.columns.length > 0, errMsg)
}

export type ColumnMapping = { name: string; type: string }
export type TableMapping = {
  tableName: string
  rows: {
    names: Array<string>
  }
  columns: Array<ColumnMapping>
  getRowName: (idx: number) => string
  getRowIndex: (name: string) => number
  getFullRowCount: () => number
  getColumn: (idx: number) => ColumnMapping
  getColumnName: (idx: number) => string
  getColumnIndex: (name: string) => number
  getFullColumnCount: () => number
}

export const getMapping = (tableSpecName: string): TableMapping => {
  const mappingData = mappings[tableSpecName]
  if (!mappingData) throw new Error(`Could not find mapping for tableSpecName ${tableSpecName}`)
  const mappingObj = Mapping(mappingData)
  assertSanity(mappingObj)
  return mappingObj
}
