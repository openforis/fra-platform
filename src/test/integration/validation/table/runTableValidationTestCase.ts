import { CountryIso } from 'meta/area/countryIso'
import { AssessmentNames } from 'meta/assessment/assessment'
import { CycleNames } from 'meta/assessment/cycle/names'
import { NodeValueValidation } from 'meta/assessment/nodeValueValidation'
import { RowCaches } from 'meta/assessment/rowCaches'
import { TableName } from 'meta/assessment/table'
import { RecordTableValidationsState } from 'meta/assessment/validation/table'

import { RowRedisRepository } from 'server/cache/repository/row'
import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { Context } from 'server/service/dataValidation/tables/context/context'
import { validateNodeUpdates } from 'server/service/dataValidation/tables/validateNodeUpdates'

import { buildAssessmentData } from './setup/buildAssessmentData'
import { TableValidationTestCase } from './types'

type TableValidationTestResult = {
  updatedTableNames: Array<TableName>
  // Formulas the metadata declares for the cell, so a cell without formulas cannot pass as valid
  validateFns: Array<string>
  validation?: NodeValueValidation
}

const assessmentName = AssessmentNames.fra
const cycleName = CycleNames._2025
const countryIso: CountryIso = 'FIN'

export const runTableValidationTestCase = async (
  testCase: TableValidationTestCase
): Promise<TableValidationTestResult> => {
  const { cell, data } = testCase

  const { assessment, cycle } = await AssessmentController.getOneWithCycle({
    assessmentName,
    cycleName,
    metaCache: true,
  })
  const country = await AreaController.getCountry({ assessment, countryIso, cycle })
  const rowKey = RowCaches.getKey(cell)
  const rows = await RowRedisRepository.getRows({ assessment, rowKeys: [rowKey] })
  const tableValidations: RecordTableValidationsState = {}

  const context = new Context({
    assessment,
    assessments: { [assessmentName]: assessment },
    country,
    cycle,
    data: buildAssessmentData({ assessment, countryIso, cycle, data }),
    queue: [cell],
    rows,
    tableNames: [cell.tableName],
    tableValidations,
  })

  const updatedTableNames = await validateNodeUpdates({ context })

  const row = rows[rowKey]
  const col = row?.cols.find((candidate) => candidate.props.colName === cell.colName)

  return {
    updatedTableNames,
    validateFns: col?.props.validateFns?.[cycle.uuid] ?? row?.props.validateFns?.[cycle.uuid] ?? [],
    validation: tableValidations[cell.tableName]?.[cell.colName]?.[cell.variableName],
  }
}
