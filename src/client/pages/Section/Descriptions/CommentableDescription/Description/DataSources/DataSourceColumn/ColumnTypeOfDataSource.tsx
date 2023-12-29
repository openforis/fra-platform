import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { DataSource, DataSourceType } from 'meta/assessment'
import { DataSourceDescription } from 'meta/assessment/description/nationalDataDataSourceDescription'

import Select from 'client/components/Inputs/Select'
import { DataCell } from 'client/components/DataGrid'
import TextArea from 'client/components/Inputs/TextArea'

type Props = {
  disabled: boolean
  dataSourceValue: DataSource
  onChange: (key: string, value: string) => void
}

const TextInput: React.FC<Props> = (props: Props) => {
  const { dataSourceValue, disabled, onChange } = props
  const _onChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => onChange('type', event.target.value)
  return <TextArea disabled={disabled} onChange={_onChange} value={dataSourceValue.type} />
}

const SelectInput: React.FC<Props> = (props: Props) => {
  const { dataSourceValue, disabled, onChange } = props

  const { t } = useTranslation()
  const _onChange = (value: string) => onChange('type', value)

  const options = useMemo(() => {
    return Object.keys(DataSourceType).map((type) => {
      return {
        label: t(`dataSource.${type}`),
        value: type,
      }
    })
  }, [t])

  return <Select disabled={disabled} onChange={_onChange} options={options} value={dataSourceValue.type} />
}

const ColumnTypeOfDataSource: React.FC<Props & { dataSourceMetadata: DataSourceDescription; lastRow: boolean }> = (
  props: Props & { dataSourceMetadata: DataSourceDescription; lastRow: boolean }
) => {
  const { dataSourceMetadata, lastRow } = props
  const { typeOfDataSourceText } = dataSourceMetadata?.table || {}

  return (
    <DataCell lastRow={lastRow}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      {typeOfDataSourceText ? <TextInput {...props} /> : <SelectInput {...props} />}
    </DataCell>
  )
}

export default ColumnTypeOfDataSource
