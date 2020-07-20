import axios from 'axios'
import * as R from 'ramda'
import * as FRA from '@common/assessment/fra'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'
import * as AppState from '@webapp/app/appState'

import { updateTableData } from './update'

const urlFetchData = {
  // 1a
  [FRA.sections['1'].children.a.tables
    .extentOfForest]: `/api/nde/${FRA.sections['1'].children.a.tables.extentOfForest}/`,
  // 1b
  [FRA.sections['1'].children.b.tables
    .forestCharacteristics]: `/api/nde/${FRA.sections['1'].children.b.tables.forestCharacteristics}/`,
  // 2a
  [FRA.sections['2'].children.a.name]: `/api/growingStock/`,
}

export const fetchTableData = (assessmentType, sectionName, tableName) => async (dispatch, getState) => {
  const state = getState()
  const dataLoaded = AssessmentState.isSectionDataLoaded(assessmentType, sectionName, tableName)(state)
  if (!dataLoaded) {
    const countryIso = AppState.getCountryIso(state)

    if (!R.isEmpty(tableName)) {
      let url = urlFetchData[tableName]
      url = url ? `${url}${countryIso}` : `/api/traditionalTable/${assessmentType}/${countryIso}/${tableName}`

      const { data } = await axios.get(url)

      dispatch(updateTableData({ assessmentType, sectionName, tableName, data }))
    }
  }
}
