import { check } from 'k6'
import http from 'k6/http'

import type { CountryIso } from '../../../meta/area/countryIso'
import { Requests } from '../utils/requests.ts'
import { Urls } from '../utils/urls.ts'

// Reads the country's NDP validations
export const getNdpValidations = (headers: Record<string, string>, countryIso: CountryIso): void => {
  const response = http.get(Urls.ndpValidations({ countryIso }), {
    headers,
    tags: { name: 'validations/national-data-points GET' },
  })
  check(response, { 'ndp validations ok': Requests.isOk })
}
