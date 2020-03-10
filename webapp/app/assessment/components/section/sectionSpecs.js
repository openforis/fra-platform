/**
 * This file contains all section specs for all assessments
 */

import * as FRA from '@common/assessment/assessmentFra'

import designatedManagementObjective
  from '@webapp/app/assessment/fra/sections/designatedManagementObjective/sectionSpec'

export default {
  [FRA.type]: {
    // section 3
    [designatedManagementObjective.sectionName]: designatedManagementObjective
  }
}
