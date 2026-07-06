import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { OriginalDataPointCommentKey } from 'meta/assessment/originalDataPoint'
import { MessageParser } from 'meta/validations/messageParser'

import { useOriginalDataPoint } from 'client/store/data/originalDataPoint/hooks/originalDataPoint'
import { useNationalDataPointValidation } from 'client/store/data/tableData/validations/hooks/nationalDataPoints'
import { useCanEditCycleData } from 'client/store/user/hooks/auth'
import { useIsPrintRoute } from 'client/hooks/routes'
import { useODPDisplayHistory } from 'client/pages/OriginalDataPoint/components/hooks/useODPDisplayHistory'

type Props = {
  field: OriginalDataPointCommentKey
}

export const useValidationErrors = (props: Props): Array<string> => {
  const { field } = props
  const { t } = useTranslation()
  const canEditCycleData = useCanEditCycleData()
  const { print } = useIsPrintRoute()
  const displayHistory = useODPDisplayHistory()
  const nationalDataPoint = useOriginalDataPoint()
  const validation = useNationalDataPointValidation({ uuid: nationalDataPoint.uuid })
  const commentValidation = validation.comments?.[field]

  return useMemo<Array<string>>(() => {
    if (!canEditCycleData || print || displayHistory) return []

    return MessageParser.getMessages(t, commentValidation)
  }, [canEditCycleData, commentValidation, displayHistory, print, t])
}
