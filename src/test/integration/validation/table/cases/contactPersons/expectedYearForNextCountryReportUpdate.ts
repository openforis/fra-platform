import { TableNames } from 'meta/assessment/table'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../../types'

const tableName = TableNames.contactPersons
const colName = 'expectedYearForNextCountryReportUpdate'
const variableName = 'expectedYearForNextCountryReportUpdate'
const cell = { colName, tableName, variableName }
const currentYear = new Date().getFullYear()

const datum = (raw: string): NodeUpdate => ({ ...cell, value: { raw } })

const inThePast = {
  messages: [
    {
      key: 'generalValidation.countryReportYearGreaterThanCurrentYear',
      name: ValidatorName.nextCountryReportYear,
      params: { minValue: currentYear },
    },
  ],
  valid: false,
}

export const expectedYearForNextCountryReportUpdate: Array<TableValidationTestCase> = [
  // Nothing reported yet is valid
  {
    cell,
    data: [],
    expected: undefined,
    name: `${ValidatorName.nextCountryReportYear}: empty data is valid`,
  },
  {
    cell,
    data: [datum(String(currentYear))],
    expected: undefined,
    name: `${ValidatorName.nextCountryReportYear}: current year is valid`,
  },
  {
    cell,
    data: [datum(String(currentYear + 1))],
    expected: undefined,
    name: `${ValidatorName.nextCountryReportYear}: next year is valid`,
  },
  {
    cell,
    data: [datum(String(currentYear - 1))],
    expected: inThePast,
    name: `${ValidatorName.nextCountryReportYear}: last year is invalid`,
  },
]
