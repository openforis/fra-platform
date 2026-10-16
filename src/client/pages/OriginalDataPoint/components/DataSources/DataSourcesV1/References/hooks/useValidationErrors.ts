import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { MessageParser } from 'meta/validations/messageParser'

import { useNationalDataPointValidation } from 'client/store/data/validations/nationalDataPoints/hooks/nationalDataPoints'
import { useShowNDPValidationErrors } from 'client/pages/OriginalDataPoint/components/hooks/useShowNDPValidationErrors'

type Props = {
  originalDataPoint: OriginalDataPoint
}

type Returned = Array<string>

// DataSources v1 ndps have a single data source; its reference link validation
// is stored in NDPValidation.dataSourceReference, not keyed by data source uuid
export const useValidationErrors = (props: Props): Returned => {
  const { originalDataPoint } = props

  const { t } = useTranslation()
  const showValidationErrors = useShowNDPValidationErrors()
  const validation = useNationalDataPointValidation({ uuid: originalDataPoint.uuid })
  const referenceValidation = validation.dataSourceReference

  return useMemo<Returned>(() => {
    if (!showValidationErrors) return []

    return MessageParser.getMessages(t, referenceValidation)
  }, [referenceValidation, showValidationErrors, t])
}
