import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { OriginalDataPoint } from 'meta/assessment'
import { Topics } from 'meta/messageCenter'

import { DataCell } from 'client/components/DataGrid'
import { EditorWYSIWYGLinks } from 'client/components/EditorWYSIWYG'
import ReviewIndicator from 'client/components/ReviewIndicator'
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

  const reviewIndicator = useShowReviewIndicator(originalDataPoint)
  const disabled = useIsDisabled(originalDataPoint)

  const updateOriginalDataPoint = useUpdateDataSources()

  const onChange = useCallback<OnChange>(
    (value) => {
      const dataSourceReferences = Objects.isEmpty(value) ? null : value
      const originalDataPointUpdate = { ...originalDataPoint, dataSourceReferences }
      updateOriginalDataPoint(originalDataPointUpdate)
    },
    [originalDataPoint, updateOriginalDataPoint]
  )

  return (
    <>
      <DataCell header>{t('nationalDataPoint.references')}</DataCell>
      <DataCell lastCol>
        <EditorWYSIWYGLinks
          disabled={disabled}
          onChange={onChange}
          value={originalDataPoint.dataSourceReferences ?? ''}
        />
      </DataCell>

      {reviewIndicator && (
        <DataCell review>
          <ReviewIndicator
            subtitle={t('nationalDataPoint.dataSources')}
            title={t('nationalDataPoint.references')}
            topicKey={Topics.getOdpReviewTopicKey(originalDataPoint.id, 'dataSourceReferences')}
          />
        </DataCell>
      )}
    </>
  )
}

export default References
