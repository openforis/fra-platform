import React from 'react'
import { useTranslation } from 'react-i18next'

import { ODPDataSourceMethod, OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { Topics } from 'meta/messageCenter'

import MultiSelect from 'client/components/MultiSelect'
import ReviewIndicator from 'client/components/ReviewIndicator'

type Props = {
  originalDataPoint: OriginalDataPoint
  updateOriginalDataPoint: (originalDataPoint: OriginalDataPoint) => void
  disabled: boolean
  reviewIndicator: boolean
}

const MethodsUsed: React.FC<Props> = (props: Props) => {
  const { disabled, reviewIndicator, originalDataPoint, updateOriginalDataPoint } = props
  const { t } = useTranslation()

  return (
    <tr>
      <th className="fra-table__header-cell-left">{t('nationalDataPoint.methodsUsed')}</th>
      <td className="fra-table__cell-left odp__data-source-input-column">
        <MultiSelect
          disabled={disabled}
          values={originalDataPoint.dataSourceMethods ?? []}
          options={Object.values(ODPDataSourceMethod).map((method) => ({
            value: method,
            label: t(`nationalDataPoint.dataSourceMethodsOptions.${method}`),
          }))}
          onChange={(values: Array<ODPDataSourceMethod>) => {
            const originalDataPointUpdate = { ...originalDataPoint, dataSourceMethods: values }
            updateOriginalDataPoint(originalDataPointUpdate)
          }}
        />
      </td>
      {reviewIndicator && (
        <td className="fra-table__review-cell no-print">
          <ReviewIndicator
            title={t('nationalDataPoint.methodsUsed')}
            subtitle={t('nationalDataPoint.dataSources')}
            topicKey={Topics.getOdpReviewTopicKey(originalDataPoint.id, 'dataSourceMethods')}
          />
        </td>
      )}
    </tr>
  )
}

export default MethodsUsed
