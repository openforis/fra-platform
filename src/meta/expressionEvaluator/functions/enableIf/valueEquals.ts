import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'
import { Objects } from 'utils/objects'

import { Context } from '../../context'

export const valueEquals: ExpressionFunction<Context> = {
  name: 'valueEquals',
  minArity: 2,
  executor: () => {
    return (value: string, expectedValue: string): boolean => {
      if (Objects.isNil(expectedValue)) {
        return false
      }

      return value === expectedValue
    }
  },
}
