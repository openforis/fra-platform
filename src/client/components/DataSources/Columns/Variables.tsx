import React from 'react'
import { useTranslation } from 'react-i18next'

import { DataSources } from 'meta/assessment/descriptionValue/dataSources'

import { PropsDataSourceComponent } from 'client/components/DataSources/types'
import Select, { Option } from 'client/components/Inputs/Select'
import TextArea from 'client/components/Inputs/TextArea'

const VariablesText: React.FC<PropsDataSourceComponent> = (props) => {
  const { dataSource, disabled, onChange } = props

  const _onChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) =>
    onChange(dataSource, 'variables', event.target.value ? [event.target.value] : [])
  const [value] = dataSource.variables ?? []

  return <TextArea disabled={disabled} onChange={_onChange} value={value} />
}

const VariablesSelect: React.FC<PropsDataSourceComponent> = (props) => {
  const { dataSource, disabled, meta, onChange } = props

  const { t } = useTranslation()

  const options = meta.table.variables.map<Option>((variable) => {
    const { variableName } = variable
    return { label: DataSources.getVariableLabel({ variable, t }), value: variableName }
  })

  const _onChange = (value: Array<string>): void => {
    onChange(dataSource, 'variables', value)
  }

  return (
    <Select disabled={disabled} isMulti onChange={_onChange} options={options} toggleAll value={dataSource.variables} />
  )
}

const Variables: React.FC<PropsDataSourceComponent> = (props) => {
  const { columns, dataSource, disabled, meta, onChange } = props

  const Component = meta.table?.variables?.length > 0 ? VariablesSelect : VariablesText

  return <Component columns={columns} dataSource={dataSource} disabled={disabled} meta={meta} onChange={onChange} />
}

export default Variables
