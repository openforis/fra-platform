/**
 * This file contains all section specs for all assessments
 */

import * as FRA from '@common/assessment/fra'

// ======= FRA section specs
// 1
import extentOfForest from '@webapp/app/assessment/fra/sections/extentOfForest/sectionSpec'
// 3
import designatedManagementObjective from '@webapp/app/assessment/fra/sections/designatedManagementObjective/sectionSpec'

export default {
  [FRA.type]: {
    // 1
    [extentOfForest.sectionName]: extentOfForest,
    // 3
    [designatedManagementObjective.sectionName]: designatedManagementObjective,
  },
}
