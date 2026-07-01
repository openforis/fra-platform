import { Col, ColName } from 'meta/assessment/col'
import { VariableCache } from 'meta/assessment/metaCache'
import { NodeValueValidation } from 'meta/assessment/nodeValueValidation'
import { NodeValueValidations } from 'meta/assessment/nodeValueValidations'
import { RowCaches } from 'meta/assessment/rowCaches'
import { TableName } from 'meta/assessment/table'
import { RecordTableValidationsState } from 'meta/assessment/validation/table'
import { VariableName } from 'meta/assessment/variable'
import { ExpressionEvaluator } from 'meta/expressionEvaluator'
import { Objects } from 'utils/objects'
import { Promises } from 'utils/promises'

import { isODPVariable } from 'server/controller/cycleData/nationalDataPoint/getVariables'

import { Context } from './context/context'
import { shouldSkipValidationFormula } from './shouldSkipValidationFormula'

type RemoveValidationProps = {
  colName: ColName
  tableName: TableName
  tableValidations: RecordTableValidationsState
  variableName: VariableName
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
  const updatedTableNames = new Set<TableName>()

  await Promises.each(queue, (variable: VariableCache) => {
    const { colName, tableName, variableName } = variable

    const row = rows[RowCaches.getKey({ tableName, variableName })]
    const col = row?.cols?.find((candidate: Col) => candidate.props.colName === colName)

    // NDP variables are queued with the NDP year as colName (e.g. extentOfForest.forestArea.2024).
    // NDP years that are not reporting years have no col in the row metadata,
    // so a missing col is expected: validate with the row-level validateFns.
    const isNDPYearTarget = Objects.isNil(col) && isODPVariable(cycle, variable)

    if (Objects.isNil(row) || (Objects.isNil(col) && !isNDPYearTarget)) {
      throw new Error(`Could not resolve validation target ${tableName}.${variableName}.${colName}`)
    }

    const validateFns = col?.props.validateFns?.[cycle.uuid] ?? row.props.validateFns?.[cycle.uuid]

    if (Objects.isEmpty(validateFns)) {
      _removeValidation({ colName, tableName, tableValidations, variableName })
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
      _removeValidation({ colName, tableName, tableValidations, variableName })
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
