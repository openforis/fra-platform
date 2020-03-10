import axios from 'axios'

import * as AppState from '@webapp/app/appState'

export const assessmentSectionDataUpdate = 'assessment/section/data/update'

export const fetchTableData = (assessmentType, sectionName, tableName) => async (dispatch, getState) => {
  const countryIso = AppState.getCountryIso(getState())
  const { data } = await axios.get(`/api/traditionalTable/${countryIso}/${tableName}`)

  dispatch({ type: assessmentSectionDataUpdate, assessmentType, sectionName, tableName, data })
}
