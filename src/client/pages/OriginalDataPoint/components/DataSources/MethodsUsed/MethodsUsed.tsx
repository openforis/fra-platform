import React from 'react'
import { useTranslation } from 'react-i18next'

import { ODPDataSourceMethod, OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { Topics } from 'meta/messageCenter'

import MultiSelect from 'client/components/MultiSelect'
import ReviewIndicator from 'client/components/ReviewIndicator'
import { useIsDisabled } from 'client/pages/OriginalDataPoint/components/DataSources/hooks/useIsDisabled'
import { useShowReviewIndicator } from 'client/pages/OriginalDataPoint/components/DataSources/hooks/useShowReviewIndicator'

type Props = {
  originalDataPoint: OriginalDataPoint
  updateOriginalDataPoint: (originalDataPoint: OriginalDataPoint) => void
}

const MethodsUsed: React.FC<Props> = (props: Props) => {
  const { originalDataPoint, updateOriginalDataPoint } = props
  const { t } = useTranslation()

  const reviewIndicator = useShowReviewIndicator(originalDataPoint)
  const disabled = useIsDisabled(originalDataPoint)

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
