import { check } from 'k6'
import http from 'k6/http'

import type { CountryIso } from '../../../meta/area/countryIso'
import { baseUrl, cycleParams } from '../config.ts'

// Reads the country's NDP validations
export const getNdpValidations = (headers: Record<string, string>, countryIso: CountryIso): void => {
  const params = `${cycleParams(countryIso)}&sectionName=extentOfForest`
  const response = http.get(`${baseUrl}/api/cycle-data/validations/national-data-points?${params}`, {
    headers,
    tags: { name: 'validations/national-data-points GET' },
  })
  check(response, { 'ndp validations ok': (res) => res.status === 200 })
}
