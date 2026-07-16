import { createAction } from '@reduxjs/toolkit'

import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { UUID } from 'meta/uuid/uuid'

type Payload = {
  assessmentName: AssessmentName
  countryIso: CountryIso
  cycleName: CycleName
  uuid: UUID
}

export const deleteNationalDataPointValidation = createAction<Payload>('validations/nationalDataPoints/delete')
