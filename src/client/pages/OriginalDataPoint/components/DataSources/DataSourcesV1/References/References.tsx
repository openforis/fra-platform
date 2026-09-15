import React from 'react'
import { useTranslation } from 'react-i18next'

import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { DataCell, DataRow } from 'client/components/DataGrid'
import { EditorWYSIWYGLinks } from 'client/components/EditorWYSIWYG'
import { useODPDisplayHistory } from 'client/pages/OriginalDataPoint/components/hooks/useODPDisplayHistory'
import ODPDiffText from 'client/pages/OriginalDataPoint/components/ODPDiffText/ODPDiffText'

import { useIsDisabled } from '../hooks/useIsDisabled'
import { useActions } from './hooks/useActions'
import { useOnChange } from './hooks/useOnChange'
import { useValidationErrors } from './hooks/useValidationErrors'

type Props = {
  originalDataPoint: OriginalDataPoint
}

const References: React.FC<Props> = (props: Props) => {
  const { originalDataPoint } = props
  const dataSource = originalDataPoint.dataSources?.at(0)
  const value = dataSource?.reference ?? ''

  const { t } = useTranslation()
  const disabled = useIsDisabled()
  const displayHistory = useODPDisplayHistory()
  const validationErrors = useValidationErrors({ originalDataPoint })
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
