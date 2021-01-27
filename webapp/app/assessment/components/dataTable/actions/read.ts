import axios from 'axios'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as FRA from '@common/assessment/fra'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'
import * as AppState from '@webapp/store/app/state'

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

export const fetchTableData = (assessmentType: any, sectionName: any, tableName: any) => async (
  dispatch: any,
  getState: any
) => {
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
