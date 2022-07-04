import { Objects } from '@core/utils'

import { CountryIso } from '@meta/area'
import { Table } from '@meta/assessment'
import { TableData, TableDatas } from '@meta/data'

const handleHeader = (header: string) => {
  // Case ex. 1990_2000 => 1990-2000
  if (/^\d{4}_\d{4}$/.test(header)) return header.replace('_', '-')
  return header
}

export const getHeaders = (data: TableData, countryIso: CountryIso, table: Table): string[] => {
  const dataTable = TableDatas.getTableData({ data, countryIso, tableName: table.props.name })
  if (!dataTable) return []
  return Object.keys(dataTable).map(handleHeader)
}

export const getODPColSpan = (props: { data: TableData; table: Table }): number => {
  if (Objects.isEmpty(props.data)) return 0
  // TableData = Record<table.props.name, Record<>>
  const [[, tableData]] = Object.entries(props.data)
  return Object.keys(tableData?.[props.table.props.name] || {}).length
}
