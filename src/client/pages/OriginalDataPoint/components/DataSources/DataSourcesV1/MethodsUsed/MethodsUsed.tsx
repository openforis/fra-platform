import React from 'react'
import { useTranslation } from 'react-i18next'

import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { DataCell, DataRow } from 'client/components/DataGrid'
import Select from 'client/components/Inputs/Select'
import { useOptionsMethodsUsed } from 'client/pages/OriginalDataPoint/components/DataSources/hooks/useOptionsMethodsUsed'
import { useODPDisplayHistory } from 'client/pages/OriginalDataPoint/components/hooks/useODPDisplayHistory'
import ODPDiffText from 'client/pages/OriginalDataPoint/components/ODPDiffText/ODPDiffText'

import { useIsDisabled } from '../hooks/useIsDisabled'
import { useActions } from './hooks/useActions'
import { useOnChange } from './hooks/useOnChange'

type Props = {
  originalDataPoint: OriginalDataPoint
}

const MethodsUsed: React.FC<Props> = (props: Props) => {
  const { originalDataPoint } = props
  const dataSource = originalDataPoint.dataSources?.at(0)

  const { t } = useTranslation()
  const disabled = useIsDisabled()
  const displayHistory = useODPDisplayHistory()
  const options = useOptionsMethodsUsed()
  const onChange = useOnChange({ originalDataPoint })
  const actions = useActions({ originalDataPoint })

  return (
    <DataRow actions={actions}>
      <DataCell header>{t('nationalDataPoint.methodsUsed')}</DataCell>
      <DataCell lastCol>
        {displayHistory ? (
          <ODPDiffText
            className="input-text disabled"
            originalDataPoint={originalDataPoint}
            path={['dataSources', '0', 'type']}
          />
        ) : (
          <Select disabled={disabled} isMulti onChange={onChange} options={options} value={dataSource?.type ?? []} />
        )}
      </DataCell>
    </DataRow>
  )
}

export default MethodsUsed
