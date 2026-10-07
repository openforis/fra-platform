import { expect, type Page } from '@playwright/test'

import { ApiEndPoint } from 'meta/api/endpoint'
import { type Country } from 'meta/area/country'
import { type CountryIso } from 'meta/area/countryIso'
import { type CountryStatus } from 'meta/area/countryStatus'
import { AssessmentNames } from 'meta/assessment/assessment'
import { type CycleNames } from 'meta/assessment/cycle/names'

const assessmentName = AssessmentNames.fra

export type CountryLocation = {
  countryIso: CountryIso
  cycleName: CycleNames
}

const _getQueryParams = (location: CountryLocation): string => {
  const { countryIso, cycleName } = location
  return new URLSearchParams({ assessmentName, countryIso, cycleName }).toString()
}

const get = async (page: Page, location: CountryLocation): Promise<Country> => {
  const url = `${ApiEndPoint.Area.areas()}?${_getQueryParams(location)}`
  const response = await page.request.get(url)

  expect(response.ok(), `GET ${url} failed: ${response.status()} ${await response.text()}`).toBeTruthy()

  const { countries }: { countries: Array<Country> } = await response.json()
  const country = countries.find((c) => c.countryIso === location.countryIso)
  expect(country, `Country ${location.countryIso} not found in ${location.cycleName}`).toBeDefined()

  return country
}

// Returns the updated country
const setStatus = async (page: Page, location: CountryLocation, status: CountryStatus): Promise<Country> => {
  const country = await get(page, location)

  const url = `${ApiEndPoint.Area.country()}?${_getQueryParams(location)}`
  const data = { country: { ...country, props: { ...country.props, status } } }
  const response = await page.request.patch(url, { data })

  expect(response.ok(), `PATCH ${url} failed: ${response.status()} ${await response.text()}`).toBeTruthy()

  return response.json()
}

export const CountryApi = {
  get,
  setStatus,
}
