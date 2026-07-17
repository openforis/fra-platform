import { createAction } from '@reduxjs/toolkit'

import { CountryParams } from 'meta/api/request/country'
import { ValidationSummary } from 'meta/assessment/validation/summary'

type Payload = CountryParams & {
  summary: ValidationSummary
}

export const setValidationSummary = createAction<Payload>('validations/summary/set')
