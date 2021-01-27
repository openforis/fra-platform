import axios from 'axios'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'

// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as FRA from '@common/assessment/fra'

import * as GrowingStockState from '@webapp/app/assessment/fra/sections/growingStock/growingStockState'

import { applicationError } from '@webapp/components/error/actions'

const section = FRA.sections['2'].children.a

export const growingStockFetchCompleted = 'growingStock/fetch/completed'
export const growingStockChanged = 'growingStock/changed'

/**
 * @deprecated
 * used by content check view
 */
export const fetch = (countryIso: any) => (dispatch: any) =>
  axios
    .get(`/api/growingStock/${countryIso}`)
    .then((resp) => dispatch({ type: growingStockFetchCompleted, data: resp.data }))
    .catch((err) => dispatch(applicationError(err)))

// ====== Update

const updateGrowingStockCells = ({ year, variableName, avgValue, totalValue }: any) =>
  R.pipe(
    R.assocPath([section.tables.avgTable, year, variableName], avgValue),
    R.assocPath([section.tables.totalTable, year, variableName], totalValue)
  )

export const updateGrowingStockAvgCell = ({ state, datum, variableName }: any) => (data: any) => {
  const { year } = datum
  const avgValue = datum[variableName]
  const totalValue = GrowingStockState.calculateTotalValue(year, variableName, avgValue)(state)

  return updateGrowingStockCells({ year, variableName, avgValue, totalValue })(data)
}

export const updateGrowingStockTotalCell = ({ state, datum, variableName }: any) => (data: any) => {
  const { year } = datum
  const totalValue = datum[variableName]
  const avgValue = GrowingStockState.calculateAvgValue(year, variableName, totalValue)(state)

  return updateGrowingStockCells({ year, variableName, avgValue, totalValue })(data)
}
