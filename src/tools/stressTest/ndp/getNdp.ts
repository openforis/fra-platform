import { check } from 'k6'
import http from 'k6/http'

import type { CountryIso } from '../../../meta/area/countryIso'
import type { OriginalDataPoint } from '../../../meta/assessment/originalDataPoint'
import { baseUrl, cycleParams } from '../config.ts'
import { randomInt } from '../random.ts'

// Reads back one of the NDPs being written, and the country's NDP validations
export const getNdp = (
  headers: Record<string, string>,
  countryIso: CountryIso,
  ndps: Array<OriginalDataPoint>
): void => {
  const ndp = ndps[randomInt(0, ndps.length - 1)]
  const params = `${cycleParams(countryIso)}&sectionName=extentOfForest`

  const one = http.get(
    `${baseUrl}/api/cycle-data/national-data-points/national-data-point?${params}&year=${ndp.year}`,
    {
      headers,
      tags: { name: 'ndp/national-data-point GET' },
    }
  )
  check(one, { 'ndp read ok': (res) => res.status === 200 })

  const validations = http.get(`${baseUrl}/api/cycle-data/validations/national-data-points?${params}`, {
    headers,
    tags: { name: 'validations/national-data-points GET' },
  })
  check(validations, { 'ndp validations ok': (res) => res.status === 200 })
}
