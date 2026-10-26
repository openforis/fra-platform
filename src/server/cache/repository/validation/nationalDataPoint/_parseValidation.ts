import { NDPValidation } from 'meta/assessment/validation/nationalDataPoint'
import { Objects } from 'utils/objects'

export const _parseValidation = (value?: string | null): NDPValidation => {
  if (Objects.isEmpty(value)) {
    return {}
  }

  return JSON.parse(value)
}
