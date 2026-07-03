import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { NDPValidation } from 'meta/assessment/validation/nationalDataPoint'
import { ValidationMessage } from 'meta/assessment/validation/validation'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

type Props = {
  nationalDataPoint: OriginalDataPoint
  validation: NDPValidation
}

// Year must not be empty and must parse to a positive finite number.
export const validateYear = (props: Props): NDPValidation => {
  const { nationalDataPoint, validation } = props
  const { id, year } = nationalDataPoint
  const yearNumber = Numbers.toNumberOrNull(year)

  let message: ValidationMessage | undefined
  if (Objects.isEmpty(year)) {
    message = { key: 'generalValidation.notEmpty' }
  } else if (Objects.isNil(yearNumber) || !Numbers.greaterThan(yearNumber, 0)) {
    message = { key: 'generalValidation.valueMustBeYear' }
  }

  if (Objects.isNil(message)) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { year: _, ...withoutYearValidation } = validation
    return { ...withoutYearValidation, odpId: id }
  }

  return { ...validation, odpId: id, year: { valid: false, messages: [message] } }
}
