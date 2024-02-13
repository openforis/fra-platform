import React from 'react'
import { useTranslation } from 'react-i18next'

import { DataSource, Labels, SectionName } from 'meta/assessment'
import { DataSourceDescription } from 'meta/assessment/description/nationalDataDataSourceDescription'

import { DataCell } from 'client/components/DataGrid'
import Select from 'client/components/Inputs/Select'
import TextArea from 'client/components/Inputs/TextArea'
import { useOnChange } from 'client/pages/Section/Descriptions/NationalDataDescriptions/DataSources/Columns/hook/useOnChange'

type Props = {
  disabled: boolean
  dataSource: DataSource
  meta: DataSourceDescription
  sectionName: SectionName
}

const VariablesText: React.FC<Omit<Props, 'meta'>> = (props: Omit<Props, 'meta'>) => {
  const { dataSource, disabled, sectionName } = props

  const onChange = useOnChange({ sectionName, dataSource })

  const _onChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) =>
    onChange('variables', event.target.value ? [event.target.value] : [])
  const [value] = dataSource.variables ?? []

  return <TextArea disabled={disabled} onChange={_onChange} value={value} />
}

const VariablesSelect: React.FC<Props> = (props: Props) => {
  const { dataSource, disabled, meta, sectionName } = props

  const { t } = useTranslation()

  const onChange = useOnChange({ sectionName, dataSource })

  const options = meta.table.variables.map(({ variableName, label: _label, prefixLabel }) => {
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

  return <Select isMulti disabled={disabled} value={dataSource.variables} onChange={_onChange} options={options} />
}

const Variables: React.FC<Props & { lastRow: boolean }> = (props) => {
  const { disabled, meta, lastRow } = props

  const multiSelect = meta.table?.variables?.length > 0

  return (
    <DataCell editable={!disabled} lastRow={lastRow}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      {multiSelect ? <VariablesSelect {...props} /> : <VariablesText {...props} />}
    </DataCell>
  )
}

export default Variables
