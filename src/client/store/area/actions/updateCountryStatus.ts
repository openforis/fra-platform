import { createAction } from '@reduxjs/toolkit'

import { CountryIso, CountryStatus } from 'meta/area'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'

type Params = {
  assessmentName: AssessmentName
  countryIso: CountryIso
  cycleName: CycleName
  status: CountryStatus
}

export const updateCountryStatus = createAction<Params>('area/updateCountryStatus')
