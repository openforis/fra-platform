import { FRA } from '@core/assessment'

import * as ExtentOfForestState from '@webapp/app/assessment/fra/sections/extentOfForest/extentOfForestState'

import { updateSectionProp } from '@webapp/app/assessment/actions'
import { fetchTableData } from '@webapp/app/assessment/components/dataTable/actions'

const assessmentType = FRA.type
const section = FRA.sections['1'].children.a
const sectionName = section.name

export const toggleOdps = (show: any) => (dispatch: any) =>
  dispatch(updateSectionProp(assessmentType, sectionName, ExtentOfForestState.keys.showOdps, show))

export const fetchExtentOfForest = () => (dispatch: any) =>
  dispatch(fetchTableData(assessmentType, sectionName, section.tables.extentOfForest))
