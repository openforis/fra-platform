import { useSelector } from 'react-redux'

import { ODP, ODPValidationNationalClass } from '@core/odp'
import { usePrintView } from '@webapp/components/hooks'

import * as OriginalDataPointState from '@webapp/app/assessment/fra/sections/originalDataPoint/originalDataPointState'

export default (index: number): ODPValidationNationalClass | Record<string, never> => {
  const [printView] = usePrintView()

  if (printView) {
    return {}
  }

  return useSelector((state) => {
    const odp: ODP = OriginalDataPointState.getActive(state) as ODP

    let validationResult: ODPValidationNationalClass = null
    if (odp.validationStatus) {
      const { uuid } = odp.nationalClasses[index]
      validationResult = odp.validationStatus.nationalClasses.find((s) => s.uuid === uuid)
    }

    return validationResult || {}
  })
}
