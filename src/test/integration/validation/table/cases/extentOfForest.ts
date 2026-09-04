import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { TableValidationTestCase } from '../types'

const tableName = 'extentOfForest'
const colName = '2025'

// Formulas are copied from the fra 2025 metadata (row.props.validateFns)
export const extentOfForest: Array<TableValidationTestCase> = [
  {
    cell: { colName, tableName, variableName: 'otherLand' },
    data: [
      { colName, raw: '-100', tableName, variableName: 'otherLand' },
      { colName, raw: '30000', tableName, variableName: 'totalLandArea' },
    ],
    expected: {
      messages: [{ key: 'extentOfForest.fedAreasExceedTotalLandArea', name: ValidatorName.otherLand }],
      valid: false,
    },
    name: 'Expect a negative other land to exceed the total land area',
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
