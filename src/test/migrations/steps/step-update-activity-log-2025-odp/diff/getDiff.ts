import { OriginalDataPoint } from 'meta/assessment'

import { diffDataSources } from 'test/migrations/steps/step-update-activity-log-2025-odp/diff/diffDataSources'
import { diffNationalClasses } from 'test/migrations/steps/step-update-activity-log-2025-odp/diff/diffNationalClasses'
import { diffOriginalData } from 'test/migrations/steps/step-update-activity-log-2025-odp/diff/diffOriginalData'
import { diffYear } from 'test/migrations/steps/step-update-activity-log-2025-odp/diff/diffYear'

export const getDiff = (odpA: OriginalDataPoint, odpB: OriginalDataPoint) => {
  return (
    diffYear(odpA, odpB) ||
    diffDataSources(odpA, odpB) ||
    diffOriginalData(odpA, odpB) ||
    diffNationalClasses(odpA, odpB)
  )
}
