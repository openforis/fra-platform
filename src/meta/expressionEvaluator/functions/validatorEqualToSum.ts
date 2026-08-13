import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment/nodeValueValidation'
import { ValidationMessageParam, ValidationMessageParamKey } from 'meta/assessment/validation/validation'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { ExpressionFunction } from 'lib/expressionEvaluator/function'

import { Context } from '../context'

export const validatorEqualToSum: ExpressionFunction<Context> = {
  name: ValidatorName.equalToSum,
  minArity: 2,
  executor: () => {
    return (
      value: string,
      otherValues: Array<string>,
      parentVariable = 'parent',
      col = '',
      table = '',
      subcategories: string | Array<string> = ''
    ): NodeValueValidation => {
      const valid =
        Objects.isEmpty(value) ||
        Numbers.eqWithTolerance(value, Numbers.sum(otherValues?.filter((v) => !Objects.isEmpty(v))))

      const subcategoryLabels: ValidationMessageParam = Array.isArray(subcategories)
        ? subcategories.map<ValidationMessageParamKey>((subcategory) => ({ key: subcategory }))
        : subcategories

      const valueRounded = parseFloat(value).toFixed(2)
      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [
            {
              name: ValidatorName.equalToSum,
              key: 'generalValidation.valueEqualToSumParent',
              params: {
                parentVariable: { key: parentVariable },
                subcategories: subcategoryLabels,
                parentCol: { key: col },
                parentTable: table,
                valueRounded,
              },
            },
          ]

      return { valid, messages }
    }
  },
}
