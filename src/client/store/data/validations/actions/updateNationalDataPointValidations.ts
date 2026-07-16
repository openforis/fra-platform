import { createAction } from '@reduxjs/toolkit'

import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { RecordNDPValidations } from 'meta/assessment/validation/nationalDataPoint'

type Payload = {
  assessmentName: AssessmentName
  cycleName: CycleName
  countryIso: CountryIso
  validations: RecordNDPValidations
}

export const updateNationalDataPointValidations = createAction<Payload>('validations/nationalDataPoints/update')
