import { check } from 'k6'
import http from 'k6/http'

import type { CountryIso } from '../../../meta/area/countryIso'
import { Requests } from '../utils/requests.ts'
import { Urls } from '../utils/urls.ts'
import type { Cell } from './cells.ts'

// Reads back the data being written
export const getTableData = (headers: Record<string, string>, countryIso: CountryIso, cell: Cell): void => {
  const { sectionName, tableName } = cell
  const response = http.get(Urls.tableData({ countryIso, sectionName, tableName }), {
    headers,
    tags: { name: 'table/table-data GET' },
  })
  check(response, { 'table data ok': Requests.isOk })
}
