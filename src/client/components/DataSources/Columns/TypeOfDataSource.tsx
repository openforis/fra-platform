import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { DataSourceType } from 'meta/assessment/description'
import { Objects } from 'utils/objects'

import { PropsDataSourceComponent } from 'client/components/DataSources/types'
import Select, { Option } from 'client/components/Inputs/Select'
import TextArea from 'client/components/Inputs/TextArea'

const TextInput: React.FC<PropsDataSourceComponent> = (props) => {
  const { dataSource, disabled, onChange } = props

  const _onChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) =>
    onChange(dataSource, 'type', event.target.value)

  return <TextArea disabled={disabled} onChange={_onChange} value={dataSource.type} />
}

const SelectInput: React.FC<PropsDataSourceComponent> = (props) => {
  const { columns, dataSource, disabled, onChange } = props

  const { t } = useTranslation()

  const _onChange = (value: string): void => {
    onChange(dataSource, 'type', value)
  }

  const options = useMemo<Array<Option>>(() => {
    if (!Objects.isEmpty(columns?.type?.options)) return columns.type.options

    return Object.keys(DataSourceType).map((type) => {
      return {
        label: t(`dataSource.${type}`),
        value: type,
      }
    })
  }, [columns?.type?.options, t])

  return (
    <Select
      disabled={disabled}
      isMulti={columns?.type?.isMulti}
      onChange={_onChange}
      options={options}
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
