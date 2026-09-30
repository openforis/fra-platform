import { expect, type Page } from '@playwright/test'

import { ApiEndPoint } from 'meta/api/endpoint'
import { type CountryIso } from 'meta/area/countryIso'
import { AssessmentNames } from 'meta/assessment/assessment'
import { type ColName } from 'meta/assessment/col'
import { CycleNames } from 'meta/assessment/cycle/names'
import { type SectionName } from 'meta/assessment/section'
import { type TableName } from 'meta/assessment/table'
import { type VariableName } from 'meta/assessment/variable'

const assessmentName = AssessmentNames.fra

export type TableLocation = {
  countryIso: CountryIso
  cycleName?: CycleNames
  sectionName: SectionName
  tableName: TableName
}

export type TableSeedValue = {
  colName: ColName
  value: string
  variableName: VariableName
}

// Clear the table after the test.
// Set to false to leave the seeded values in place
export type TableSeed = TableLocation & {
  cleanup?: boolean
  values?: Array<TableSeedValue>
}

const _getQueryParams = (location: TableLocation, options: { withTableName: boolean }): string => {
  const { countryIso, cycleName = CycleNames._2025, sectionName, tableName } = location

  const params = new URLSearchParams({ assessmentName, countryIso, cycleName, sectionName })
  if (options.withTableName) params.set('tableName', tableName)

  return params.toString()
}

const setValues = async (page: Page, seed: TableSeed): Promise<void> => {
  const { tableName, values = [] } = seed
  if (values.length === 0) return

  const url = `${ApiEndPoint.CycleData.Table.nodes()}?${_getQueryParams(seed, { withTableName: false })}`
  const data = {
    tableName,
    values: values.map(({ colName, value, variableName }) => ({ colName, value: { raw: value }, variableName })),
  }
  const response = await page.request.patch(url, { data })

  expect(response.ok(), `PATCH ${url} failed: ${response.status()} ${await response.text()}`).toBeTruthy()
}

const clear = async (page: Page, location: TableLocation): Promise<void> => {
  const url = `${ApiEndPoint.CycleData.Table.tableClear()}?${_getQueryParams(location, { withTableName: true })}`
  const response = await page.request.post(url, { data: {} })

  expect(response.ok(), `POST ${url} failed: ${response.status()} ${await response.text()}`).toBeTruthy()
}

export const TableApi = {
  clear,
  setValues,
}
