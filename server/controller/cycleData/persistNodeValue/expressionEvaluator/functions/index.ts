import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'

import { Context } from '../context'
// 1a
import { isValidOtherLand } from './isValidOtherLand'
// 1b
import { isValidPlantationForestIntroduced } from './isValidPlantationForestIntroduced'
import { isValidTotalForest } from './isValidTotalForest'
import { validatorNotGreaterThanForest } from './validatorNotGreaterThanForest'
// 1c
import { validatorPrimaryForest } from './validatorPrimaryForest'

export const functions: Array<ExpressionFunction<Context>> = [
  isValidOtherLand,
  isValidPlantationForestIntroduced,
  isValidTotalForest,
  validatorPrimaryForest,
  validatorNotGreaterThanForest,
]
