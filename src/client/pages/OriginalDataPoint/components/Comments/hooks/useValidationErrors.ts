import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { OriginalDataPointCommentKey } from 'meta/assessment/originalDataPoint'
import { MessageParser } from 'meta/validations/messageParser'

import { useOriginalDataPoint } from 'client/store/data/originalDataPoint/hooks/originalDataPoint'
import { useNationalDataPointValidation } from 'client/store/data/validations/nationalDataPoints/hooks/nationalDataPoints'
import { useShowNDPValidationErrors } from 'client/pages/OriginalDataPoint/components/hooks/useShowNDPValidationErrors'

type Props = {
  field: OriginalDataPointCommentKey
}

type Returned = Array<string>

export const useValidationErrors = (props: Props): Returned => {
  const { field } = props
  const { t } = useTranslation()
  const showValidationErrors = useShowNDPValidationErrors()
  const nationalDataPoint = useOriginalDataPoint()
  const validation = useNationalDataPointValidation({ uuid: nationalDataPoint.uuid })
  const commentValidation = validation.comments?.[field]

  return useMemo<Returned>(() => {
    if (!showValidationErrors) return []

    return MessageParser.getMessages(t, commentValidation)
  }, [commentValidation, showValidationErrors, t])
}
