import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'

import { Context } from '../context'
import { validatorNotGreaterThanForest } from './validatorNotGreaterThanForest'
// 1a
import { validatorOtherLand } from './validatorOtherLand'
// 1b
import { validatorPlantationForestIntroduced } from './validatorPlantationForestIntroduced'
// 1c
import { validatorPrimaryForest } from './validatorPrimaryForest'
import { validatorTotalForest } from './validatorTotalForest'

export const functions: Array<ExpressionFunction<Context>> = [
  validatorOtherLand,
  validatorPlantationForestIntroduced,
  validatorTotalForest,
  validatorPrimaryForest,
  validatorNotGreaterThanForest,
]
