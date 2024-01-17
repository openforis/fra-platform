import React, { ChangeEventHandler, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { OriginalDataPoint } from 'meta/assessment'
import { Topics } from 'meta/messageCenter'

import { DataCell } from 'client/components/DataGrid'
import TextArea from 'client/components/Inputs/TextArea'
import ReviewIndicator from 'client/components/ReviewIndicator'
import { useShowReviewIndicator } from 'client/pages/OriginalDataPoint/hooks/useShowReviewIndicator'

import { useIsDisabled } from '../hooks/useIsDisabled'
import { useUpdateDataSources } from '../hooks/useUpdateDataSources'

type Props = {
  originalDataPoint: OriginalDataPoint
}

const AdditionalComments: React.FC<Props> = (props: Props) => {
  const { originalDataPoint } = props

  const { t } = useTranslation()
  const reviewIndicator = useShowReviewIndicator(originalDataPoint)
  const disabled = useIsDisabled(originalDataPoint)
  const updateOriginalDataPoint = useUpdateDataSources()

  const onChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(
    (event) => {
      const caret = event.target.selectionStart
      const element = event.target
      window.requestAnimationFrame(() => {
        element.selectionStart = caret
        element.selectionEnd = caret
      })
      const originalDataPointUpdate = {
        ...originalDataPoint,
        dataSourceAdditionalComments: event.target.value,
      }
      updateOriginalDataPoint(originalDataPointUpdate)
    },
    [originalDataPoint, updateOriginalDataPoint]
  )

  return (
    <>
      <DataCell header lastRow>
        {t('nationalDataPoint.additionalComments')}
      </DataCell>
      <DataCell lastCol lastRow>
        <TextArea
          disabled={disabled}
          onChange={onChange}
          value={originalDataPoint.dataSourceAdditionalComments ?? ''}
        />
      </DataCell>

      {reviewIndicator && (
        <DataCell actions>
          <ReviewIndicator
            title={t('nationalDataPoint.additionalComments')}
            subtitle={t('nationalDataPoint.dataSources')}
            topicKey={Topics.getOdpReviewTopicKey(originalDataPoint.id, 'dataSourceAdditionalComments')}
          />
        </DataCell>
      )}
    </>
  )
}

export default AdditionalComments
