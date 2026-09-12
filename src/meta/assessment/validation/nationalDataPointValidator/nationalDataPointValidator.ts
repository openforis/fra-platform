import { validate } from 'meta/assessment/validation/nationalDataPointValidator/validate'
import { validateNationalClasses } from 'meta/assessment/validation/nationalDataPointValidator/validateNationalClasses'
import { validateYear } from 'meta/assessment/validation/nationalDataPointValidator/validateYear'

export const NationalDataPointValidator = {
  validate,
  validateNationalClasses,
  validateYear,
}
