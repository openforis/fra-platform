import { check } from 'k6'
import http from 'k6/http'

import type { CountryIso } from '../../../meta/area/countryIso'
import type { CommentableDescriptionName } from '../../../meta/assessment/descriptionValue'
import { Requests } from '../utils/requests.ts'
import { Urls } from '../utils/urls.ts'

// Reads back one of the descriptions being written
export const getDescription = (
  headers: Record<string, string>,
  countryIso: CountryIso,
  name: CommentableDescriptionName
): void => {
  const response = http.get(Urls.description({ countryIso, name }), {
    headers,
    tags: { name: 'descriptions GET' },
  })
  check(response, { 'description read ok': Requests.isOk })
}
