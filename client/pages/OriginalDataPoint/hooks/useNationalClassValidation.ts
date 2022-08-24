import { ODPValidationNationalClass } from '@meta/assessment/originalDataPoint'

import { useOriginalDataPoint } from '@client/store/pages/originalDataPoint'
import { useIsPrint } from '@client/hooks/useIsPath'

export const useNationalClassValidation = (index: number): ODPValidationNationalClass | Record<string, never> => {
  const { print } = useIsPrint()
  const originalDataPoint = useOriginalDataPoint()

  if (print) {
    return {}
  }

  let validationResult: ODPValidationNationalClass = null
  if (originalDataPoint.validationStatus) {
    const { uuid } = originalDataPoint.nationalClasses[index]
    validationResult = originalDataPoint.validationStatus.nationalClasses.find((s) => s.uuid === uuid)
  }

  return validationResult || {}
}
