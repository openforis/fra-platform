import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { Validation, ValidationMessage } from 'meta/assessment/validation/validation'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

type Props = {
  nationalDataPoint: OriginalDataPoint
}

// Year must not be empty and must parse to a finite number.
export const validateYear = (props: Props): Validation | undefined => {
  const { nationalDataPoint } = props
  const { year } = nationalDataPoint
  const yearNumber = Numbers.toNumberOrNull(year)

  let message: ValidationMessage | undefined
  if (Objects.isEmpty(year)) {
    message = { key: 'generalValidation.notEmpty' }
  } else if (Objects.isNil(yearNumber)) {
    message = { key: 'generalValidation.valueMustBeYear' }
  }

  if (!Objects.isNil(message)) return { valid: false, messages: [message] }

  return undefined
}
