import { Country } from 'meta/area/country'
import { CountryIso } from 'meta/area/countryIso'
import { NodeValueValidation } from 'meta/assessment/nodeValueValidation'
import { TableName } from 'meta/assessment/table'
import { RecordTableValidationsState } from 'meta/assessment/validation/table'

import { Context } from 'server/service/dataValidation/tables/context/context'
import { validateNodeUpdates } from 'server/service/dataValidation/tables/validateNodeUpdates'

import { buildAssessment } from './setup/buildAssessment'
import { buildAssessmentData } from './setup/buildAssessmentData'
import { buildRowCaches } from './setup/buildRowCaches'
import { TableValidationTestCase } from './types'

type TableValidationTestResult = {
  updatedTableNames: Array<TableName>
  validation?: NodeValueValidation
}

const countryIso: CountryIso = 'FIN'

export const runTableValidationTestCase = async (
  testCase: TableValidationTestCase
): Promise<TableValidationTestResult> => {
  const { cell, data, rows } = testCase
  const { assessment, cycle } = buildAssessment({ rows })
  const tableValidations: RecordTableValidationsState = {}

  const context = new Context({
    assessment,
    assessments: { [assessment.props.name]: assessment },
    country: { countryIso } as Country,
    cycle,
    data: buildAssessmentData({ assessment, countryIso, cycle, data }),
    queue: [cell],
    rows: buildRowCaches({ cycle, rows }),
    tableNames: Array.from(new Set(rows.map<TableName>((row) => row.tableName))),
    tableValidations,
  })

  const updatedTableNames = await validateNodeUpdates({ context })

  return {
    updatedTableNames,
    validation: tableValidations[cell.tableName]?.[cell.colName]?.[cell.variableName],
  }
}
