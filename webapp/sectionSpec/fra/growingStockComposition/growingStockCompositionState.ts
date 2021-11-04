import * as R from 'ramda'

import { Numbers } from '@core/utils/numbers'
import { FRA } from '@core/assessment'
import FRAUtils from '@common/fraUtils'

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
  return Numbers.sum([totalNative, totalIntroduced])
}
