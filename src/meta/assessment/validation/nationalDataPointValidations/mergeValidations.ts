import { NDPValidation } from 'meta/assessment/validation/nationalDataPoint'
import { Objects } from 'utils/objects'

type Props = {
  current: NDPValidation
  update: NDPValidation
}

// Merges an incoming validation update onto an NDP current validations and returns the result.
// Fields left out of the update are kept as they are; a field set to undefined is cleared.
// Example:
//   current: { year: { valid: false }, nationalClasses: { ... } }
//   update:  { year: undefined }
//   result:  { nationalClasses: { ... } }
export const mergeValidations = (props: Props): NDPValidation => {
  const { current, update } = props
  const value: NDPValidation = { ...current }

  if ('year' in update) {
    if (Objects.isNil(update.year)) delete value.year
    else value.year = update.year
  }

  // TODO: merge `nationalClasses` when validating national classes on change.
  // TODO: merge `comments` and `dataSources` when ODP async-link validations are added.

  return value
}
