import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'

import { Context } from '../context'
import { validatorEqualToPrivateForest } from './validatorEqualToPrivateForest'
import { validatorEqualToTotalGrowingStock } from './validatorEqualToTotalGrowingStock'
import { validatorForestAreaComparedTo2015 } from './validatorForestAreaComparedTo2015'
import { validatorGreaterThanOrZero } from './validatorGreaterThanOrZero'
import { validatorNotGreaterThanForest } from './validatorNotGreaterThanForest'
import { validatorOtherLand } from './validatorOtherLand'
import { validatorOtherLandWithTreeCoverTotal } from './validatorOtherLandWithTreeCoverTotal'
import { validatorPlantationForestIntroduced } from './validatorPlantationForestIntroduced'
import { validatorPrimaryForest } from './validatorPrimaryForest'
import { validatorSubCategory } from './validatorSubCategory'
import { validatorTotalForest } from './validatorTotalForest'

export const functions: Array<ExpressionFunction<Context>> = [
  validatorEqualToTotalGrowingStock,
  validatorForestAreaComparedTo2015,
  validatorGreaterThanOrZero,
  validatorNotGreaterThanForest,
  validatorOtherLand,
  validatorOtherLandWithTreeCoverTotal,
  validatorPlantationForestIntroduced,
  validatorPrimaryForest,
  validatorSubCategory,
  validatorTotalForest,
  validatorEqualToPrivateForest,
]
