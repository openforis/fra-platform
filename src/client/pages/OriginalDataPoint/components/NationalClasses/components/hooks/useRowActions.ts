import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { OriginalDataPoint } from 'meta/assessment'
import { Topics } from 'meta/messageCenter'

import { DataRowActions } from 'client/components/DataGrid'

import { useDeleteNationalClass } from './useDeleteNationalClass'

type Props = {
  canEdit: boolean
  index: number
  originalDataPoint: OriginalDataPoint
}

type Returned = DataRowActions | undefined

export const useRowActions = (props: Props): Returned => {
  const { index, canEdit, originalDataPoint } = props

  const { t } = useTranslation()
  const onDelete = useDeleteNationalClass({ index, originalDataPoint })
  const { name, uuid } = originalDataPoint.nationalClasses[index]
  const odpId = originalDataPoint.id

  return useMemo<Returned>(() => {
    if (canEdit) {
      return {
        delete: {
          onDelete,
        },
        review: {
          subtitle: t('nationalDataPoint.nationalDataPoint'),
          title: name,
          topicKey: Topics.getOdpClassReviewTopicKey(odpId, uuid, 'definition'),
        },
      }
    }
    return undefined
  }, [canEdit, name, odpId, onDelete, t, uuid])
}
