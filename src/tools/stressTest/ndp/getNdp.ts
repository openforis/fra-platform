import { check } from 'k6'
import http from 'k6/http'

import type { CountryIso } from '../../../meta/area/countryIso'
import type { OriginalDataPoint } from '../../../meta/assessment/originalDataPoint'
import { baseUrl, cycleParams } from '../config.ts'

// Reads back one of the NDPs being written
export const getNdp = (headers: Record<string, string>, countryIso: CountryIso, ndp: OriginalDataPoint): void => {
  const params = `${cycleParams(countryIso)}&sectionName=extentOfForest`
  const response = http.get(
    `${baseUrl}/api/cycle-data/national-data-points/national-data-point?${params}&year=${ndp.year}`,
    { headers, tags: { name: 'ndp/national-data-point GET' } }
  )
  check(response, { 'ndp read ok': (res) => res.status === 200 })
}
