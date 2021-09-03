import axios from 'axios'
import * as R from 'ramda'
import { FRA } from '@core/assessment'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'

import { ApiEndPoint } from '@common/api/endpoint'
import { AppSelectors } from '@webapp/store/app/app.slice'
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

export const fetchTableData =
  (assessmentType: any, sectionName: any, tableName: any) => async (dispatch: any, getState: any) => {
    const state = getState()
    const dataLoaded = AssessmentState.isSectionDataLoaded(assessmentType, sectionName, tableName)(state)
    if (!dataLoaded) {
      const countryIso = AppSelectors.selectCountryIso(state)

      if (!R.isEmpty(tableName)) {
        let url = urlFetchData[tableName]
        url = url ? `${url}${countryIso}` : ApiEndPoint.DataTable.get(assessmentType, countryIso, tableName)

        const { data } = await axios.get(url)

        dispatch(updateTableData({ assessmentType, sectionName, tableName, data }))
      }
    }
  }
