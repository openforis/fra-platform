import React from 'react'
import { useTranslation } from 'react-i18next'

import { DataSource, DataSources, SectionName } from 'meta/assessment'
import { DataSourceDescription } from 'meta/assessment/description/nationalDataDataSourceDescription'

import Select, { Option } from 'client/components/Inputs/Select'
import TextArea from 'client/components/Inputs/TextArea'

import { useOnChange } from './hook/useOnChange'

type Props = {
  dataSource: DataSource
  disabled: boolean
  // eslint-disable-next-line react/no-unused-prop-types
  meta: DataSourceDescription
  sectionName: SectionName
}

const VariablesText: React.FC<Props> = (props) => {
  const { dataSource, disabled, sectionName } = props

  const onChange = useOnChange({ sectionName, dataSource })

  const _onChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) =>
    onChange('variables', event.target.value ? [event.target.value] : [])
  const [value] = dataSource.variables ?? []

  return <TextArea disabled={disabled} onChange={_onChange} value={value} />
}

const VariablesSelect: React.FC<Props> = (props) => {
  const { dataSource, disabled, meta, sectionName } = props

  const { t } = useTranslation()

  const onChange = useOnChange({ sectionName, dataSource })

  const options = meta.table.variables.map<Option>((variable) => {
    const { variableName } = variable
    return { label: DataSources.getVariableLabel({ variable, t }), value: variableName }
  })

  const _onChange = (value: string[]) => {
    onChange('variables', value)
  }

  return (
    <Select disabled={disabled} isMulti onChange={_onChange} options={options} toggleAll value={dataSource.variables} />
  )
}

const Variables: React.FC<Props> = (props) => {
  const { dataSource, disabled, meta, sectionName } = props

  const Component = meta.table?.variables?.length > 0 ? VariablesSelect : VariablesText

  return <Component dataSource={dataSource} disabled={disabled} meta={meta} sectionName={sectionName} />
}

export default Variables
