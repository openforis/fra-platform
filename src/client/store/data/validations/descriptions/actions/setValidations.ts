import { createAction } from '@reduxjs/toolkit'

import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { SectionName } from 'meta/assessment/section'
import { RecordDescriptionValidations } from 'meta/assessment/validation/description'

type Payload = {
  assessmentName: AssessmentName
  cycleName: CycleName
  countryIso: CountryIso
  descriptionValidations: RecordDescriptionValidations
  sectionNames?: Array<SectionName>
}

export const setValidations = createAction<Payload>('validations/descriptions/set')
