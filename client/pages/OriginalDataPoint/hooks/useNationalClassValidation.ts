import { ODPValidationNationalClass } from '@meta/assessment/originalDataPoint'
import { useOriginalDataPoint } from '@client/store/data/originalDataPoint'

export const useNationalClassValidation = (index: number): ODPValidationNationalClass | Record<string, never> => {
  const [printView] = [false] // TODO: usePrintView()
  const originalDataPoint = useOriginalDataPoint()

  if (printView) {
    return {}
  }

  let validationResult: ODPValidationNationalClass = null
  if (originalDataPoint.validationStatus) {
    const { uuid } = originalDataPoint.nationalClasses[index]
    validationResult = originalDataPoint.validationStatus.nationalClasses.find((s) => s.uuid === uuid)
  }

  return validationResult || {}
}
