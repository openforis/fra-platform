import { DataTableRepository } from '@server/repository'
import * as tableMappings from '@server/dataTable/tableMappings'
import * as R from 'ramda'
import * as sqlCreator from '@server/dataTable/dataTableSqlCreator'

const update = (tableValues: any, rowIdx: any, colIdx: any, newValue: any) =>
  R.update(rowIdx, R.update(colIdx, newValue, tableValues[rowIdx]), tableValues)

const createTableData = (cols: any, rows: any) => R.map((rowIdx: any) => new Array(cols), R.range(0, rows))

const handleRow = (mapping: any) => (tableData: any, row: any) => {
  const values = R.omit(R.pluck('name', sqlCreator.fixedFraTableColumns), row)
  const rowIdx = mapping.getRowIndex(row.row_name)
  return R.reduce(
    (tableDataAccu: any, [column, fieldValue]) =>
      update(tableDataAccu, rowIdx, mapping.getColumnIndex(column), fieldValue),
    tableData,
    R.toPairs(values)
  )
}

export const read = async (countryIso: any, tableSpecName: any, schemaName = 'public') => {
  const rows = await DataTableRepository.read(countryIso, tableSpecName, schemaName)
  // if (rows === null) return null
  const mapping = tableMappings.getMapping(tableSpecName)
  const emptyTableData = createTableData(mapping.getFullColumnCount(), mapping.getFullRowCount())
  return R.reduce(handleRow(mapping), emptyTableData, rows)
}
