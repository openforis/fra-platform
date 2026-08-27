import { check } from 'k6'
import http from 'k6/http'

import type { CountryIso } from '../../../meta/area/countryIso'
import type { OriginalDataPoint } from '../../../meta/assessment/originalDataPoint'
import { Urls } from '../utils/urls.ts'

// Reads back one of the NDPs being written
export const getNdp = (headers: Record<string, string>, countryIso: CountryIso, ndp: OriginalDataPoint): void => {
  const { year } = ndp
  const response = http.get(Urls.ndp({ countryIso, year }), {
    headers,
    tags: { name: 'ndp/national-data-point GET' },
  })
  check(response, { 'ndp read ok': (res) => res.status === 200 })
}
