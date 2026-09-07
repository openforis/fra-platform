import { Assessment } from 'meta/assessment/assessment'
import { VariablesCache } from 'meta/assessment/metaCache'

import { TableValidationTestCase } from '../types'
import { assessment, cycle } from './assessment'

type Props = Pick<TableValidationTestCase, 'rows'>

export const buildAssessment = (props: Props): Assessment => {
  const { rows } = props

  const variablesByTable = rows.reduce<VariablesCache>((acc, row) => {
    const { tableName, variableName } = row
    acc[tableName] = { ...acc[tableName], [variableName]: { tableName, variableName } }
    return acc
  }, {})

  return {
    ...assessment,
    metaCache: {
      [cycle.uuid]: {
        calculations: { dependants: {}, dependencies: {} },
        enablers: { dependants: {}, dependencies: {} },
        validations: { dependants: {}, dependencies: {} },
        variablesByTable,
      },
    },
  }
}
