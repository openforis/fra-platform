// Descriptions stress test: simulates people editing section descriptions at the same time.
// Each simulated user edits a description (general comments or data sources) and repeats,
// while a canary reads the same descriptions and their validations at a fixed rate. See README.md.
import http from 'k6/http'

import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { Numbers } from 'utils/numbers'

import type { DescriptionCountryValues, DescriptionValues } from '../../../meta/assessment/descriptionValue'
import { getToken } from '../auth.ts'
import { countries, duration, users } from '../config.ts'
import { Urls } from '../utils/urls.ts'
import { editDescription } from './editDescription.ts'
import { getDescription } from './getDescription.ts'
import { getDescriptionValidations } from './getDescriptionValidations.ts'

const canaryReadsPerSecond = 2

// Using the forestAreaChange section to edit both comments and data sources
const sectionName = 'forestAreaChange'
const names = [CommentableDescriptionName.generalComments, CommentableDescriptionName.dataSources]

export const options = {
  noVUConnectionReuse: true, // Use a fresh connection per action
  scenarios: {
    writers: {
      duration,
      exec: 'write',
      executor: 'constant-vus',
      vus: users,
    },
    canary: {
      duration,
      exec: 'read',
      executor: 'constant-arrival-rate',
      preAllocatedVUs: 10,
      rate: canaryReadsPerSecond,
      timeUnit: '1s',
    },
  },
  // more than 1% of requests failing (HTTP >= 400 or network error) fails the run.
  thresholds: {
    http_req_failed: ['rate<0.01'],
  },
}

interface SetupData {
  descriptionsByCountry: Record<string, DescriptionValues>
  token: string
}

const hasLinks = (html: string): boolean => /<a\s/i.test(html)

export const setup = (): SetupData => {
  const token = getToken()
  const headers = { Cookie: `fra-auth-token=${token}` }

  const descriptionsByCountry: Record<string, DescriptionValues> = {}
  countries.forEach((countryIso) => {
    const response = http.get(Urls.descriptions({ countryIso }), { headers })
    if (response.status !== 200) throw new Error(`could not read descriptions of ${countryIso}`)
    const values = response.json() as DescriptionCountryValues
    const descriptions = values[countryIso]?.[sectionName]

    names.forEach((name) => {
      const description = descriptions?.[name]
      if (!description) {
        throw new Error(`${countryIso} has no ${name} description in ${sectionName} to edit: save one in the UI first`)
      }
      if (hasLinks(description.text)) {
        // This avoids bloating the DB by having the test insert link visits
        throw new Error(`${countryIso} ${name} description in ${sectionName} contains links: remove them first`)
      }
    })

    const dataSources = descriptions.dataSources.dataSources ?? []
    if (dataSources.length === 0) {
      throw new Error(`${countryIso} has no data sources in ${sectionName} to edit: add one in the UI first`)
    }
    if (dataSources.some((dataSource) => hasLinks(dataSource.reference) || hasLinks(dataSource.comments))) {
      throw new Error(`${countryIso} data sources in ${sectionName} contain links: remove them first`)
    }

    descriptionsByCountry[countryIso] = descriptions
  })
  return { descriptionsByCountry, token }
}

// Edits one of the existing descriptions, and repeats
export const write = (data: SetupData): void => {
  const headers = { 'Content-Type': 'application/json', Cookie: `fra-auth-token=${data.token}` }
  const countryIso = countries[__VU % countries.length] // spreads simulated users across countries
  const name = names[Numbers.randomInt(0, names.length - 1)]
  editDescription(headers, countryIso, name, data.descriptionsByCountry[countryIso][name])
}

// Reads back one of the descriptions being written, and the country's description validations
export const read = (data: SetupData): void => {
  const headers = { Cookie: `fra-auth-token=${data.token}` }
  const countryIso = countries[Numbers.randomInt(0, countries.length - 1)]
  const name = names[Numbers.randomInt(0, names.length - 1)]
  getDescription(headers, countryIso, name)
  getDescriptionValidations(headers, countryIso)
}
