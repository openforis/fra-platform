/**
 * This file contains all section specs for all assessments
 */

import * as FRA from '@common/assessment/fra'

// ======= FRA section specs
// 0
import contactPersons from '@webapp/app/assessment/fra/sections/contactPersons/sectionSpec'
// 1
import extentOfForest from '@webapp/app/assessment/fra/sections/extentOfForest/sectionSpec'
import forestCharacteristics from '@webapp/app/assessment/fra/sections/forestCharacteristics/sectionSpec'
import forestAreaChange from '@webapp/app/assessment/fra/sections/forestAreaChange/sectionSpec'
import annualReforestation from '@webapp/app/assessment/fra/sections/annualReforestation/sectionSpec'
import specificForestCategories from '@webapp/app/assessment/fra/sections/specificForestCategories/sectionSpec'
// 2
import growingStock from '@webapp/app/assessment/fra/sections/growingStock/sectionSpec'
import growingStockComposition from '@webapp/app/assessment/fra/sections/growingStockComposition/sectionSpec'
import biomassStock from '@webapp/app/assessment/fra/sections/biomassStock/sectionSpec'
import carbonStock from '@webapp/app/assessment/fra/sections/carbonStock/sectionSpec'
// 3
import designatedManagementObjective from '@webapp/app/assessment/fra/sections/designatedManagementObjective/sectionSpec'
import forestAreaWithinProtectedAreas from '@webapp/app/assessment/fra/sections/forestAreaWithinProtectedAreas/sectionSpec'
// 4
import forestOwnership from '@webapp/app/assessment/fra/sections/forestOwnership/sectionSpec'
import holderOfManagementRights from '@webapp/app/assessment/fra/sections/holderOfManagementRights/sectionSpec'
// 5
import disturbances from '@webapp/app/assessment/fra/sections/disturbances/sectionSpec'
import areaAffectedByFire from '@webapp/app/assessment/fra/sections/areaAffectedByFire/sectionSpec'
import degradedForest from '@webapp/app/assessment/fra/sections/degradedForest/sectionSpec'
// 6
import forestPolicy from '@webapp/app/assessment/fra/sections/forestPolicy/sectionSpec'
import areaOfPermanentForestEstate from '@webapp/app/assessment/fra/sections/areaOfPermanentForestEstate/sectionSpec'
// 7
import employment from '@webapp/app/assessment/fra/sections/employment/sectionSpec'
import graduationOfStudents from '@webapp/app/assessment/fra/sections/graduationOfStudents/sectionSpec'
import nonWoodForestProductsRemovals from '@webapp/app/assessment/fra/sections/nonWoodForestProductsRemovals/sectionSpec'
// 8
import sustainableDevelopment from '@webapp/app/assessment/fra/sections/sustainableDevelopment/sectionSpec'

export default {
  [FRA.type]: {
    // 0
    [contactPersons.sectionName]: contactPersons,
    // 1
    [extentOfForest.sectionName]: extentOfForest,
    [forestCharacteristics.sectionName]: forestCharacteristics,
    [forestAreaChange.sectionName]: forestAreaChange,
    [annualReforestation.sectionName]: annualReforestation,
    [specificForestCategories.sectionName]: specificForestCategories,
    // 2
    [growingStock.sectionName]: growingStock,
    [growingStockComposition.sectionName]: growingStockComposition,
    [biomassStock.sectionName]: biomassStock,
    [carbonStock.sectionName]: carbonStock,
    // 3
    [designatedManagementObjective.sectionName]: designatedManagementObjective,
    [forestAreaWithinProtectedAreas.sectionName]: forestAreaWithinProtectedAreas,
    // 4
    [forestOwnership.sectionName]: forestOwnership,
    [holderOfManagementRights.sectionName]: holderOfManagementRights,
    // 5
    [disturbances.sectionName]: disturbances,
    [areaAffectedByFire.sectionName]: areaAffectedByFire,
    [degradedForest.sectionName]: degradedForest,
    // 6
    [forestPolicy.sectionName]: forestPolicy,
    [areaOfPermanentForestEstate.sectionName]: areaOfPermanentForestEstate,
    // 7
    [employment.sectionName]: employment,
    [graduationOfStudents.sectionName]: graduationOfStudents,
    [nonWoodForestProductsRemovals.sectionName]: nonWoodForestProductsRemovals,
    // 8
    [sustainableDevelopment.sectionName]: sustainableDevelopment,
  },
}
