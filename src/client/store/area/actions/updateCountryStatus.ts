import { createAction } from '@reduxjs/toolkit'

import { AssessmentStatus, CountryIso } from 'meta/area'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'

type Params = {
  assessmentName: AssessmentName
  countryIso: CountryIso
  cycleName: CycleName
  status: AssessmentStatus
}

export const updateCountryStatus = createAction<Params>('area/updateCountryStatus')
