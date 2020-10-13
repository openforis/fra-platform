import axios from 'axios'
import * as R from 'ramda'

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
export const fetch = (countryIso) => (dispatch) =>
  axios
    .get(`/api/growingStock/${countryIso}`)
    .then((resp) => dispatch({ type: growingStockFetchCompleted, data: resp.data }))
    .catch((err) => dispatch(applicationError(err)))

// ====== Update

const updateGrowingStockCells = ({ year, variableName, avgValue, totalValue }) =>
  R.pipe(
    R.assocPath([section.tables.avgTable, year, variableName], avgValue),
    R.assocPath([section.tables.totalTable, year, variableName], totalValue)
  )

export const updateGrowingStockAvgCell = ({ state, datum, variableName }) => (data) => {
  const { year } = datum
  const avgValue = datum[variableName]
  const totalValue = GrowingStockState.calculateTotalValue(year, variableName, avgValue)(state)

  return updateGrowingStockCells({ year, variableName, avgValue, totalValue })(data)
}

export const updateGrowingStockTotalCell = ({ state, datum, variableName }) => (data) => {
  const { year } = datum
  const totalValue = datum[variableName]
  const avgValue = GrowingStockState.calculateAvgValue(year, variableName, totalValue)(state)

  return updateGrowingStockCells({ year, variableName, avgValue, totalValue })(data)
}
