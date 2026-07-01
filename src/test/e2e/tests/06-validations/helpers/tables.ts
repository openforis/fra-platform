import { expect, type Page } from '@playwright/test'

import { CountryIso } from 'meta/area/countryIso'
import { AssessmentNames } from 'meta/assessment/assessment'
import { CycleNames } from 'meta/assessment/cycle/names'
import { SectionNames } from 'meta/assessment/section'
import { TableNames } from 'meta/assessment/table'
import { type RecordTableValidationsState } from 'meta/assessment/validation/table'

import { NodeValueUtils } from 'test/e2e/utils/nodeValue'

const assessmentName = AssessmentNames.fra
const cycleName = CycleNames._2025

type SeedForestAreaNetChangeValidationProps = {
  countryIso: CountryIso
  valid: boolean
}

type GetTableValidationsProps = {
  countryIso: CountryIso
  sectionName: string
  tableNames: Array<TableNames>
}

export const getTableValidations = async (
  page: Page,
  props: GetTableValidationsProps
): Promise<RecordTableValidationsState> => {
  const { countryIso, sectionName, tableNames } = props

  const params = new URLSearchParams({ assessmentName, countryIso, cycleName })
  params.set('sectionName', sectionName)
  tableNames.forEach((tableName) => params.append('tableNames[]', tableName))

  const response = await page.request.get(`/api/cycle-data/validations/table-data?${params.toString()}`)
  expect(response.ok()).toBeTruthy()

  return response.json() as Promise<RecordTableValidationsState>
}

export const seedForestAreaNetChangeValidation = async (
  page: Page,
  props: SeedForestAreaNetChangeValidationProps
): Promise<void> => {
  const { countryIso, valid } = props
  const forestArea2020 = '1000'
  const forestArea2025 = valid ? '1000' : '1500'
  const forestAreaNetChange = '0'

  await NodeValueUtils.patch(page, {
    assessmentName,
    countryIso,
    cycleName,
    sectionName: SectionNames.extentOfForest,
    tableName: TableNames.extentOfForest,
    values: [
      { colName: '2020', value: { raw: forestArea2020 }, variableName: 'forestArea' },
      { colName: '2025', value: { raw: forestArea2025 }, variableName: 'forestArea' },
    ],
  })

  await NodeValueUtils.patch(page, {
    assessmentName,
    countryIso,
    cycleName,
    sectionName: 'forestAreaChange',
    tableName: TableNames.forestAreaChange,
    values: [{ colName: '2020-2025', value: { raw: forestAreaNetChange }, variableName: 'forestAreaNetChange' }],
  })

  // Wait for validation state to reflect the patched node values.
  await expect(async () => {
    const validations = await getTableValidations(page, {
      countryIso,
      sectionName: 'forestAreaChange',
      tableNames: [TableNames.forestAreaChange],
    })
    const validation = validations[TableNames.forestAreaChange]?.['2020-2025']?.forestAreaNetChange

    expect(validation?.valid === false).toBe(!valid)
    expect(validations[TableNames.forestAreaChange]?.['2025']?.forestAreaNetChange).toBeUndefined()
  }).toPass({ timeout: 20000 })
}
