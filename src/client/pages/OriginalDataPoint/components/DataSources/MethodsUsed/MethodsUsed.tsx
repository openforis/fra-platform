import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { ODPDataSourceMethod, OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { Topics } from 'meta/messageCenter'

import { DataCell } from 'client/components/DataGrid'
import MultiSelect from 'client/components/MultiSelect'
import { Option } from 'client/components/MultiSelect/option'
import ReviewIndicator from 'client/components/ReviewIndicator'
import { useShowReviewIndicator } from 'client/pages/OriginalDataPoint/hooks/useShowReviewIndicator'

import { useIsDisabled } from '../hooks/useIsDisabled'
import { useUpdateDataSources } from '../hooks/useUpdateDataSources'

type Props = {
  originalDataPoint: OriginalDataPoint
}

type OnChange = (values: Array<ODPDataSourceMethod>) => void

const MethodsUsed: React.FC<Props> = (props: Props) => {
  const { originalDataPoint } = props

  const { t } = useTranslation()
  const reviewIndicator = useShowReviewIndicator(originalDataPoint)
  const disabled = useIsDisabled(originalDataPoint)
  const updateOriginalDataPoint = useUpdateDataSources()

  const options = useMemo<Array<Option>>(
    () =>
      Object.values(ODPDataSourceMethod).map((value) => {
        const label = t(`nationalDataPoint.dataSourceMethodsOptions.${value}`)
        return { label, value }
      }),
    [t]
  )

  const onChange = useCallback<OnChange>(
    (values) => {
      const originalDataPointUpdate = { ...originalDataPoint, dataSourceMethods: values }
      updateOriginalDataPoint(originalDataPointUpdate)
    },
    [originalDataPoint, updateOriginalDataPoint]
  )

  return (
    <>
      <DataCell header>{t('nationalDataPoint.methodsUsed')}</DataCell>
      <DataCell lastCol>
        <MultiSelect
          disabled={disabled}
          values={originalDataPoint.dataSourceMethods ?? []}
          options={options}
          onChange={onChange}
        />
      </DataCell>

      {reviewIndicator && (
        <DataCell review>
          <ReviewIndicator
            title={t('nationalDataPoint.methodsUsed')}
            subtitle={t('nationalDataPoint.dataSources')}
            topicKey={Topics.getOdpReviewTopicKey(originalDataPoint.id, 'dataSourceMethods')}
          />
        </DataCell>
      )}
    </>
  )
}

export default MethodsUsed
