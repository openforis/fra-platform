import { check } from 'k6'
import http from 'k6/http'

import { Numbers } from 'utils/numbers'

import type { NodesBody } from '../../../meta/api/request/cycleData/table'
import type { CountryIso } from '../../../meta/area/countryIso'
import { Requests } from '../utils/requests.ts'
import { Urls } from '../utils/urls.ts'
import { cells } from './cells.ts'

export const editTableCells = (headers: Record<string, string>, countryIso: CountryIso): void => {
  const { colName, sectionName, tableName, variableName } = cells[Numbers.randomInt(0, cells.length - 1)]
  const body: NodesBody = {
    tableName,
    values: [{ colName, value: { raw: String(Numbers.randomInt(0, 1000)) }, variableName }],
  }
  const response = http.patch(Urls.tableNodes({ countryIso, sectionName }), JSON.stringify(body), {
    headers,
    tags: { name: 'table/nodes PATCH' },
  })
  check(response, { 'node write ok': Requests.isOk })
}
