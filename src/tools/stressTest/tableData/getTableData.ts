import { check } from 'k6'
import http from 'k6/http'

import type { CountryIso } from '../../../meta/area/countryIso'
import { baseUrl, cycleParams } from '../config.ts'
import type { Cell } from './cells.ts'

// Reads back the data being written
export const getTableData = (headers: Record<string, string>, countryIso: CountryIso, cell: Cell): void => {
  const params = `${cycleParams(countryIso)}&sectionName=${cell.sectionName}&tableNames[]=${cell.tableName}`

  // mergeOdp=false like UI requests
  const response = http.get(
    `${baseUrl}/api/cycle-data/table/table-data?${params}&countryISOs[]=${countryIso}&mergeOdp=false`,
    { headers, tags: { name: 'table/table-data GET' } }
  )
  check(response, { 'table data ok': (res) => res.status === 200 })
}
