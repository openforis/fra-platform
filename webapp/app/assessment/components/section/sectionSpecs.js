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
// 2
import growingStock from '@webapp/app/assessment/fra/sections/growingStock/sectionSpec'
import growingStockComposition from '@webapp/app/assessment/fra/sections/growingStockComposition/sectionSpec'
import biomassStock from '@webapp/app/assessment/fra/sections/biomassStock/sectionSpec'
import carbonStock from '@webapp/app/assessment/fra/sections/carbonStock/sectionSpec'
// 3
import designatedManagementObjective from '@webapp/app/assessment/fra/sections/designatedManagementObjective/sectionSpec'
import forestAreaWithinProtectedAreas from '@webapp/app/assessment/fra/sections/forestAreaWithinProtectedAreas/sectionSpec'
// 4
// 5
// 6
// 7
import nonWoodForestProductsRemovals from '@webapp/app/assessment/fra/sections/nonWoodForestProductsRemovals/sectionSpec'
// 8

export default {
  [FRA.type]: {
    // 0
    [contactPersons.sectionName]: contactPersons,
    // 1
    [extentOfForest.sectionName]: extentOfForest,
    [forestCharacteristics.sectionName]: forestCharacteristics,
    [forestAreaChange.sectionName]: forestAreaChange,
    // 2
    [growingStock.sectionName]: growingStock,
    [growingStockComposition.sectionName]: growingStockComposition,
    [biomassStock.sectionName]: biomassStock,
    [carbonStock.sectionName]: carbonStock,
    // 3
    [designatedManagementObjective.sectionName]: designatedManagementObjective,
    [forestAreaWithinProtectedAreas.sectionName]: forestAreaWithinProtectedAreas,
    // 4
    // 5
    // 6
    // 7
    [nonWoodForestProductsRemovals.sectionName]: nonWoodForestProductsRemovals,
    // 8
  },
}
