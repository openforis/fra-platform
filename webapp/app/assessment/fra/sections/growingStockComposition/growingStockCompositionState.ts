// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'

// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as NumberUtils from '@common/bignumberUtils'

// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as FRA from '@common/assessment/fra'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as FRAUtils from '@common/fraUtils'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'

const section = FRA.sections['2'].children.b

export const rowIndexes = {
  native: R.range(0, 10),
  introduced: R.range(13, 18),
}

export const getTotalNativeTreeSpecies = (colIdx: any) =>
  R.pipe(
    AssessmentState.getSectionData(FRA.type, section.name, section.tables.growingStockComposition),
    FRAUtils.sumTableColumn(colIdx, [...rowIndexes.native, 10])
  )

export const getTotalIntroducedTreeSpecies = (colIdx: any) =>
  R.pipe(
    AssessmentState.getSectionData(FRA.type, section.name, section.tables.growingStockComposition),
    FRAUtils.sumTableColumn(colIdx, [...rowIndexes.introduced, 18])
  )

export const getTotalGrowingStock = (colIdx: any) => (state: any) => {
  const totalNative = getTotalNativeTreeSpecies(colIdx)(state)
  const totalIntroduced = getTotalIntroducedTreeSpecies(colIdx)(state)
  return NumberUtils.sum([totalNative, totalIntroduced])
}
