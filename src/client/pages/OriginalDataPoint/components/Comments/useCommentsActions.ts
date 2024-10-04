import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Topics } from 'meta/messageCenter'

import { useOriginalDataPoint } from 'client/store/ui/originalDataPoint'
import { DataRowAction, DataRowActionType } from 'client/components/DataGrid'
import { useShowReviewIndicator } from 'client/pages/OriginalDataPoint/hooks/useShowReviewIndicator'

export const useCommentsActions = (): Array<DataRowAction> => {
  const { t } = useTranslation()
  const originalDataPoint = useOriginalDataPoint()
  const showReviewIndicator = useShowReviewIndicator(originalDataPoint)

  return useMemo<Array<DataRowAction>>(() => {
    if (!showReviewIndicator) return []

    const title = t('nationalDataPoint.nationalDataPoint')
    const topicKey = Topics.getOdpReviewTopicKey(originalDataPoint.id, 'nationalDataPointComments')
    return [{ type: DataRowActionType.Review, title, topicKey }]
  }, [originalDataPoint.id, showReviewIndicator, t])
}
