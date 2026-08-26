import { check } from 'k6'
import http from 'k6/http'

import type { CountryIso } from '../../../meta/area/countryIso'
import { baseUrl, cycleParams } from '../config.ts'
import type { Cell } from './cells.ts'

// Reads the validations of the data being written
export const getTableValidations = (headers: Record<string, string>, countryIso: CountryIso, cell: Cell): void => {
  const params = `${cycleParams(countryIso)}&sectionName=${cell.sectionName}&tableNames[]=${cell.tableName}`
  const response = http.get(`${baseUrl}/api/cycle-data/validations/table-data?${params}`, {
    headers,
    tags: { name: 'validations/table-data GET' },
  })
  check(response, { 'table validations ok': (res) => res.status === 200 })
}
