import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'
import { Objects } from 'utils/objects'

import { OriginalDataPoint } from 'meta/assessment'
import { Topics } from 'meta/messageCenter'
import { TooltipId } from 'meta/tooltip'

import { useCanEditCycleData } from 'client/store/user'
import { DataCell } from 'client/components/DataGrid'
import { EditorValidators, EditorWYSIWYGLinks } from 'client/components/EditorWYSIWYG'
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

  const editor = useCanEditCycleData()

  const validationError = useMemo<string>(() => {
    if (editor && !EditorValidators.links(originalDataPoint.dataSourceReferences ?? ''))
      return t('generalValidation.invalidLink')
    return ''
  }, [editor, originalDataPoint.dataSourceReferences, t])

  return (
    <>
      <DataCell header>{t('nationalDataPoint.references')}</DataCell>
      <DataCell
        className={classNames({ 'validation-error': validationError.length > 0 })}
        data-tooltip-content={validationError}
        data-tooltip-id={TooltipId.error}
        lastCol
      >
        <EditorWYSIWYGLinks
          disabled={disabled}
          onChange={onChange}
          repository
          value={originalDataPoint.dataSourceReferences ?? ''}
        />
      </DataCell>

      {reviewIndicator && (
        <DataCell actions>
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
