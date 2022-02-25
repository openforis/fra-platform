import { Table } from '@meta/assessment'
import { TableData, TableDatas } from '@meta/data'
import { CountryIso } from '@meta/area'

const handleHeader = (header: string) => {
  // Case ex. 1990_2000 => 1990-2000
  if (/^\d{4}\_\d{4}$/.test(header)) return header.replace('_', '-')
  return header
}

export const getHeaders = (data: TableData, countryIso: CountryIso, table: Table): string[] => {
  const dataTable = TableDatas.getTableData({ data, countryIso, table })
  if (!dataTable) return []
  return Object.keys(Object.values(dataTable)[0]).map(handleHeader)
}
