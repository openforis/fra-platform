import { diffDataSources } from 'tools/migrations/steps/steps/step-update-activity-log-2025-odp/diff/diffDataSources'
import { diffDescription } from 'tools/migrations/steps/steps/step-update-activity-log-2025-odp/diff/diffDescription'
import { diffNationalClasses } from 'tools/migrations/steps/steps/step-update-activity-log-2025-odp/diff/diffNationalClasses'
import { diffOriginalData } from 'tools/migrations/steps/steps/step-update-activity-log-2025-odp/diff/diffOriginalData'
import { diffYear } from 'tools/migrations/steps/steps/step-update-activity-log-2025-odp/diff/diffYear'
import { migrationError } from 'tools/migrations/steps/steps/step-update-activity-log-2025-odp/diff/migrationError'
import { odpAreEqual } from 'tools/migrations/steps/steps/step-update-activity-log-2025-odp/diff/odpAreEqual'

import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

export const getDiff = (odpA: OriginalDataPoint, odpB: OriginalDataPoint) => {
  return (
    diffYear(odpA, odpB) ||
    diffDescription(odpA, odpB) ||
    diffDataSources(odpA, odpB) ||
    diffOriginalData(odpA, odpB) ||
    diffNationalClasses(odpA, odpB) ||
    odpAreEqual(odpA, odpB) ||
    migrationError(odpA, odpB)
  )
}
