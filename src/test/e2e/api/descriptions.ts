import { type Browser, expect, test } from '@playwright/test'

import { ApiEndPoint } from 'meta/api/endpoint'
import { type CountryIso } from 'meta/area/countryIso'
import { AssessmentNames } from 'meta/assessment/assessment'
import { CycleNames } from 'meta/assessment/cycle/names'
import { CommentableDescriptionName, type CommentableDescriptionValue } from 'meta/assessment/descriptionValue'
import { type SectionName } from 'meta/assessment/section'

import { testCredentials } from 'test/e2e/config/credentials'
import { AuthUtils } from 'test/e2e/utils/Auth'

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

// Empties the description once the whole spec is done (even if a test failed)
const clear = async (browser: Browser, location: DescriptionLocation): Promise<void> => {
  const { baseURL } = test.info().project.use
  const page = await browser.newPage({ baseURL })

  try {
    await AuthUtils.login(page, testCredentials)

    const isDataSources = location.name === CommentableDescriptionName.dataSources
    const value: CommentableDescriptionValue = isDataSources ? { text: '', dataSources: [] } : { text: '' }

    const url = `${ApiEndPoint.CycleData.Descriptions.many()}?${_getQueryParams(location)}`
    const response = await page.request.put(url, { data: { value } })

    expect(response.ok(), `PUT ${url} failed: ${response.status()} ${await response.text()}`).toBeTruthy()
  } finally {
    await page.close()
  }
}

export const DescriptionsApi = {
  clear,
}
