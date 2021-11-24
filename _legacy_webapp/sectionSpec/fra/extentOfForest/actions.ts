import { FRA } from '@core/assessment'

import * as ExtentOfForestState from '../../../sectionSpec/fra/extentOfForest/extentOfForestState'

import { updateSectionProp } from '../../../app/assessment/actions'
import { fetchTableData } from '../../../components/Assessment/DataTable/actions'

const assessmentType = FRA.type
const section = FRA.sections['1'].children.a
const sectionName = section.name

export const toggleOdps = (show: any) => (dispatch: any) =>
  dispatch(updateSectionProp(assessmentType, sectionName, ExtentOfForestState.keys.showOdps, show))

export const fetchExtentOfForest = () => (dispatch: any) =>
  dispatch(fetchTableData(assessmentType, sectionName, section.tables.extentOfForest))
