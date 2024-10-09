import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { OriginalDataPoint } from 'meta/assessment'
import { Topics } from 'meta/messageCenter'

import { DataRowAction, DataRowActionType } from 'client/components/DataGrid'
import { useShowReviewIndicator } from 'client/pages/OriginalDataPoint/hooks/useShowReviewIndicator'

import { useDeleteNationalClass } from './useDeleteNationalClass'

type Props = {
  canEdit: boolean
  index: number
  originalDataPoint: OriginalDataPoint
}

export type Returned = Array<DataRowAction>

export const useRowActions = (props: Props): Returned => {
  const { index, canEdit, originalDataPoint } = props

  const { t } = useTranslation()
  const deleteNationalClass = useDeleteNationalClass({ index, originalDataPoint })
  const { name, uuid } = originalDataPoint.nationalClasses[index]
  const odpId = originalDataPoint.id
  const showReviewIndicator = useShowReviewIndicator()

  return useMemo<Returned>(() => {
    const actions: Returned = []
    if (canEdit) {
      const buttonDelete = { type: DataRowActionType.Delete, onClick: deleteNationalClass }
      actions.push(buttonDelete)
    }

    if (showReviewIndicator) {
      const subtitle = t('nationalDataPoint.nationalDataPoint')
      const topicKey = Topics.getOdpClassReviewTopicKey(odpId, uuid, 'definition')
      const buttonReview = { type: DataRowActionType.Review, title: name, subtitle, topicKey }
      actions.push(buttonReview)
    }

    return actions
  }, [canEdit, showReviewIndicator, deleteNationalClass, t, odpId, uuid, name])
}
