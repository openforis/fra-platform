import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'

import { Context } from '../context'
import { validatorSumSubCategoriesNotEqualToParent } from './subcategories/validatorSumSubCategoriesNotEqualToParent'
import { validatorSumSubCategoriesNotGreaterThanParent } from './subcategories/validatorSumSubCategoriesNotGreaterThanParent'
import { maxForestArea } from './maxForestArea'
import { maxLandArea } from './maxLandArea'
import { NWFPProductHasCategory } from './NWFPProductHasCategory'
import { validatorColSumNotGreaterThanForest } from './validatorColSumNotGreaterThanForest'
import { validatorEqualToForestExpansion } from './validatorEqualToForestExpansion'
import { validatorEqualToPlantedForest } from './validatorEqualToPlantedForest'
import { validatorEqualToPreviousCycleForestArea } from './validatorEqualToPreviousCycleForestArea'
import { validatorEqualToPrimaryForest } from './validatorEqualToPrimaryForest'
import { validatorEqualToSum } from './validatorEqualToSum'
import { validatorEqualToTotalForest } from './validatorEqualToTotalForest'
import { validatorEqualToTotalGrowingStock } from './validatorEqualToTotalGrowingStock'
import { validatorForestAreaComparedTo2015 } from './validatorForestAreaComparedTo2015'
import { validatorForestAreaComparedTo2020 } from './validatorForestAreaComparedTo2020'
import { validatorForestAreaNetChange } from './validatorForestAreaNetChange'
import { validatorGreaterThanOrZero } from './validatorGreaterThanOrZero'
import { validatorIsYear } from './validatorIsYear'
import { validatorNextCountryReportYear } from './validatorNextCountryReportYear'
import { validatorNotEmpty } from './validatorNotEmpty'
import { validatorNotGreaterThan } from './validatorNotGreaterThan'
import { validatorNotGreaterThanForest } from './validatorNotGreaterThanForest'
import { validatorNotGreaterThanForestOrMaxForest } from './validatorNotGreaterThanForestOrMaxForest'
import { validatorNotGreaterThanLandArea } from './validatorNotGreaterThanLandArea'
import { validatorNotGreaterThanLandAreaOrMaxLandArea } from './validatorNotGreaterThanLandAreaOrMaxLandArea'
import { validatorNotGreaterThanMaxForest } from './validatorNotGreaterThanMaxForest'
import { validatorNWFPProductAndCategory } from './validatorNWFPProductAndCategory'
import { validatorOtherLand } from './validatorOtherLand'
import { validatorOtherLandWithTreeCoverTotal } from './validatorOtherLandWithTreeCoverTotal'
import { validatorPlantationForestIntroduced } from './validatorPlantationForestIntroduced'
import { validatorPrimaryForest } from './validatorPrimaryForest'
import { validatorPrivateOwnership } from './validatorPrivateOwnership'
import { validatorRemainingLandWithTreeCoverTotal } from './validatorRemainingLandWithTreeCoverTotal'
import { validatorSubCategory } from './validatorSubCategory'
import { validatorSumEqualTo } from './validatorSumEqualTo'
import { validatorSumNotGreaterThan } from './validatorSumNotGreaterThan'
import { validatorSumNotGreaterThanForest } from './validatorSumNotGreaterThanForest'
import { validatorTotalForest } from './validatorTotalForest'

export const functions: Array<ExpressionFunction<Context>> = [
  NWFPProductHasCategory,
  maxForestArea,
  maxLandArea,
  validatorColSumNotGreaterThanForest,
  validatorEqualToForestExpansion,
  validatorEqualToPlantedForest,
  validatorEqualToPreviousCycleForestArea,
  validatorEqualToPrimaryForest,
  validatorEqualToSum,
  validatorEqualToTotalForest,
  validatorEqualToTotalGrowingStock,
  validatorForestAreaComparedTo2015,
  validatorForestAreaComparedTo2020,
  validatorForestAreaNetChange,
  validatorGreaterThanOrZero,
  validatorIsYear,
  validatorNWFPProductAndCategory,
  validatorNextCountryReportYear,
  validatorNotEmpty,
  validatorNotGreaterThan,
  validatorNotGreaterThanForest,
  validatorNotGreaterThanForestOrMaxForest,
  validatorNotGreaterThanLandArea,
  validatorNotGreaterThanLandAreaOrMaxLandArea,
  validatorNotGreaterThanMaxForest,
  validatorOtherLand,
  validatorOtherLandWithTreeCoverTotal,
  validatorPlantationForestIntroduced,
  validatorPrimaryForest,
  validatorPrivateOwnership,
  validatorRemainingLandWithTreeCoverTotal,
  validatorSubCategory,
  validatorSumEqualTo,
  validatorSumNotGreaterThan,
  validatorSumNotGreaterThanForest,
  validatorSumSubCategoriesNotEqualToParent,
  validatorSumSubCategoriesNotGreaterThanParent,
  validatorTotalForest,
]
