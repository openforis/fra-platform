import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { Topics } from 'meta/messageCenter/topics'
import { Objects } from 'utils/objects'

import { useCanEditCycleData } from 'client/store/user/hooks/auth'
import { useIsPrintRoute } from 'client/hooks/routes'
import { DataCell, DataRow, DataRowAction, DataRowActionType } from 'client/components/DataGrid'
import { EditorWYSIWYGLinks } from 'client/components/EditorWYSIWYG'
import { useLinkValidationErrors } from 'client/components/EditorWYSIWYG/hooks/useLinkValidationErrors'
import { useODPDisplayHistory } from 'client/pages/OriginalDataPoint/components/hooks/useODPDisplayHistory'
import ODPDiffText from 'client/pages/OriginalDataPoint/components/ODPDiffText/ODPDiffText'
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

  const canEditCycleData = useCanEditCycleData()
  const { print } = useIsPrintRoute()
  const reviewIndicator = useShowReviewIndicator()
  const disabled = useIsDisabled()
  const displayHistory = useODPDisplayHistory()
  const validationErrors = useLinkValidationErrors({
    enabled: canEditCycleData && !print,
    value: originalDataPoint.dataSourceReferences ?? '',
  })

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
  }, [originalDataPoint, reviewIndicator, t])

  return (
    <DataRow actions={actions}>
      <DataCell header>{t('nationalDataPoint.references')}</DataCell>
      <DataCell lastCol>
        {displayHistory ? (
          <ODPDiffText
            className="input-text disabled"
            originalDataPoint={originalDataPoint}
            path={['dataSourceReferences']}
          />
        ) : (
          <EditorWYSIWYGLinks
            disabled={disabled}
            onChange={onChange}
            repository
            validationErrors={validationErrors}
            value={originalDataPoint.dataSourceReferences ?? ''}
          />
        )}
      </DataCell>
    </DataRow>
  )
}

export default References
