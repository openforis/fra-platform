import { createAction } from '@reduxjs/toolkit'

import { CountryIso } from 'meta/area'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'

import { RecordTableValidationsState } from 'client/store/data/tableData/validations/state'

type Payload = {
  assessmentName: AssessmentName
  cycleName: CycleName
  countryIso: CountryIso
  tableValidations: RecordTableValidationsState
}

export const setNodeValueValidations = createAction<Payload>('tableData/validations/set')
