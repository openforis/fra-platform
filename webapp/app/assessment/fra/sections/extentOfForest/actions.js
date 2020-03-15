import * as FRA from '@common/assessment/fra'

import * as ExtentOfForestState from '@webapp/app/assessment/fra/sections/extentOfForest/extentOfForestState'

import { updateSectionProp } from '@webapp/app/assessment/actions'

const assessmentType = FRA.type
const section = FRA.sections['1'].children.a
const sectionName = section.name

export const toggleOdps = show => dispatch =>
  dispatch(updateSectionProp(assessmentType, sectionName, ExtentOfForestState.keys.showOdps, show))
