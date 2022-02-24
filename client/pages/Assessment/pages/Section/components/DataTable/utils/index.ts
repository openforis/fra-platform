import { Table } from '@meta/assessment'
import { TableData as TypeTableData } from '@meta/data'
import { CountryIso } from '@meta/area'
import { TableData } from '@meta/assessment/tableData'

export const getHeaders = (data: TypeTableData, countryIso: CountryIso, table: Table): string[] => {
  const dataTable = TableData.getTableData(data, countryIso, table)
  if (!dataTable) return []
  return Object.keys(Object.values(dataTable)[0])
}
