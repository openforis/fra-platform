import { ODPNationalClass } from 'meta/assessment/originalDataPoint'
import { Validation, ValidationMessage } from 'meta/assessment/validation/validation'
import { Objects } from 'utils/objects'

type Props = {
  nationalClass: ODPNationalClass
}

const maxNationalClassNameLength = 1024

// Name must not be empty and should not be longer than 1024 characters.
export const validateName = (props: Props): Validation | undefined => {
  const { nationalClass } = props
  const { name = '' } = nationalClass

  let message: ValidationMessage | undefined
  if (Objects.isEmpty(name)) {
    message = { key: 'generalValidation.notEmpty' }
  } else if (name.length >= maxNationalClassNameLength) {
    message = {
      key: 'generalValidation.valueMustBeFewerThanCharacters',
      params: { maxLength: maxNationalClassNameLength },
    }
  }

  if (!Objects.isNil(message)) return { valid: false, messages: [message] }

  return undefined
}
