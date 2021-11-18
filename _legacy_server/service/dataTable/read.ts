import { DataTableRepository } from '@server/repository'
import * as tableMappings from '@server/dataTable/tableMappings'
import * as R from 'ramda'
import * as sqlCreator from '@server/dataTable/dataTableSqlCreator'
import { CountryIso } from '@core/country'
import { BaseProtocol, DB } from '@server/db'

const update = (tableValues: any, rowIdx: any, colIdx: any, newValue: any) =>
  R.update(rowIdx, R.update(colIdx, newValue, tableValues[rowIdx]), tableValues)

const createTableData = (cols: any, rows: any) => R.map((_rowIdx: any) => new Array(cols), R.range(0, rows))

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

export const read = async (
  params: { countryIso: CountryIso; tableSpecName: string; schemaName?: string },
  client: BaseProtocol = DB
) => {
  const { countryIso, tableSpecName, schemaName = 'public' } = params
  const rows = await DataTableRepository.read({ countryIso, tableSpecName, schemaName }, client)
  const mapping = tableMappings.getMapping(tableSpecName)
  const emptyTableData = createTableData(mapping.getFullColumnCount(), mapping.getFullRowCount())

  return rows.reduce(handleRow(mapping), emptyTableData)
}
