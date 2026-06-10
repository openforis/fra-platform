import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { DataSourceType } from 'meta/assessment/description'
import { Objects } from 'utils/objects'

import { PropsDataSourceComponent } from 'client/components/DataSources/types'
import Select, { Option } from 'client/components/Inputs/Select'
import TextArea from 'client/components/Inputs/TextArea'

import { useOnChange } from './hook/useOnChange'

const TextInput: React.FC<PropsDataSourceComponent> = (props) => {
  const { dataSource, disabled, sectionName } = props

  const onChange = useOnChange({ sectionName, dataSource })

  const _onChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => onChange('type', event.target.value)
  return <TextArea disabled={disabled} onChange={_onChange} value={dataSource.type} />
}

const SelectInput: React.FC<PropsDataSourceComponent> = (props) => {
  const { columns, dataSource, disabled, sectionName } = props

  const { t } = useTranslation()
  const onChange = useOnChange({ sectionName, dataSource })
  const _onChange = (value: string): void => {
    onChange('type', value)
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
  const { meta } = props

  const Component = meta?.table?.typeOfDataSourceText ? TextInput : SelectInput

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...props} />
}

export default TypeOfDataSource
