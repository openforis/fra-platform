import axios from 'axios'
import * as R from 'ramda'

import { FRA } from '@core/assessment'

import * as GrowingStockState from '@webapp/app/assessment/fra/sections/growingStock/growingStockState'

import { applicationError } from '@webapp/components/error/actions'
import { ApiEndPoint } from '@common/api/endpoint'

const section = FRA.sections['2'].children.a

export const growingStockFetchCompleted = 'growingStock/fetch/completed'
export const growingStockChanged = 'growingStock/changed'

/**
 * @deprecated
 * used by content check view
 */
export const fetch = (countryIso: string) => (dispatch: any) =>
  axios
    .get(ApiEndPoint.GrowingStock.get(countryIso))
    .then((resp) => dispatch({ type: growingStockFetchCompleted, data: resp.data }))
    .catch((err) => dispatch(applicationError(err)))

// ====== Update

const updateGrowingStockCells = ({ year, variableName, avgValue, totalValue }: any) =>
  R.pipe(
    R.assocPath([section.tables.avgTable, year, variableName], avgValue),
    R.assocPath([section.tables.totalTable, year, variableName], totalValue)
  )

export const updateGrowingStockAvgCell =
  ({ state, datum, variableName }: any) =>
  (data: any) => {
    const { year } = datum
    const avgValue = datum[variableName]
    const totalValue = GrowingStockState.calculateTotalValue(year, variableName, avgValue)(state)

    return updateGrowingStockCells({ year, variableName, avgValue, totalValue })(data)
  }

export const updateGrowingStockTotalCell =
  ({ state, datum, variableName }: any) =>
  (data: any) => {
    const { year } = datum
    const totalValue = datum[variableName]
    const avgValue = GrowingStockState.calculateAvgValue(year, variableName, totalValue)(state)

    return updateGrowingStockCells({ year, variableName, avgValue, totalValue })(data)
  }
