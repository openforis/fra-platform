import { Objects } from 'utils/objects'

import { ExpressionContext } from '../context'
import { ExpressionFunction } from '../function'

export const functionsDefault: Array<ExpressionFunction<ExpressionContext>> = [
  {
    name: 'isEmpty',
    minArity: 1,
    maxArity: 1,
    executor: () => (value: any) => Objects.isEmpty(value),
  },
]
