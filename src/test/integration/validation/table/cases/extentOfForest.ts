import { TableNames } from 'meta/assessment/table'
import { Years } from 'meta/assessment/years'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { cycle } from '../setup/assessment'
import { TableValidationTestCase } from '../types'

const tableName = TableNames.extentOfForest
const [colName] = Years.fraYears(cycle)

// Formulas are copied from the fra 2025 metadata (row.props.validateFns)
export const extentOfForest: Array<TableValidationTestCase> = [
  {
    cell: { colName, tableName, variableName: 'otherLand' },
    data: [
      { colName, tableName, value: { raw: '-100' }, variableName: 'otherLand' },
      { colName, tableName, value: { raw: '30000' }, variableName: 'totalLandArea' },
    ],
    expected: {
      messages: [{ key: 'extentOfForest.fedAreasExceedTotalLandArea', name: ValidatorName.otherLand }],
      valid: false,
    },
    name: `${ValidatorName.otherLand}: negative other land is invalid`,
    rows: [
      {
        cols: [{ colName }],
        tableName,
        validateFns: ['validatorOtherLand(extentOfForest.otherLand, extentOfForest.totalLandArea)'],
        variableName: 'otherLand',
      },
      { cols: [{ colName }], tableName, variableName: 'totalLandArea' },
    ],
  },
]
