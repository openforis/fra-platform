import { check } from 'k6'
import http from 'k6/http'

import type { CountryIso } from '../../../meta/area/countryIso'
import { baseUrl, cycleParams } from '../config.ts'

// Getting the validation summary is one of the most expensive reads while editing,
// so it should be included in the stress test to mimic real users.
export const getValidationSummary = (headers: Record<string, string>, countryIso: CountryIso): void => {
  const response = http.get(`${baseUrl}/api/cycle-data/validations/summary?${cycleParams(countryIso)}`, {
    headers,
    tags: { name: 'validations/summary GET' },
  })
  check(response, { 'summary ok': (res) => res.status === 200 })
}
