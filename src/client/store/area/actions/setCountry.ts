import { createAction } from '@reduxjs/toolkit'

import { Country } from 'meta/area'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'

type Params = {
  assessmentName: AssessmentName
  cycleName: CycleName
  country: Country
}

export const setCountry = createAction<Params>('area/country/set')
