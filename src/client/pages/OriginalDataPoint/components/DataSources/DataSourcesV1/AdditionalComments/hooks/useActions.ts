import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { Topics } from 'meta/messageCenter/topics'

import { DataRowAction, DataRowActionType } from 'client/components/DataGrid'
import { useShowReviewIndicator } from 'client/pages/OriginalDataPoint/hooks/useShowReviewIndicator'

type Props = {
  originalDataPoint: OriginalDataPoint
}

type Returned = Array<DataRowAction>

export const useActions = (props: Props): Returned => {
  const { originalDataPoint } = props

  const { t } = useTranslation()
  const reviewIndicator = useShowReviewIndicator()
  return useMemo<Returned>(() => {
    if (!reviewIndicator) return []
    return [
      {
        subtitle: t('nationalDataPoint.dataSources'),
        type: DataRowActionType.Review,
        title: t('nationalDataPoint.additionalComments'),
        topicKey: Topics.getOdpReviewTopicKey(originalDataPoint.id, 'dataSourceAdditionalComments'),
      },
    ]
  }, [originalDataPoint, reviewIndicator, t])
}
