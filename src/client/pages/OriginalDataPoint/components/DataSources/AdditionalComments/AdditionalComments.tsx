import React, { ChangeEventHandler, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { OriginalDataPoint } from 'meta/assessment'
import { Topics } from 'meta/messageCenter'

import { DataCell, DataRow, DataRowAction, DataRowActionType } from 'client/components/DataGrid'
import TextArea from 'client/components/Inputs/TextArea'
import { useShowReviewIndicator } from 'client/pages/OriginalDataPoint/hooks/useShowReviewIndicator'

import { useIsDisabled } from '../hooks/useIsDisabled'
import { useUpdateDataSources } from '../hooks/useUpdateDataSources'

type Props = {
  originalDataPoint: OriginalDataPoint
}

const AdditionalComments: React.FC<Props> = (props: Props) => {
  const { originalDataPoint } = props

  const { t } = useTranslation()
  const reviewIndicator = useShowReviewIndicator()
  const disabled = useIsDisabled()
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

  const actions = useMemo<Array<DataRowAction>>(() => {
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

  return (
    <DataRow actions={actions}>
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
    </DataRow>
  )
}

export default AdditionalComments
