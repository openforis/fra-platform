import { Table } from '@meta/assessment'
import { TableData as TypeTableData, TableDatas } from '@meta/data'
import { CountryIso } from '@meta/area'

export const getHeaders = (data: TypeTableData, countryIso: CountryIso, table: Table): string[] => {
  const dataTable = TableDatas.getTableData({ data, countryIso, table })
  if (!dataTable) return []
  return Object.keys(Object.values(dataTable)[0])
}
