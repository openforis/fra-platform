import axios from 'axios'
import * as R from 'ramda'
import { batch } from 'react-redux'

import * as autosave from '@webapp/app/components/autosave/actions'

import * as AppState from '@webapp/app/appState'
import * as AssessmentState from '@webapp/app/assessment/assessmentState'

export const assessmentSectionDataUpdate = 'assessment/section/data/update'
export const assessmentSectionDataGeneratingValuesUpdate = 'assessment/section/data/generatingValues/update'

export const updateTableData = (assessmentType, sectionName, tableName, data) => ({
  type: assessmentSectionDataUpdate,
  assessmentType,
  sectionName,
  tableName,
  data,
})

// ====== READ

export const fetchTableData = (assessmentType, sectionName, tableName, odp = false) => async (dispatch, getState) => {
  const countryIso = AppState.getCountryIso(getState())
  const url = odp ? `/api/nde/${tableName}/${countryIso}` : `/api/traditionalTable/${countryIso}/${tableName}`
  const { data } = await axios.get(url)

  dispatch(updateTableData(assessmentType, sectionName, tableName, data))
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

export const updateTableDataCell = (assessmentType, sectionName, tableName, rowIdx, colIdx, value) => async (
  dispatch,
  getState
) => {
  dispatch(autosave.start)

  const data = R.pipe(
    AssessmentState.getSectionData(assessmentType, sectionName, tableName),
    R.assocPath([rowIdx, colIdx], value)
  )(getState())

  dispatch(updateTableData(assessmentType, sectionName, tableName, data))
  dispatch(_postTableData(tableName, data))
}

export const generateTableData = (assessmentType, sectionName, tableName, method, fields, changeRates) => async (
  dispatch,
  getState
) => {
  const countryIso = AppState.getCountryIso(getState())

  batch(() => {
    dispatch({
      type: assessmentSectionDataGeneratingValuesUpdate,
      assessmentType,
      sectionName,
      tableName,
      generating: true,
    })
    dispatch(autosave.start)
  })

  await axios.post(`/api/nde/${sectionName}/generateFraValues/${countryIso}`, { method, fields, changeRates })

  batch(() => {
    dispatch(fetchTableData(assessmentType, sectionName, tableName, true))
    dispatch({
      type: assessmentSectionDataGeneratingValuesUpdate,
      assessmentType,
      sectionName,
      tableName,
      generating: false,
    })
    dispatch(autosave.complete)
  })
}
