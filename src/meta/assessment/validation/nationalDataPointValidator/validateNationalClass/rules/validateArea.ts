import { ODPNationalClass } from 'meta/assessment/originalDataPoint'
import { Validation, ValidationMessage } from 'meta/assessment/validation/validation'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

type Props = {
  nationalClass: ODPNationalClass
}

// Area must not be empty and must parse to a finite number.
export const validateArea = (props: Props): Validation | undefined => {
  const { nationalClass } = props
  const { area } = nationalClass
  const areaNumber = Numbers.toNumberOrNull(area)

  let message: ValidationMessage | undefined
  if (Objects.isEmpty(area)) {
    message = { key: 'generalValidation.notEmpty' }
  } else if (Objects.isNil(areaNumber)) {
    message = { key: 'generalValidation.valueMustBeNumber' }
  }

  if (!Objects.isNil(message)) return { valid: false, messages: [message] }

  return undefined
}
