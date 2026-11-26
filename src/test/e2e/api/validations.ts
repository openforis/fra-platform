import { expect, type Page } from '@playwright/test'

import { ApiEndPoint } from 'meta/api/endpoint'
import { AssessmentNames } from 'meta/assessment/assessment'
import { type ValidationSummary } from 'meta/assessment/validation/summary'

import { type CountryLocation } from 'test/e2e/api/country'

const assessmentName = AssessmentNames.fra

const _getQueryParams = (location: CountryLocation): string => {
  const { countryIso, cycleName } = location
  return new URLSearchParams({ assessmentName, countryIso, cycleName }).toString()
}

const getSummary = async (page: Page, location: CountryLocation): Promise<ValidationSummary> => {
  const url = `${ApiEndPoint.CycleData.Validations.summary()}?${_getQueryParams(location)}`
  const response = await page.request.get(url)

  expect(response.ok(), `GET ${url} failed: ${response.status()} ${await response.text()}`).toBeTruthy()

  return response.json()
}

export const ValidationsApi = {
  getSummary,
}
