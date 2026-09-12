import { check } from 'k6'
import http from 'k6/http'

import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { Numbers } from 'utils/numbers'

import type { CountryIso } from '../../../meta/area/countryIso'
import type { CommentableDescriptionValue } from '../../../meta/assessment/descriptionValue'
import { Requests } from '../utils/requests.ts'
import { Urls } from '../utils/urls.ts'

// Edits an existing description (does not add data sources, so no need to delete afterwards).
// The text is plain, so we do not enqueue links verification and bloat the db.
export const editDescription = (
  headers: Record<string, string>,
  countryIso: CountryIso,
  name: CommentableDescriptionName,
  description: CommentableDescriptionValue
): void => {
  const text = `Stress test text ${Numbers.randomInt(0, 1000000)}`
  const value: CommentableDescriptionValue = { ...description }
  if (name === CommentableDescriptionName.dataSources) {
    value.dataSources = description.dataSources.map((dataSource) => ({ ...dataSource, comments: text }))
  } else {
    value.text = text
  }
  const response = http.put(Urls.description({ countryIso, name }), JSON.stringify({ value }), {
    headers,
    tags: { name: `descriptions/${name} PUT` },
  })
  check(response, { 'description write ok': Requests.isOk })
}
