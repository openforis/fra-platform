import * as R from 'ramda'

import * as NumberFormat from '@common/numberFormat'

import * as FRA from '@common/assessment/fra'
import * as FRAUtils from '@common/fraUtils'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'

const section = FRA.sections['2'].children.b

export const rowIndexes = {
  native: R.range(0, 10),
}

export const getTotalNativeTreeSpecies = colIdx =>
  R.pipe(
    AssessmentState.getSectionData(FRA.type, section.name, section.tables.growingStockComposition),
    FRAUtils.sumTableColumn(colIdx, [...rowIndexes.native, 10]),
    NumberFormat.formatDecimal
  )
