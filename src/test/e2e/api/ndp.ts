import { expect, type Page } from '@playwright/test'

import { ApiEndPoint } from 'meta/api/endpoint'
import { type CountryIso } from 'meta/area/countryIso'
import { AssessmentNames } from 'meta/assessment/assessment'
import { CycleNames } from 'meta/assessment/cycle/names'
import { ODPs } from 'meta/assessment/odps'
import { type ODPNationalClass, type OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { type SectionName, SectionNames } from 'meta/assessment/section'
import { TableNames } from 'meta/assessment/table'

const assessmentName = AssessmentNames.fra
const cycleName = CycleNames._2025

export type NdpSeed = {
  countryIso: CountryIso
  nationalClasses: Array<ODPNationalClass>
  year: number
}

type QueryProps = {
  countryIso: CountryIso
  sectionName?: SectionName
  year?: number
}

const _getQueryParams = (props: QueryProps): string => {
  const { countryIso, sectionName, year } = props

  const params = new URLSearchParams({ assessmentName, countryIso, cycleName })
  if (sectionName) params.set('sectionName', sectionName)
  if (year) params.set('year', String(year))

  return params.toString()
}

const _buildNationalDataPoint = (seed: NdpSeed): Partial<OriginalDataPoint> => {
  const { countryIso, nationalClasses, year } = seed

  const originalDataPoint: Partial<OriginalDataPoint> = {
    comments: { [TableNames.extentOfForest]: '', [TableNames.forestCharacteristics]: '' },
    countryIso,
    nationalClasses,
    values: {},
    year,
  }

  return ODPs.calculateValues(originalDataPoint as OriginalDataPoint)
}

// The error in case it is already deleted is ignored - used for cleanup/setup
const removeIfExists = async (page: Page, seed: NdpSeed): Promise<void> => {
  const { countryIso, year } = seed

  const query = _getQueryParams({ countryIso, year })
  await page.request.delete(`${ApiEndPoint.CycleData.NationalDataPoint.one()}?${query}`)
}

const create = async (page: Page, seed: NdpSeed): Promise<OriginalDataPoint> => {
  const { countryIso } = seed

  await removeIfExists(page, seed)

  const query = _getQueryParams({ countryIso, sectionName: SectionNames.extentOfForest })
  const url = `${ApiEndPoint.CycleData.NationalDataPoint.one()}?${query}`
  const response = await page.request.post(url, {
    data: { originalDataPoint: _buildNationalDataPoint(seed) },
  })

  expect(response.ok(), `POST ${url} failed: ${response.status()} ${await response.text()}`).toBeTruthy()

  return response.json()
}

export const NdpApiUtils = {
  create,
  removeIfExists,
}
