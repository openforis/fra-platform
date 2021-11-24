import { ODPValidationNationalClass } from '@core/odp'
import { usePrintView } from '../../../store/app'
import { useODP } from '../../../store/page/originalDataPoint'

export const useNationalClassValidation = (index: number): ODPValidationNationalClass | Record<string, never> => {
  const [printView] = usePrintView()
  const odp = useODP()

  if (printView) {
    return {}
  }

  let validationResult: ODPValidationNationalClass = null
  if (odp.validationStatus) {
    const { uuid } = odp.nationalClasses[index]
    validationResult = odp.validationStatus.nationalClasses.find((s) => s.uuid === uuid)
  }

  return validationResult || {}
}
