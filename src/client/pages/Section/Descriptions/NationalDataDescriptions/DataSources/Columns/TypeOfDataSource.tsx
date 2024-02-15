import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { CommentableDescriptionName, DataSource, DataSourceType, SectionName } from 'meta/assessment'
import { DataSourceDescription } from 'meta/assessment/description/nationalDataDataSourceDescription'

import { useIsDescriptionEditable } from 'client/store/user/hooks'
import { DataCell } from 'client/components/DataGrid'
import Select from 'client/components/Inputs/Select'
import TextArea from 'client/components/Inputs/TextArea'

import { useOnChange } from './hook/useOnChange'

type Props = {
  dataSource: DataSource
  sectionName: SectionName
}

type InnerProps = Props & { disabled: boolean }

const TextInput: React.FC<InnerProps> = (props) => {
  const { dataSource, disabled, sectionName } = props

  const onChange = useOnChange({ sectionName, dataSource })

  const _onChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => onChange('type', event.target.value)
  return <TextArea disabled={disabled} onChange={_onChange} value={dataSource.type} />
}

const SelectInput: React.FC<InnerProps> = (props) => {
  const { dataSource, disabled, sectionName } = props

  const { t } = useTranslation()
  const onChange = useOnChange({ sectionName, dataSource })
  const _onChange = (value: string) => onChange('type', value)

  const options = useMemo(() => {
    return Object.keys(DataSourceType).map((type) => {
      return {
        label: t(`dataSource.${type}`),
        value: type,
      }
    })
  }, [t])

  return <Select disabled={disabled} onChange={_onChange} options={options} value={dataSource.type} />
}

const TypeOfDataSource: React.FC<Props & { meta: DataSourceDescription; lastRow: boolean }> = (props) => {
  const { dataSource, meta, lastRow, sectionName } = props

  const editable = useIsDescriptionEditable({ sectionName, name: CommentableDescriptionName.dataSources })

  const Component = meta?.table?.typeOfDataSourceText ? TextInput : SelectInput

  return (
    <DataCell editable={editable} lastRow={lastRow}>
      <Component dataSource={dataSource} disabled={!editable} sectionName={sectionName} />
    </DataCell>
  )
}

export default TypeOfDataSource
