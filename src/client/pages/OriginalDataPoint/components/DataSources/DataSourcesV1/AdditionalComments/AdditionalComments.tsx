import React from 'react'
import { useTranslation } from 'react-i18next'

import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { DataTestId } from 'meta/dataTestId/id'

import { DataCell, DataRow } from 'client/components/DataGrid'
import TextArea from 'client/components/Inputs/TextArea'
import { useODPDisplayHistory } from 'client/pages/OriginalDataPoint/components/hooks/useODPDisplayHistory'
import ODPDiffText from 'client/pages/OriginalDataPoint/components/ODPDiffText/ODPDiffText'

import { useIsDisabled } from '../hooks/useIsDisabled'
import { useActions } from './hooks/useActions'
import { useOnChange } from './hooks/useOnChange'

type Props = {
  originalDataPoint: OriginalDataPoint
}

const AdditionalComments: React.FC<Props> = (props: Props) => {
  const { originalDataPoint } = props
  const dataSource = originalDataPoint.dataSources?.at(0)

  const { t } = useTranslation()
  const disabled = useIsDisabled()
  const displayHistory = useODPDisplayHistory()
  const onChange = useOnChange({ originalDataPoint })
  const actions = useActions({ originalDataPoint })

  return (
    <DataRow actions={actions}>
      <DataCell header lastRow>
        {t('nationalDataPoint.additionalComments')}
      </DataCell>
      <DataCell dataTestId={DataTestId.ndpDataSourcesV1AdditionalComments} lastCol lastRow>
        {displayHistory ? (
          <ODPDiffText
            className="input-text disabled"
            originalDataPoint={originalDataPoint}
            path={['dataSources', '0', 'comments']}
          />
        ) : (
          <TextArea disabled={disabled} onChange={onChange} value={dataSource?.comments ?? ''} />
        )}
      </DataCell>
    </DataRow>
  )
}

export default AdditionalComments
