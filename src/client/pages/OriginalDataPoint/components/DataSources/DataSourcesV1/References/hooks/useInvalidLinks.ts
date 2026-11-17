import { useMemo } from 'react'

import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { Validations } from 'meta/assessment/validation/validations/validations'

import { useNationalDataPointValidation } from 'client/store/data/validations/nationalDataPoints/hooks/nationalDataPoints'
import { useShowNDPValidationErrors } from 'client/pages/OriginalDataPoint/components/hooks/useShowNDPValidationErrors'

type Props = {
  originalDataPoint: OriginalDataPoint
}

type Returned = Array<string>

export const useInvalidLinks = (props: Props): Returned => {
  const { originalDataPoint } = props

  const showValidationErrors = useShowNDPValidationErrors()
  const validation = useNationalDataPointValidation({ uuid: originalDataPoint.uuid })
  const referenceValidation = validation.dataSourceReference

  return useMemo<Returned>(() => {
    if (!showValidationErrors) return []

    return Validations.getInvalidLinks(referenceValidation)
  }, [referenceValidation, showValidationErrors])
}
