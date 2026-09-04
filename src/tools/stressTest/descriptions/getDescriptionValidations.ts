import { check } from 'k6'
import http from 'k6/http'

import type { CountryIso } from '../../../meta/area/countryIso'
import { Requests } from '../utils/requests.ts'
import { Urls } from '../utils/urls.ts'

export const getDescriptionValidations = (headers: Record<string, string>, countryIso: CountryIso): void => {
  const response = http.get(Urls.descriptionValidations({ countryIso }), {
    headers,
    tags: { name: 'validations/descriptions GET' },
  })
  check(response, { 'description validations ok': Requests.isOk })
}
