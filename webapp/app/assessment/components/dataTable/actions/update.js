import axios from 'axios'
import * as R from 'ramda'
import * as FRAUtils from '@common/fraUtils'

import { batchActions } from '@webapp/main/reduxBatch'
import * as autosave from '@webapp/app/components/autosave/actions'

import * as AppState from '@webapp/app/appState'
import * as AssessmentState from '@webapp/app/assessment/assessmentState'

export const assessmentSectionDataUpdate = 'assessment/section/data/update'

export const updateTableData = ({ assessmentType, sectionName, tableName, data, autoSaveStart, autoSaveComplete }) => (
  dispatch
) => {
  const actions = [
    {
      type: assessmentSectionDataUpdate,
      assessmentType,
      sectionName,
      tableName,
      data,
    },
  ]

  if (autoSaveStart) actions.push(autosave.start)
  if (autoSaveComplete) actions.push(autosave.complete)

  dispatch(batchActions(actions))
}

export const postTableData = (tableName, data, url = null) => {
  const debounced = async (dispatch, getState) => {
    const urlPost = url || `/api/traditionalTable/${AppState.getCountryIso(getState())}/${tableName}`
    await axios.post(urlPost, data)
    dispatch(autosave.complete)
  }

  debounced.meta = {
    debounce: {
      time: 800,
      key: `${assessmentSectionDataUpdate}/${tableName}`,
    },
  }

  return debounced
}

export const updateTableDataCell = (assessmentType, sectionName, tableName, rowIdx, colIdx, value) => async (
  dispatch,
  getState
) => {
  const state = getState()
  const data = R.pipe(
    AssessmentState.getSectionData(assessmentType, sectionName, tableName),
    R.assocPath([rowIdx, colIdx], value)
  )(state)

  dispatch(updateTableData({ assessmentType, sectionName, tableName, data, autoSaveStart: true }))
  dispatch(postTableData(tableName, data))
}

export const updateTableWithOdpCell = (assessmentType, sectionName, tableName, datum) => (dispatch, getState) => {
  const state = getState()

  const fra = R.pipe(
    AssessmentState.getFra(assessmentType, sectionName, tableName),
    FRAUtils.updateTableWithOdpDatum(datum)
  )(state)
  const fraNoNdps = R.pipe(
    AssessmentState.getFraNoNDPs(assessmentType, sectionName, tableName),
    FRAUtils.updateTableWithOdpDatum(datum)
  )(state)

  const data = {
    [AssessmentState.keysDataTableWithOdp.fra]: fra,
    [AssessmentState.keysDataTableWithOdp.fraNoNDPs]: fraNoNdps,
  }
  const countryIso = AppState.getCountryIso(state)

  dispatch(updateTableData({ assessmentType, sectionName, tableName, data, autoSaveStart: true }))
  dispatch(postTableData(sectionName, datum, `/api/nde/${tableName}/country/${countryIso}/${datum.name}`))
}
