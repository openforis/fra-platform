import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Topics } from 'meta/messageCenter'

import { useOriginalDataPoint } from 'client/store/ui/originalDataPoint'
import { DataRowAction, DataRowActionType } from 'client/components/DataGrid'

type Props = {
  canEditData: boolean
}

export const useCommentsActions = (props: Props): Array<DataRowAction> => {
  const { canEditData } = props

  const { t } = useTranslation()
  const originalDataPoint = useOriginalDataPoint()

  return useMemo<Array<DataRowAction>>(() => {
    if (!canEditData) return []

    const title = t('nationalDataPoint.nationalDataPoint')
    const topicKey = Topics.getOdpReviewTopicKey(originalDataPoint.id, 'nationalDataPointComments')
    return [{ type: DataRowActionType.Review, title, topicKey }]
  }, [canEditData, originalDataPoint.id, t])
}
