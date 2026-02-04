import { createAction } from '@reduxjs/toolkit'

import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'

type Props = {
  assessmentName: AssessmentName
  countryIso?: CountryIso
  cycleName: CycleName
  isVerificationInProgress: boolean
}

export const setIsVerificationInProgress = createAction<Props>('links/setIsVerificationInProgress')
