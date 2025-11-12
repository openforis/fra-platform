import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { OriginalDataPointCommentKey } from 'meta/assessment/originalDataPoint'
import { SectionNames } from 'meta/assessment/section'
import { TableNames } from 'meta/assessment/table'
import { Topics } from 'meta/messageCenter'

import { useOriginalDataPoint } from 'client/store/data/originalDataPoint/hooks/originalDataPoint'
import { DataRowAction, DataRowActionType } from 'client/components/DataGrid'
import { useShowReviewIndicator } from 'client/pages/OriginalDataPoint/hooks/useShowReviewIndicator'

type Props = {
  field: OriginalDataPointCommentKey
}

const commentTopicSuffix: Record<OriginalDataPointCommentKey, string> = {
  [TableNames.extentOfForest]: 'nationalDataPointExtentOfForestComments',
  [TableNames.forestCharacteristics]: 'nationalDataPointForestCharacteristicsComments',
}

const commentSectionName: Record<OriginalDataPointCommentKey, SectionNames> = {
  [TableNames.extentOfForest]: SectionNames.extentOfForest,
  [TableNames.forestCharacteristics]: SectionNames.forestCharacteristics,
}

export const useCommentsActions = (props: Props): Array<DataRowAction> => {
  const { field } = props
  const { t } = useTranslation()
  const originalDataPoint = useOriginalDataPoint()
  const sectionName = commentSectionName[field]
  const showReviewIndicator = useShowReviewIndicator(sectionName)

  return useMemo<Array<DataRowAction>>(() => {
    if (!showReviewIndicator) return []

    const sectionLabel =
      field === TableNames.forestCharacteristics
        ? t('nationalDataPoint.forestCharacteristics')
        : t('extentOfForest.extentOfForest')
    const title = `${t('nationalDataPoint.nationalDataPoint')} – ${sectionLabel}`
    const subtitle = t('review.comments')

    const topicKey = Topics.getOdpReviewTopicKey(originalDataPoint.id, commentTopicSuffix[field])
    return [{ subtitle, title, topicKey, type: DataRowActionType.Review }]
  }, [field, originalDataPoint.id, showReviewIndicator, t])
}
