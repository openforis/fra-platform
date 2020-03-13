import * as R from 'ramda'

import * as FRA from '@common/assessment/fra'
import * as ExtentOfForestState from '@webapp/app/assessment/fra/sections/extentOfForest/extentOfForestState'

import { assessmentSectionDataUpdate } from '@webapp/app/assessment/components/dataTable/actions'

const assessmentType = FRA.type
const section = FRA.sections['1'].children.a
const sectionName = section.name
const tableName = section.tables.extentOfForest

export const toggleOdps = show => (dispatch, getState) => {
  const data = R.pipe(ExtentOfForestState.getSectionData, R.assoc(ExtentOfForestState.keys.showOdps, show))(getState())

  dispatch({ type: assessmentSectionDataUpdate, assessmentType, sectionName, tableName, data })
}
