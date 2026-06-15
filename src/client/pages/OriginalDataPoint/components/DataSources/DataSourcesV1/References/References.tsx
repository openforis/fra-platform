import React from 'react'
import { useTranslation } from 'react-i18next'

import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { useCanEditCycleData } from 'client/store/user/hooks/auth'
import { useIsPrintRoute } from 'client/hooks/routes'
import { DataCell, DataRow } from 'client/components/DataGrid'
import { EditorWYSIWYGLinks } from 'client/components/EditorWYSIWYG'
import { useLinkValidationErrors } from 'client/components/EditorWYSIWYG/hooks/useLinkValidationErrors'
import { useODPDisplayHistory } from 'client/pages/OriginalDataPoint/components/hooks/useODPDisplayHistory'
import ODPDiffText from 'client/pages/OriginalDataPoint/components/ODPDiffText/ODPDiffText'

import { useIsDisabled } from '../hooks/useIsDisabled'
import { useActions } from './hooks/useActions'
import { useOnChange } from './hooks/useOnChange'

type Props = {
  originalDataPoint: OriginalDataPoint
}

const References: React.FC<Props> = (props: Props) => {
  const { originalDataPoint } = props
  const dataSource = originalDataPoint.dataSources?.at(0)
  const value = dataSource?.reference ?? ''

  const { t } = useTranslation()
  const canEditCycleData = useCanEditCycleData()
  const { print } = useIsPrintRoute()
  const disabled = useIsDisabled()
  const displayHistory = useODPDisplayHistory()
  const validationErrors = useLinkValidationErrors({ enabled: canEditCycleData && !print, value })
  const onChange = useOnChange({ originalDataPoint })
  const actions = useActions({ originalDataPoint })

  return (
    <DataRow actions={actions}>
      <DataCell header>{t('nationalDataPoint.references')}</DataCell>
      <DataCell lastCol>
        {displayHistory ? (
          <ODPDiffText
            className="input-text disabled"
            originalDataPoint={originalDataPoint}
            path={['dataSources', '0', 'reference']}
          />
        ) : (
          <EditorWYSIWYGLinks
            disabled={disabled}
            onChange={onChange}
            repository
            validationErrors={validationErrors}
            value={value}
          />
        )}
      </DataCell>
    </DataRow>
  )
}

export default References
