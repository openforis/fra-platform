import axios from 'axios'
import R from 'ramda'
import { applicationError } from '../../applicationError/actions'
import * as autosave from '../../autosave/actions'

import { acceptNextDecimal } from '../../utils/numberInput'
import { calculateTotalValue, calculateAvgValue } from './growingStock'

export const growingStockFetchCompleted = 'growingStock/fetch/completed'
export const growingStockChanged = 'growingStock/changed'

const pasteYearMapping = {
  0: '1990',
  1: '2000',
  2: '2010',
  3: '2015',
  4: '2016',
  5: '2017',
  6: '2018',
  7: '2019',
  8: '2020'
}

const pasteRowMapping = {
  0: 'naturallyRegeneratingForest',
  1: 'plantedForest',
  2: 'plantationForest',
  3: 'otherPlantedForest',
  4: 'forest',
  5: 'otherWoodedLand'
}

const yearToColumn = R.invertObj(pasteYearMapping)
const rowToIndex = R.invertObj(pasteRowMapping)

const updateAvg = (growingStockState, year, row, newValue) => {
  const currentValue = R.path(['avgTable', year, row], growingStockState)
  const sanitizedValue = acceptNextDecimal(newValue, currentValue)
  const calculatedValue = calculateTotalValue(growingStockState, year, row, sanitizedValue)
  const updatedValue = R.pipe(
    R.assocPath(['avgTable', year, row], sanitizedValue),
    R.assocPath(['totalTable', year, row], calculatedValue)
  )(growingStockState)
  return updatedValue
}

const updateTotal = (growingStockState, year, row, newValue) => {
  const currentValue = R.path(['totalTableTable', year, row], growingStockState)
  const sanitizedValue = acceptNextDecimal(newValue, currentValue)

  const calculatedValue = calculateAvgValue(growingStockState, year, row, sanitizedValue)

  const updatedValue = R.pipe(
    R.assocPath(['avgTable', year, row], calculatedValue),
    R.assocPath(['totalTable', year, row], sanitizedValue)
  )(growingStockState)
  return updatedValue
}

const updatePasteData = (growingStockState, year, row, pastedData, malvFunc) => {
  const colOffset = Number(yearToColumn[year])
  const rowOffset = Number(rowToIndex[row])
  const handleRow = (pastedRowIndex, pastedRow, result) =>
    R.reduce(
      (accu, pastedColumnValue) => {
        const yearToUpdate = pasteYearMapping[accu.colIndex + colOffset]
        const rowToUpdate = pasteRowMapping[pastedRowIndex + rowOffset]
        if (R.isNil(yearToUpdate) || R.isNil(rowToUpdate)) return accu
        return {
          result: malvFunc(accu.result, yearToUpdate, rowToUpdate, pastedColumnValue),
          colIndex: accu.colIndex + 1
        }
      },
      {result: result, colIndex: 0},
      pastedRow).result

  const updatedGrowingStock =
    R.reduce(
      (accu, pastedRow) =>
        ({
          result: handleRow(accu.pastedRowIndex, pastedRow, accu.result),
          pastedRowIndex: accu.pastedRowIndex + 1
        }),
      {result: growingStockState, pastedRowIndex: 0},
      pastedData
    ).result

  return updatedGrowingStock
}

export const fetch = (countryIso) => dispatch =>
  axios
    .get(`/api/growingStock/${countryIso}`)
    .then(resp => dispatch({type: growingStockFetchCompleted, data: resp.data}))
    .catch(err => dispatch(applicationError(err)))

export const changeAvgValue = (countryIso, year, row, newValue) => (dispatch, getState) => {
  const growingStockState = getState().growingStock
  const updatedValue = updateAvg(growingStockState, year, row, newValue)
  dispatch(autosave.start)
  dispatch({type: growingStockChanged, data: updatedValue})
  dispatch(persistValues(countryIso, updatedValue))
}

export const changeTotalValue = (countryIso, year, row, newValue) => (dispatch, getState) => {
  const growingStockState = getState().growingStock
  const updatedValue = updateTotal(growingStockState, year, row, newValue)
  dispatch(autosave.start)
  dispatch({type: growingStockChanged, data: updatedValue})
  dispatch(persistValues(countryIso, updatedValue))
}

export const pasteAvgValue = (countryIso, year, row, pastedData) => (dispatch, getState) => {
  const growingStockState = getState().growingStock
  const updatedValues = updatePasteData(growingStockState, year, row, pastedData, updateAvg)
  dispatch(autosave.start)
  dispatch({type: growingStockChanged, data: updatedValues})
  dispatch(persistValues(countryIso, updatedValues))
}

export const pasteTotalValue = (countryIso, year, row, pastedData) => (dispatch, getState) => {
  const growingStockState = getState().growingStock
  const updatedValues = updatePasteData(growingStockState, year, row, pastedData, updateTotal)
  dispatch(autosave.start)
  dispatch({type: growingStockChanged, data: updatedValues})
  dispatch(persistValues(countryIso, updatedValues))
}

export const persistValues = (countryIso, values) => {
  const dispatched = dispatch => {
    axios
      .post(`/api/growingStock/${countryIso}`, values)
      .then(() => dispatch(autosave.complete))
      .catch(err => dispatch(applicationError(err)))
  }

  dispatched.meta = {
    debounce: {
      time: 400,
      key: growingStockChanged
    }
  }
  return dispatched
}
