import { check } from 'k6'
import http from 'k6/http'

import type { CountryIso } from '../../../meta/area/countryIso'
import type { OriginalDataPoint } from '../../../meta/assessment/originalDataPoint'
import { baseUrl, cycleParams } from '../config.ts'
import { randomInt } from './random.ts'

// Edits an existing national data point (never creates one, so a run leaves nothing behind).
export const editNdp = (
  headers: Record<string, string>,
  countryIso: CountryIso,
  ndps: Array<OriginalDataPoint>
): void => {
  const ndp = ndps[randomInt(0, ndps.length - 1)]
  const originalDataPoint = { ...ndp, values: { ...ndp.values, forestArea: String(randomInt(0, 1000)) } }
  const params = `${cycleParams(countryIso)}&sectionName=extentOfForest`
  const response = http.put(
    `${baseUrl}/api/cycle-data/national-data-points/national-data-point/original-data?${params}`,
    JSON.stringify({ originalDataPoint }),
    { headers, tags: { name: 'ndp/original-data PUT' } }
  )
  check(response, { 'ndp write ok': (res) => res.status === 200 })
}
