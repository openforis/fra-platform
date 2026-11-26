import { type Browser, expect, type Page, test } from '@playwright/test'

import { ApiEndPoint } from 'meta/api/endpoint'
import { type CountryIso } from 'meta/area/countryIso'
import { AssessmentNames } from 'meta/assessment/assessment'
import { CycleNames } from 'meta/assessment/cycle/names'
import {
  CommentableDescriptionName,
  type CommentableDescriptionValue,
  type DescriptionCountryValues,
} from 'meta/assessment/descriptionValue'
import { type SectionName } from 'meta/assessment/section'
import { type RecordDescriptionValidations } from 'meta/assessment/validation/description'

import { testCredentials } from 'test/e2e/config/credentials'
import { AuthUtils } from 'test/e2e/utils/Auth'
import { DOMUtils } from 'test/e2e/utils/dom'

const assessmentName = AssessmentNames.fra
const cycleName = CycleNames._2025

export type DescriptionLocation = {
  countryIso: CountryIso
  name: CommentableDescriptionName
  sectionName: SectionName
}

const _getQueryParams = (location: DescriptionLocation): string => {
  const { countryIso, name, sectionName } = location
  return new URLSearchParams({ assessmentName, countryIso, cycleName, name, sectionName }).toString()
}

const getValue = async (
  page: Page,
  location: DescriptionLocation
): Promise<CommentableDescriptionValue | undefined> => {
  const { countryIso, name, sectionName } = location

  const url = `${ApiEndPoint.CycleData.Descriptions.many()}?${_getQueryParams(location)}`
  const response = await page.request.get(url)
  expect(response.ok(), `GET ${url} failed: ${response.status()} ${await response.text()}`).toBeTruthy()

  const values: DescriptionCountryValues = await response.json()
  return values[countryIso]?.[sectionName]?.[name]
}

// Saves through the same request as the UI, so the server validates it like any other save
const setValue = async (
  page: Page,
  location: DescriptionLocation,
  value: CommentableDescriptionValue
): Promise<void> => {
  const url = `${ApiEndPoint.CycleData.Descriptions.many()}?${_getQueryParams(location)}`
  const response = await page.request.put(url, { data: { value } })

  expect(response.ok(), `PUT ${url} failed: ${response.status()} ${await response.text()}`).toBeTruthy()
}

// Empties the description once the whole spec is done (even if a test failed)
const clear = async (browser: Browser, location: DescriptionLocation): Promise<void> => {
  const { baseURL } = test.info().project.use
  const page = await browser.newPage({ baseURL })

  try {
    await AuthUtils.login(page, testCredentials)

    const isDataSources = location.name === CommentableDescriptionName.dataSources
    const value: CommentableDescriptionValue = isDataSources ? { text: '', dataSources: [] } : { text: '' }
    await setValue(page, location, value)
  } finally {
    await page.close()
  }
}

// Call this before page.goto, the validations come in a separate request after the page loads
const waitForValidations = async (page: Page): Promise<RecordDescriptionValidations> => {
  const response = await DOMUtils.waitForResponse(page, ApiEndPoint.CycleData.Validations.descriptions(), 'GET')
  return response.json()
}

export const DescriptionsApi = {
  clear,
  getValue,
  setValue,
  waitForValidations,
}
