import { check } from 'k6'
import http from 'k6/http'

import { Numbers } from 'utils/numbers'

import type { CountryIso } from '../../../meta/area/countryIso'
import type { OriginalDataPoint } from '../../../meta/assessment/originalDataPoint'
import { Requests } from '../utils/requests.ts'
import { Urls } from '../utils/urls.ts'

// Edits an existing national data point (never creates one, so a run leaves nothing behind)
export const editNdp = (
  headers: Record<string, string>,
  countryIso: CountryIso,
  ndps: Array<OriginalDataPoint>
): void => {
  const ndp = ndps[Numbers.randomInt(0, ndps.length - 1)]
  const originalDataPoint = { ...ndp, values: { ...ndp.values, forestArea: String(Numbers.randomInt(0, 1000)) } }
  const response = http.put(Urls.ndpData({ countryIso }), JSON.stringify({ originalDataPoint }), {
    headers,
    tags: { name: 'ndp/original-data PUT' },
  })
  check(response, { 'ndp write ok': Requests.isOk })
}
