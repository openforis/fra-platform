import { createAction } from '@reduxjs/toolkit'

import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { RecordTableValidationsState } from 'meta/assessment/validation/table'

type Payload = {
  assessmentName: AssessmentName
  cycleName: CycleName
  countryIso: CountryIso
  tableValidations: RecordTableValidationsState
}

export const setNodeValueValidations = createAction<Payload>('validations/tables/set')
