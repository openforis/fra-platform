import React from 'react'
import { useTranslation } from 'react-i18next'

import { CommentableDescriptionName, DataSource, Labels, SectionName } from 'meta/assessment'
import { DataSourceDescription } from 'meta/assessment/description/nationalDataDataSourceDescription'

import { useIsDescriptionEditable } from 'client/store/user/hooks'
import { DataCell } from 'client/components/DataGrid'
import Select from 'client/components/Inputs/Select'
import TextArea from 'client/components/Inputs/TextArea'
import { useOnChange } from 'client/pages/Section/Descriptions/NationalDataDescriptions/DataSources/Columns/hook/useOnChange'

type Props = {
  dataSource: DataSource
  // eslint-disable-next-line react/no-unused-prop-types
  meta: DataSourceDescription
  sectionName: SectionName
}

type InnerProps = Props & { disabled: boolean }

const VariablesText: React.FC<InnerProps> = (props) => {
  const { dataSource, disabled, sectionName } = props

  const onChange = useOnChange({ sectionName, dataSource })

  const _onChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) =>
    onChange('variables', event.target.value ? [event.target.value] : [])
  const [value] = dataSource.variables ?? []

  return <TextArea disabled={disabled} onChange={_onChange} value={value} />
}

const VariablesSelect: React.FC<InnerProps> = (props) => {
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
  const { dataSource, meta, lastRow, sectionName } = props

  const editable = useIsDescriptionEditable({ sectionName, name: CommentableDescriptionName.dataSources })

  const Component = meta.table?.variables?.length > 0 ? VariablesSelect : VariablesText

  return (
    <DataCell editable={editable} lastRow={lastRow}>
      <Component dataSource={dataSource} disabled={!editable} meta={meta} sectionName={sectionName} />
    </DataCell>
  )
}

export default Variables
