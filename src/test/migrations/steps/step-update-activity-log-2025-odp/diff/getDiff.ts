import { OriginalDataPoint } from 'meta/assessment'

import { diffDataSources } from './diffDataSources'
import { diffDescription } from './diffDescription'
import { diffNationalClasses } from './diffNationalClasses'
import { diffOriginalData } from './diffOriginalData'
import { diffYear } from './diffYear'
import { migrationError } from './migrationError'
import { odpAreEqual } from './odpAreEqual'

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
