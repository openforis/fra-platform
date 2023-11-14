import React from 'react'
import { useTranslation } from 'react-i18next'

import { OriginalDataPoint } from 'meta/assessment'
import { Topics } from 'meta/messageCenter'

import ReviewIndicator from 'client/components/ReviewIndicator'
import VerticallyGrowingTextField from 'client/components/VerticallyGrowingTextField'

type Props = {
  disabled: boolean
  originalDataPoint: OriginalDataPoint
  reviewIndicator: boolean
  updateOriginalDataPoint: (originalDataPoint: OriginalDataPoint) => void
}

const AdditionalComments: React.FC<Props> = (props: Props) => {
  const { reviewIndicator, disabled, originalDataPoint, updateOriginalDataPoint } = props
  const { t } = useTranslation()

  return (
    <tr>
      <th className="fra-table__header-cell-left">{t('nationalDataPoint.additionalComments')}</th>
      <td className="fra-table__cell-left odp__data-source-input-column">
        <VerticallyGrowingTextField
          value={originalDataPoint.dataSourceAdditionalComments || ''}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
          }}
          disabled={disabled}
        />
      </td>
      {reviewIndicator && (
        <td className="fra-table__review-cell no-print">
          <ReviewIndicator
            title={t('nationalDataPoint.additionalComments')}
            subtitle={t('nationalDataPoint.dataSources')}
            topicKey={Topics.getOdpReviewTopicKey(originalDataPoint.id, 'dataSourceAdditionalComments')}
          />
        </td>
      )}
    </tr>
  )
}

export default AdditionalComments
