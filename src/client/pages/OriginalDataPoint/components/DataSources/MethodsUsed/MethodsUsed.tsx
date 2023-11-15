import React from 'react'
import { useTranslation } from 'react-i18next'

import { ODPDataSourceMethod, OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { Topics } from 'meta/messageCenter'

import MultiSelect from 'client/components/MultiSelect'
import ReviewIndicator from 'client/components/ReviewIndicator'

import { useIsDisabled } from '../hooks/useIsDisabled'
import { useShowReviewIndicator } from '../hooks/useShowReviewIndicator'
import { useUpdateDataSources } from '../hooks/useUpdateDataSources'

type Props = {
  originalDataPoint: OriginalDataPoint
}

const MethodsUsed: React.FC<Props> = (props: Props) => {
  const { originalDataPoint } = props
  const { t } = useTranslation()

  const reviewIndicator = useShowReviewIndicator(originalDataPoint)
  const disabled = useIsDisabled(originalDataPoint)

  const updateOriginalDataPoint = useUpdateDataSources()

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
