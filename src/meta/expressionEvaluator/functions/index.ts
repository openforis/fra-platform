import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'

import { Context } from '../context'
import { maxForestArea } from './maxForestArea'
import { maxLandArea } from './maxLandArea'
import { NWFPProductHasCategory } from './NWFPProductHasCategory'
import { validatorColSumNotGreaterThanForest } from './validatorColSumNotGreaterThanForest'
import { validatorEqualToForestExpansion } from './validatorEqualToForestExpansion'
import { validatorEqualToPlantedForest } from './validatorEqualToPlantedForest'
import { validatorEqualToSum } from './validatorEqualToSum'
import { validatorEqualToTotalForest } from './validatorEqualToTotalForest'
import { validatorEqualToTotalGrowingStock } from './validatorEqualToTotalGrowingStock'
import { validatorForestAreaComparedTo2015 } from './validatorForestAreaComparedTo2015'
import { validatorForestAreaComparedTo2020 } from './validatorForestAreaComparedTo2020'
import { validatorForestAreaNetChange } from './validatorForestAreaNetChange'
import { validatorGreaterThanOrZero } from './validatorGreaterThanOrZero'
import { validatorIsYear } from './validatorIsYear'
import { validatorNextCountryReportYear } from './validatorNextCountryReportYear'
import { validatorNotGreaterThan } from './validatorNotGreaterThan'
import { validatorNotGreaterThanForest } from './validatorNotGreaterThanForest'
import { validatorNotGreaterThanForestOrMaxForest } from './validatorNotGreaterThanForestOrMaxForest'
import { validatorNotGreaterThanLandArea } from './validatorNotGreaterThanLandArea'
import { validatorNotGreaterThanLandAreaOrMaxLandArea } from './validatorNotGreaterThanLandAreaOrMaxLandArea'
import { validatorNotGreaterThanMaxForest } from './validatorNotGreaterThanMaxForest'
import { validatorOtherLand } from './validatorOtherLand'
import { validatorOtherLandWithTreeCoverTotal } from './validatorOtherLandWithTreeCoverTotal'
import { validatorPlantationForestIntroduced } from './validatorPlantationForestIntroduced'
import { validatorPrimaryForest } from './validatorPrimaryForest'
import { validatorPrivateOwnership } from './validatorPrivateOwnership'
import { validatorRemainingLandWithTreeCoverTotal } from './validatorRemainingLandWithTreeCoverTotal'
import { validatorSubCategory } from './validatorSubCategory'
import { validatorSumNotGreaterThan } from './validatorSumNotGreaterThan'
import { validatorSumNotGreaterThanForest } from './validatorSumNotGreaterThanForest'
import { validatorTotalForest } from './validatorTotalForest'

export const functions: Array<ExpressionFunction<Context>> = [
  validatorNotGreaterThanLandAreaOrMaxLandArea,
  NWFPProductHasCategory,
  maxForestArea,
  maxLandArea,
  validatorColSumNotGreaterThanForest,
  validatorEqualToForestExpansion,
  validatorEqualToPlantedForest,
  validatorEqualToSum,
  validatorEqualToTotalForest,
  validatorEqualToTotalGrowingStock,
  validatorForestAreaComparedTo2015,
  validatorForestAreaComparedTo2020,
  validatorForestAreaNetChange,
  validatorGreaterThanOrZero,
  validatorIsYear,
  validatorNextCountryReportYear,
  validatorNotGreaterThan,
  validatorNotGreaterThanForest,
  validatorNotGreaterThanForestOrMaxForest,
  validatorNotGreaterThanLandArea,
  validatorOtherLand,
  validatorOtherLandWithTreeCoverTotal,
  validatorPlantationForestIntroduced,
  validatorPrimaryForest,
  validatorPrivateOwnership,
  validatorRemainingLandWithTreeCoverTotal,
  validatorSubCategory,
  validatorSumNotGreaterThan,
  validatorSumNotGreaterThanForest,
  validatorTotalForest,
  validatorNotGreaterThanMaxForest,
]
