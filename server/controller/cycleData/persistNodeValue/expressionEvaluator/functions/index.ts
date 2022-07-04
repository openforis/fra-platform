import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'

import { Context } from '../context'
import { validatorEqualToTotalGrowingStock } from './validatorEqualToTotalGrowingStock'
import { validatorForestAreaComparedTo2015 } from './validatorForestAreaComparedTo2015'
import { validatorGreaterThenOrZero } from './validatorGreaterThenOrZero'
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
  validatorGreaterThenOrZero,
  validatorNotGreaterThanForest,
  validatorOtherLand,
  validatorOtherLandWithTreeCoverTotal,
  validatorPlantationForestIntroduced,
  validatorPrimaryForest,
  validatorSubCategory,
  validatorTotalForest,
]
