import { Col } from 'meta/assessment/col'
import { VariableCache } from 'meta/assessment/metaCache'
import { NodeValueValidation } from 'meta/assessment/nodeValueValidation'
import { NodeValueValidations } from 'meta/assessment/nodeValueValidations'
import { RowCaches } from 'meta/assessment/rowCaches'
import { TableName } from 'meta/assessment/table'
import { TableValidations } from 'meta/assessment/validation/tableValidations'
import { ExpressionEvaluator } from 'meta/expressionEvaluator'
import { Objects } from 'utils/objects'
import { Promises } from 'utils/promises'

import { Context } from './context/context'
import { shouldSkipValidationFormula } from './shouldSkipValidationFormula'

type Props = {
  context: Context
}

export const validateNodeUpdates = async (props: Props): Promise<Array<TableName>> => {
  const { context } = props
  const { assessment, assessments, country, countryIso, cycle, data, rows, tableValidations } = context
  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle
  const queue = context.queue.splice(0)
  const updatedTableNames = new Set<TableName>()

  await Promises.each(queue, (variable: VariableCache) => {
    const { colName, tableName, variableName } = variable

    const row = rows[RowCaches.getKey({ tableName, variableName })]
    const col = row?.cols?.find((candidate: Col) => candidate.props.colName === colName)
    // Same behavior as updateCalculationDependencies: queued targets that don't map
    // to a concrete metadata column are not processed.
    if (Objects.isNil(row) || Objects.isNil(col)) {
      return
    }

    const validateFns = col.props.validateFns?.[cycle.uuid] ?? row.props.validateFns?.[cycle.uuid]

    if (Objects.isEmpty(validateFns)) {
      TableValidations.remove({ colName, tableName, tableValidations, variableName })
      updatedTableNames.add(tableName)
      return
    }

    const validations = validateFns.map((formula: string) => {
      if (shouldSkipValidationFormula({ countryIso, formula })) {
        return { valid: true }
      }
      const evalProps = { assessmentName, assessments, colName, country, countryIso, cycleName, data, formula, row }
      return ExpressionEvaluator.evalFormula<NodeValueValidation>(evalProps)
    })

    const validation = NodeValueValidations.merge(validations)

    if (validation.valid) {
      TableValidations.remove({ colName, tableName, tableValidations, variableName })
      updatedTableNames.add(tableName)
      return
    }

    Objects.setInPath({
      obj: tableValidations,
      path: [tableName, colName, variableName],
      value: validation,
    })
    updatedTableNames.add(tableName)
  })

  return Array.from(updatedTableNames)
}
