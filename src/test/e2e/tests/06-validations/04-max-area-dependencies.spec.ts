import { type Page } from '@playwright/test'

import { CountryIso } from 'meta/area/countryIso'
import { AssessmentNames } from 'meta/assessment/assessment'
import { type Cycle } from 'meta/assessment/cycle'
import { CycleNames } from 'meta/assessment/cycle/names'
import { SectionNames } from 'meta/assessment/section'
import { TableNames } from 'meta/assessment/table'
import { Years } from 'meta/assessment/years'

import { expect, test } from 'test/e2e/fixtures/auth'
import { NodeValueUtils } from 'test/e2e/utils/nodeValue'

import { getTableValidations } from './helpers/tables'

const assessmentName = AssessmentNames.fra
const cycleName = CycleNames._2025
const targetColName = '2005'
const maxSourceColName = '2025'
const extentOfForestColumns = Years.fraYears({ name: cycleName } as Cycle)

type TargetValue = {
  raw: string
  variableName: string
}

type MaxAreaDependencyCase = {
  countryIso: CountryIso
  invalidMaxValue: string
  sourceVariableName: string
  targetSectionName: SectionNames
  targetTableName: TableNames
  targetValues: Array<TargetValue>
  targetVariableName: string
  validMaxValue: string
}

const maxAreaDependencyCases: Array<MaxAreaDependencyCase> = [
  // Covers validators that fall back to maxForestArea() when the same-year forest area is blank.
  {
    countryIso: 'X11',
    invalidMaxValue: '100',
    sourceVariableName: 'forestArea',
    targetSectionName: SectionNames.disturbances,
    targetTableName: TableNames.disturbances,
    targetVariableName: 'insects',
    targetValues: [
      { raw: '120', variableName: 'insects' },
      { raw: '', variableName: 'diseases' },
      { raw: '', variableName: 'severe_weather_events' },
      { raw: '', variableName: 'other' },
    ],
    validMaxValue: '250',
  },
  // Covers validators that fall back to maxLandArea() when the same-year land area is blank.
  {
    countryIso: 'X12',
    invalidMaxValue: '4000',
    sourceVariableName: 'totalLandArea',
    targetSectionName: SectionNames.areaAffectedByFire,
    targetTableName: TableNames.areaAffectedByFire,
    targetVariableName: 'total_land_area_affected_by_fire',
    targetValues: [
      { raw: '5000', variableName: 'total_land_area_affected_by_fire' },
      { raw: '', variableName: 'of_which_on_forest' },
    ],
    validMaxValue: '6000',
  },
]

const _patchMaxSource = async (
  page: Page,
  testCase: MaxAreaDependencyCase,
  maxValue: string,
  colNames = extentOfForestColumns
): Promise<void> => {
  const { countryIso, sourceVariableName } = testCase
  // Seed source values so the max-area fallback is determined by 2025.
  await NodeValueUtils.patch(page, {
    assessmentName,
    countryIso,
    cycleName,
    sectionName: SectionNames.extentOfForest,
    tableName: TableNames.extentOfForest,
    values: colNames.map((colName) => ({
      colName,
      value: { raw: colName === maxSourceColName ? maxValue : '' },
      variableName: sourceVariableName,
    })),
  })
}

const _expectTargetValidation = async (page: Page, testCase: MaxAreaDependencyCase, valid: boolean): Promise<void> => {
  const { countryIso, targetSectionName, targetTableName, targetVariableName } = testCase

  await expect(async () => {
    const validations = await getTableValidations(page, {
      countryIso,
      sectionName: targetSectionName,
      tableNames: [targetTableName],
    })
    const validation = validations[targetTableName]?.[targetColName]?.[targetVariableName]

    if (valid) {
      expect(validation).toBeUndefined()
    } else {
      expect(validation?.valid).toBe(false)
    }
  }).toPass({ timeout: 20000 })
}

test.describe.serial('Max area validation dependencies', () => {
  maxAreaDependencyCases.forEach((testCase) => {
    const { countryIso, sourceVariableName, targetSectionName, targetTableName, targetValues, targetVariableName } =
      testCase

    test(`editing only ${sourceVariableName}['2025'] revalidates ${targetTableName}.${targetVariableName}['2005']`, async ({
      authenticatedPage,
    }) => {
      const { invalidMaxValue, validMaxValue } = testCase
      await _patchMaxSource(authenticatedPage, testCase, validMaxValue)

      // Leave the same-year source blank to use the max-area fallback.
      await NodeValueUtils.patch(authenticatedPage, {
        assessmentName,
        countryIso,
        cycleName,
        sectionName: targetSectionName,
        tableName: targetTableName,
        values: targetValues.map(({ raw, variableName }) => ({
          colName: targetColName,
          value: { raw },
          variableName,
        })),
      })

      await _expectTargetValidation(authenticatedPage, testCase, true)

      // Changing 2025 should revalidate the 2005 target through the max-area dependency.
      await _patchMaxSource(authenticatedPage, testCase, invalidMaxValue, [maxSourceColName])
      await _expectTargetValidation(authenticatedPage, testCase, false)

      await _patchMaxSource(authenticatedPage, testCase, validMaxValue, [maxSourceColName])
      await _expectTargetValidation(authenticatedPage, testCase, true)
    })
  })
})
