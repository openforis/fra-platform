import { useMemo } from 'react'

import { OriginalDataPointCommentKey } from 'meta/assessment/originalDataPoint'
import { Validations } from 'meta/assessment/validation/validations/validations'

import { useOriginalDataPoint } from 'client/store/data/originalDataPoint/hooks/originalDataPoint'
import { useNationalDataPointValidation } from 'client/store/data/validations/nationalDataPoints/hooks/nationalDataPoints'
import { useShowNDPValidationErrors } from 'client/pages/OriginalDataPoint/components/hooks/useShowNDPValidationErrors'

type Props = {
  field: OriginalDataPointCommentKey
}

type Returned = Array<string>

export const useInvalidLinks = (props: Props): Returned => {
  const { field } = props

  const showValidationErrors = useShowNDPValidationErrors()
  const nationalDataPoint = useOriginalDataPoint()
  const validation = useNationalDataPointValidation({ uuid: nationalDataPoint.uuid })
  const commentValidation = validation.comments?.[field]

  return useMemo<Returned>(() => {
    if (!showValidationErrors) return []

    return Validations.getInvalidLinks(commentValidation)
  }, [commentValidation, showValidationErrors])
}
