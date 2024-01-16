import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { OriginalDataPoint } from 'meta/assessment'
import { Topics } from 'meta/messageCenter'

import { DataRowAction, DataRowActionType } from 'client/components/DataGrid'

import { useDeleteNationalClass } from './useDeleteNationalClass'

type Props = {
  canEdit: boolean
  index: number
  originalDataPoint: OriginalDataPoint
}

export type Returned = Array<DataRowAction> | undefined

export const useRowActions = (props: Props): Returned => {
  const { index, canEdit, originalDataPoint } = props

  const { t } = useTranslation()
  const onDelete = useDeleteNationalClass({ index, originalDataPoint })
  const { name, uuid } = originalDataPoint.nationalClasses[index]
  const odpId = originalDataPoint.id

  return useMemo<Returned>(() => {
    if (!canEdit) return []

    const buttonDelete = { type: DataRowActionType.Delete, onDelete }
    const subtitle = t('nationalDataPoint.nationalDataPoint')
    const topicKey = Topics.getOdpClassReviewTopicKey(odpId, uuid, 'definition')
    const buttonReview = { type: DataRowActionType.Review, title: name, subtitle, topicKey }

    return [buttonDelete, buttonReview]
  }, [canEdit, name, odpId, onDelete, t, uuid])
}
