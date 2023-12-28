import React from 'react'
import { useTranslation } from 'react-i18next'

import { DataSource, Labels } from 'meta/assessment'
import { DataSourceDescription } from 'meta/assessment/description/nationalDataDataSourceDescription'

import DataColumn from 'client/components/DataGridDeprecated/DataColumn'
import Select from 'client/components/Inputs/Select'
import VerticallyGrowingTextField from 'client/components/VerticallyGrowingTextField'

type Props = {
  disabled: boolean
  dataSourceValue: DataSource
  onChange: (key: keyof DataSource, value: any) => void
  dataSourceMetadata: DataSourceDescription
}

const Variable: React.FC<Omit<Props, 'dataSourceMetadata'>> = (props: Omit<Props, 'dataSourceMetadata'>) => {
  const { dataSourceValue, disabled, onChange } = props
  const _onChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) =>
    onChange('variables', event.target.value ? [event.target.value] : [])
  const [value] = dataSourceValue.variables ?? []

  return <VerticallyGrowingTextField disabled={disabled} onChange={_onChange} value={value} />
}

const Variables: React.FC<Props> = (props: Props) => {
  const { dataSourceValue, disabled, onChange, dataSourceMetadata } = props

  const { t } = useTranslation()

  const options = dataSourceMetadata.table.variables.map(({ variableName, label: _label, prefixLabel }) => {
    let label = ''
    if (prefixLabel) {
      label = Labels.getLabel({ label: prefixLabel, t })
      label += ' '
    }
    label += Labels.getLabel({ label: _label, t })

    return {
      label,
      value: variableName,
    }
  })

  const _onChange = (value: string[]) => {
    onChange('variables', value)
  }

  return <Select isMulti disabled={disabled} value={dataSourceValue.variables} onChange={_onChange} options={options} />
}

const ColumnVariables: React.FC<Props> = (props: Props) => {
  const { dataSourceMetadata } = props
  const multiSelect = dataSourceMetadata.table?.variables?.length > 0
  return (
    <DataColumn className="data-source-column">
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      {multiSelect ? <Variables {...props} /> : <Variable {...props} />}
    </DataColumn>
  )
}

export default ColumnVariables
