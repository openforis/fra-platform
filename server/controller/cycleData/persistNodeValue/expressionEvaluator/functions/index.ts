import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'

import { Context } from '../context'
import { isValidOtherLand } from './isValidOtherLand'

export const functions: Array<ExpressionFunction<Context>> = [isValidOtherLand]
