import { expect, type Page } from '@playwright/test'

import { ApiEndPoint } from 'meta/api/endpoint'
import { type CountryIso } from 'meta/area/countryIso'
import { AssessmentNames } from 'meta/assessment/assessment'
import { type ColName } from 'meta/assessment/col'
import { CycleNames } from 'meta/assessment/cycle/names'
import { type SectionName } from 'meta/assessment/section'
import { type TableName } from 'meta/assessment/table'
import { type VariableName } from 'meta/assessment/variable'
import { type RecordAssessmentData } from 'meta/data/recordData'

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

// variableName -> seeded value, for every colName given
export const buildSeedValues = (
  colNames: Array<ColName>,
  variables: Record<VariableName, string>
): Array<TableSeedValue> =>
  colNames.flatMap((colName) =>
    Object.entries(variables).map(([variableName, value]) => ({ colName, value, variableName }))
  )

const _getBaseParams = (props: { countryIso: CountryIso; cycleName?: CycleNames }): URLSearchParams => {
  const { countryIso, cycleName = CycleNames._2025 } = props
  return new URLSearchParams({ assessmentName, countryIso, cycleName })
}

const _getQueryParams = (location: TableLocation, options: { withTableName: boolean }): string => {
  const { sectionName, tableName } = location

  const params = _getBaseParams(location)
  params.set('sectionName', sectionName)
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

const getValues = async (page: Page, location: TableLocation): Promise<RecordAssessmentData> => {
  const { countryIso, tableName } = location

  const params = _getBaseParams(location)
  params.set('mergeOdp', 'true')
  params.append('tableNames[]', tableName)
  params.append('countryISOs[]', countryIso)

  const url = `${ApiEndPoint.CycleData.Table.tableData()}?${params.toString()}`
  const response = await page.request.get(url)
  expect(response.ok(), `GET ${url} failed: ${response.status()} ${await response.text()}`).toBeTruthy()

  return response.json()
}

export const TableApi = {
  clear,
  getValues,
  setValues,
}
