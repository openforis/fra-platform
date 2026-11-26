import { Page } from '@playwright/test'

import { Numbers } from 'utils/numbers'

import { expectCellValue } from './expectCellValue'

type ExpectSeededValuesMatchProps = {
  page: Page
  colNames: Array<string>
  variableNames: Array<string>
  getSeededDatum: (props: { colName: string; variableName: string }) => string | undefined
  tableName?: string
}

export const expectSeededValuesMatch = async (props: ExpectSeededValuesMatchProps): Promise<void> => {
  const { colNames, getSeededDatum, page, tableName, variableNames } = props

  await Promise.all(
    colNames.flatMap((colName) =>
      variableNames.map((variableName) => {
        const expectedRaw = getSeededDatum({ colName, variableName })
        // A blank cell shows as '' in the DOM, not null - match that instead of Numbers.toFixed's null
        const expectedValue = Numbers.toFixed(expectedRaw) ?? ''
        return expectCellValue(page, variableName, colName, expectedValue, tableName)
      })
    )
  )
}
