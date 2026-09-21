import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { NDPValidation } from 'meta/assessment/validation/nationalDataPoint'
import { ValidationMessage } from 'meta/assessment/validation/validation'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

type Props = {
  nationalDataPoint: OriginalDataPoint
}

// Year must not be empty and must parse to a positive finite number. Returns undefined when valid.
export const validateYear = (props: Props): NDPValidation['year'] => {
  const { nationalDataPoint } = props
  const { year } = nationalDataPoint
  const yearNumber = Numbers.toNumberOrNull(year)

  let message: ValidationMessage | undefined
  if (Objects.isEmpty(year)) {
    message = { key: 'generalValidation.notEmpty' }
  } else if (Objects.isNil(yearNumber) || !Numbers.greaterThan(yearNumber, 0)) {
    message = { key: 'generalValidation.valueMustBeYear' }
  }

  if (Objects.isNil(message)) return undefined

  return { valid: false, messages: [message] }
}
