import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'

import { validatorEqualToSum } from '@meta/expressionEvaluator/functions/validatorEqualToSum'

import { Context } from '../context'
import { validatorEqualToForestExpansion } from './validatorEqualToForestExpansion'
import { validatorEqualToPlantedForest } from './validatorEqualToPlantedForest'
import { validatorEqualToPrivateForest } from './validatorEqualToPrivateForest'
import { validatorEqualToTotalForest } from './validatorEqualToTotalForest'
import { validatorEqualToTotalGrowingStock } from './validatorEqualToTotalGrowingStock'
import { validatorForestAreaComparedTo2015 } from './validatorForestAreaComparedTo2015'
import { validatorForestAreaNetChange } from './validatorForestAreaNetChange'
import { validatorGreaterThanOrZero } from './validatorGreaterThanOrZero'
import { validatorIsYear } from './validatorIsYear'
import { validatorNextCountryReportYear } from './validatorNextCountryReportYear'
import { validatorNotGreaterThan } from './validatorNotGreaterThan'
import { validatorNotGreaterThanForest } from './validatorNotGreaterThanForest'
import { validatorOtherLand } from './validatorOtherLand'
import { validatorOtherLandWithTreeCoverTotal } from './validatorOtherLandWithTreeCoverTotal'
import { validatorPlantationForestIntroduced } from './validatorPlantationForestIntroduced'
import { validatorPrimaryForest } from './validatorPrimaryForest'
import { validatorRemainingLandWithTreeCoverTotal } from './validatorRemainingLandWithTreeCoverTotal'
import { validatorSubCategory } from './validatorSubCategory'
import { validatorSumNotGreaterThan } from './validatorSumNotGreaterThan'
import { validatorTotalForest } from './validatorTotalForest'

export const functions: Array<ExpressionFunction<Context>> = [
  validatorEqualToTotalGrowingStock,
  validatorForestAreaComparedTo2015,
  validatorNextCountryReportYear,
  validatorIsYear,
  validatorGreaterThanOrZero,
  validatorNotGreaterThan,
  validatorNotGreaterThanForest,
  validatorRemainingLandWithTreeCoverTotal,
  validatorOtherLand,
  validatorOtherLandWithTreeCoverTotal,
  validatorPlantationForestIntroduced,
  validatorPrimaryForest,
  validatorSubCategory,
  validatorTotalForest,
  validatorEqualToPrivateForest,
  validatorSumNotGreaterThan,
  validatorForestAreaNetChange,
  validatorEqualToForestExpansion,
  validatorEqualToPlantedForest,
  validatorEqualToTotalForest,
  validatorEqualToSum,
]
