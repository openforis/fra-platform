import { createAction } from '@reduxjs/toolkit'

import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { UUID } from 'meta/uuid/uuid'

type Payload = {
  assessmentName: AssessmentName
  cycleName: CycleName
  countryIso: CountryIso
  uuid: UUID
}

export const deleteNationalDataPointValidation = createAction<Payload>(
  'tableData/validations/nationalDataPoints/delete'
)
