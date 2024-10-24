import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { OriginalDataPoint } from 'meta/assessment'
import { Topics } from 'meta/messageCenter'

import { DataCell, DataRow, DataRowAction, DataRowActionType } from 'client/components/DataGrid'
import { EditorWYSIWYGLinks } from 'client/components/EditorWYSIWYG'
import { useShowReviewIndicator } from 'client/pages/OriginalDataPoint/hooks/useShowReviewIndicator'

import { useIsDisabled } from '../hooks/useIsDisabled'
import { useUpdateDataSources } from '../hooks/useUpdateDataSources'

type OnChange = (value?: string) => void

type Props = {
  originalDataPoint: OriginalDataPoint
}

const References: React.FC<Props> = (props: Props) => {
  const { originalDataPoint } = props
  const { t } = useTranslation()

  const reviewIndicator = useShowReviewIndicator()
  const disabled = useIsDisabled()

  const updateOriginalDataPoint = useUpdateDataSources()

  const onChange = useCallback<OnChange>(
    (value) => {
      const dataSourceReferences = Objects.isEmpty(value) ? null : value
      const originalDataPointUpdate = { ...originalDataPoint, dataSourceReferences }
      updateOriginalDataPoint(originalDataPointUpdate)
    },
    [originalDataPoint, updateOriginalDataPoint]
  )

  const actions = useMemo<Array<DataRowAction>>(() => {
    if (!reviewIndicator) return []
    return [
      {
        subtitle: t('nationalDataPoint.dataSources'),
        title: t('nationalDataPoint.references'),
        topicKey: Topics.getOdpReviewTopicKey(originalDataPoint.id, 'dataSourceReferences'),
        type: DataRowActionType.Review,
      },
    ]
  }, [reviewIndicator, originalDataPoint, t])

  return (
    <DataRow actions={actions}>
      <DataCell header>{t('nationalDataPoint.references')}</DataCell>
      <DataCell lastCol>
        <EditorWYSIWYGLinks
          disabled={disabled}
          onChange={onChange}
          repository
          value={originalDataPoint.dataSourceReferences ?? ''}
        />
      </DataCell>
    </DataRow>
  )
}

export default References
