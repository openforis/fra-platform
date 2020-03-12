import axios from 'axios'
import * as R from 'ramda'

import * as autosave from '@webapp/app/components/autosave/actions'

import * as AppState from '@webapp/app/appState'
import * as AssessmentState from '@webapp/app/assessment/assessmentState'

export const assessmentSectionDataUpdate = 'assessment/section/data/update'

// ====== READ

export const fetchTableData = (assessmentType, sectionName, tableName, odp = false) => async (dispatch, getState) => {
  const countryIso = AppState.getCountryIso(getState())
  const url = odp ? `/api/nde/${tableName}/${countryIso}` : `/api/traditionalTable/${countryIso}/${tableName}`
  const { data } = await axios.get(url)

  dispatch({ type: assessmentSectionDataUpdate, assessmentType, sectionName, tableName, data })
}

// ====== UPDATE

const _postTableData = (tableName, data) => {
  const debounced = async (dispatch, getState) => {
    const countryIso = AppState.getCountryIso(getState())
    await axios.post(`/api/traditionalTable/${countryIso}/${tableName}`, data)
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

export const updateTableData = (assessmentType, sectionName, tableName, rowIdx, colIdx, value) => async (
  dispatch,
  getState
) => {
  dispatch(autosave.start)

  const data = R.pipe(
    AssessmentState.getSectionData(assessmentType, sectionName, tableName),
    R.assocPath([rowIdx, colIdx], value)
  )(getState())

  dispatch({ type: assessmentSectionDataUpdate, assessmentType, sectionName, tableName, data })
  dispatch(_postTableData(tableName, data))
}
