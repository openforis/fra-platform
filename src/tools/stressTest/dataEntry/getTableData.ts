import { check } from 'k6'
import http from 'k6/http'

import type { CountryIso } from '../../../meta/area/countryIso'
import { baseUrl, cycleParams } from '../config.ts'
import { cells } from './cells.ts'
import { randomInt } from './random.ts'

// Gets the table data and its validations, like the UI does.
export const getTableData = (headers: Record<string, string>, countryIso: CountryIso): void => {
  const cell = cells[randomInt(0, cells.length - 1)]
  const params = `${cycleParams(countryIso)}&sectionName=${cell.sectionName}&tableNames[]=${cell.tableName}`

  // mergeOdp=false like UI requests
  const tableData = http.get(
    `${baseUrl}/api/cycle-data/table/table-data?${params}&countryISOs[]=${countryIso}&mergeOdp=false`,
    { headers, tags: { name: 'table/table-data GET' } }
  )
  check(tableData, { 'table data ok': (res) => res.status === 200 })

  const validations = http.get(`${baseUrl}/api/cycle-data/validations/table-data?${params}`, {
    headers,
    tags: { name: 'validations/table-data GET' },
  })
  check(validations, { 'table validations ok': (res) => res.status === 200 })
}
