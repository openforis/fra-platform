import { check } from 'k6'
import http from 'k6/http'

import type { CountryIso } from '../../../meta/area/countryIso'
import { Requests } from '../utils/requests.ts'
import { Urls } from '../utils/urls.ts'
import type { Cell } from './cells.ts'

// Reads the validations of the data being written
export const getTableValidations = (headers: Record<string, string>, countryIso: CountryIso, cell: Cell): void => {
  const { sectionName, tableName } = cell
  const response = http.get(Urls.tableValidations({ countryIso, sectionName, tableName }), {
    headers,
    tags: { name: 'validations/table-data GET' },
  })
  check(response, { 'table validations ok': Requests.isOk })
}
