import { Col } from 'meta/assessment/col'
import { VariableCache } from 'meta/assessment/metaCache'
import { NodeValueValidation } from 'meta/assessment/nodeValueValidation'
import { NodeValueValidations } from 'meta/assessment/nodeValueValidations'
import { RowCaches } from 'meta/assessment/rowCaches'
import { TableName } from 'meta/assessment/table'
import { RecordTableValidationsState } from 'meta/assessment/validation/table'
import { ExpressionEvaluator } from 'meta/expressionEvaluator'
import { Objects } from 'utils/objects'
import { Promises } from 'utils/promises'

import { Context } from 'server/controller/cycleData/validations/context/context'
import { shouldSkipValidationFormula } from 'server/controller/cycleData/validations/shouldSkipValidationFormula'

type RemoveValidationProps = {
  colName: string
  tableName: TableName
  tableValidations: RecordTableValidationsState
  variableName: string
}

const _removeValidation = (props: RemoveValidationProps): void => {
  const { colName, tableName, tableValidations, variableName } = props

  Objects.unset(tableValidations, [tableName, colName, variableName])

  // Remove empty column object after deleting the last invalid node for that column.
  if (Objects.isEmpty(tableValidations[tableName]?.[colName])) {
    Objects.unset(tableValidations, [tableName, colName])
  }
}

type Props = {
  context: Context
}

export const validateNodeUpdates = async (props: Props): Promise<Array<TableName>> => {
  const { context } = props
  const { assessment, assessments, country, countryIso, cycle, data, rows, tableValidations } = context
  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle
  const queue = context.queue.splice(0)
  const touchedTableNames = new Set<TableName>()

  await Promises.each(queue, (variable: VariableCache) => {
    if (Objects.isNil(variable)) {
      return
    }

    const { colName, tableName, variableName } = variable

    if (Objects.isEmpty(colName)) {
      return
    }

    touchedTableNames.add(tableName)

    const row = rows[RowCaches.getKey({ tableName, variableName })]
    const col = row?.cols?.find((candidate: Col) => candidate.props.colName === colName)
    const validateFns = col?.props.validateFns?.[cycle.uuid] ?? row?.props.validateFns?.[cycle.uuid]

    if (Objects.isNil(row) || Objects.isNil(col)) {
      _removeValidation({ colName, tableName, tableValidations, variableName })
      return
    }

    if (Objects.isEmpty(validateFns) || Objects.isEmpty(row.props.variableName)) {
      _removeValidation({ colName, tableName, tableValidations, variableName })
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
      _removeValidation({ colName, tableName, tableValidations, variableName })
      return
    }

    Objects.setInPath({
      obj: tableValidations,
      path: [tableName, colName, variableName],
      value: validation,
    })
  })

  return Array.from(touchedTableNames)
}
