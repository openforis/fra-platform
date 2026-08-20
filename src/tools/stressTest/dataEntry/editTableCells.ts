import { check } from 'k6'
import http from 'k6/http'

import type { NodesBody } from '../../../meta/api/request/cycleData/table'
import type { CountryIso } from '../../../meta/area/countryIso'
import { baseUrl, cycleParams } from '../config.ts'
import { cells } from './cells.ts'
import { randomInt } from './random.ts'

export const editTableCells = (headers: Record<string, string>, countryIso: CountryIso): void => {
  const cell = cells[randomInt(0, cells.length - 1)]
  const params = `${cycleParams(countryIso)}&sectionName=${cell.sectionName}`
  const body: NodesBody = {
    tableName: cell.tableName,
    values: [{ colName: cell.colName, value: { raw: String(randomInt(0, 1000)) }, variableName: cell.variableName }],
  }
  const response = http.patch(`${baseUrl}/api/cycle-data/table/nodes?${params}`, JSON.stringify(body), {
    headers,
    tags: { name: 'table/nodes PATCH' },
  })
  check(response, { 'node write ok': (res) => res.status === 200 })
}
