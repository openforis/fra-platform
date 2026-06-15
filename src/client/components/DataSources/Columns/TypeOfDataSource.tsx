import React from 'react'

import { PropsDataSourceComponent } from 'client/components/DataSources/types'
import Select from 'client/components/Inputs/Select'
import TextArea from 'client/components/Inputs/TextArea'

const TextInput: React.FC<PropsDataSourceComponent> = (props) => {
  const { dataSource, disabled, onChange } = props

  const _onChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) =>
    onChange(dataSource, 'type', event.target.value)

  return <TextArea disabled={disabled} onChange={_onChange} value={dataSource.type} />
}

const SelectInput: React.FC<PropsDataSourceComponent> = (props) => {
  const { columns, dataSource, disabled, onChange } = props

  const _onChange = (value: string): void => {
    onChange(dataSource, 'type', value)
  }

  return (
    <Select
      disabled={disabled}
      isMulti={columns.type.isMulti}
      onChange={_onChange}
      options={columns.type.options}
      value={dataSource.type}
    />
  )
}

const TypeOfDataSource: React.FC<PropsDataSourceComponent> = (props) => {
  const { columns, dataSource, disabled, meta, onChange } = props

  const Component = meta?.table?.typeOfDataSourceText ? TextInput : SelectInput

  return <Component columns={columns} dataSource={dataSource} disabled={disabled} meta={meta} onChange={onChange} />
}

export default TypeOfDataSource
