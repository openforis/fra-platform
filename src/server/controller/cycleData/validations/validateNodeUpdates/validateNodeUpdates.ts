import { NodeValueValidation } from 'meta/assessment/nodeValueValidation'
import { NodeValueValidations } from 'meta/assessment/nodeValueValidations'
import { RowCaches } from 'meta/assessment/rowCaches'
import { ExpressionEvaluator } from 'meta/expressionEvaluator'
import { Objects } from 'utils/objects'
import { Promises } from 'utils/promises'

import { ValidationRedisRepository } from 'server/cache/repository/validation'
import { Context } from 'server/controller/cycleData/validations/context'
import { shouldSkipValidationFormula } from 'server/controller/cycleData/validations/shouldSkipValidationFormula'

type Props = {
  context: Context
}

export const validateNodeUpdates = async (props: Props): Promise<void> => {
  const { context } = props
  const { assessment, assessments, country, countryIso, cycle, data, rows } = context
  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle
  const queue = context.queue.splice(0)

  await Promises.each(queue, async (variable) => {
    if (Objects.isNil(variable)) {
      return
    }

    const { colName, tableName, variableName } = variable

    if (Objects.isEmpty(colName)) {
      return
    }

    const row = rows[RowCaches.getKey({ tableName, variableName })]
    const col = row?.cols?.find((candidate) => candidate.props.colName === colName)
    const validateFns = col?.props.validateFns?.[cycle.uuid] ?? row?.props.validateFns?.[cycle.uuid]

    if (Objects.isNil(row) || Objects.isNil(col)) {
      return
    }

    if (Objects.isEmpty(validateFns) || Objects.isEmpty(row.props.variableName)) {
      return
    }

    const validations = validateFns.map((formula) => {
      if (shouldSkipValidationFormula({ countryIso, formula })) {
        return { valid: true }
      }
      const evalProps = { assessmentName, assessments, colName, country, countryIso, cycleName, data, formula, row }
      return ExpressionEvaluator.evalFormula<NodeValueValidation>(evalProps)
    })

    const validation = NodeValueValidations.merge(validations)
    const validationProps = { assessment, colName, countryIso, cycle, tableName, validation, variableName }

    if (validation.valid) {
      await ValidationRedisRepository.unsetValidation(validationProps)
      return
    }

    await ValidationRedisRepository.setValidation(validationProps)
  })
}
