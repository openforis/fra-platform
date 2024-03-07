import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'
import { Objects } from 'utils/objects'

import { DataSource, DataSourceType, SectionName } from 'meta/assessment'
import { DataSourceDescription } from 'meta/assessment/description/nationalDataDataSourceDescription'
import { TooltipId } from 'meta/tooltip'

import { DataCell } from 'client/components/DataGrid'
import Select from 'client/components/Inputs/Select'
import TextArea from 'client/components/Inputs/TextArea'

import { useOnChange } from './hook/useOnChange'

type Props = {
  dataSource: DataSource
  disabled: boolean
  sectionName: SectionName
}

const TextInput: React.FC<Props> = (props) => {
  const { dataSource, disabled, sectionName } = props

  const onChange = useOnChange({ sectionName, dataSource })

  const _onChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => onChange('type', event.target.value)
  return <TextArea disabled={disabled} onChange={_onChange} value={dataSource.type} />
}

const SelectInput: React.FC<Props> = (props) => {
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
  const { dataSource, disabled, meta, lastRow, sectionName } = props

  const { t } = useTranslation()

  const validationError = useMemo(() => {
    return !dataSource.placeholder && Objects.isEmpty(dataSource.type)
  }, [dataSource.placeholder, dataSource.type])

  const Component = meta?.table?.typeOfDataSourceText ? TextInput : SelectInput

  return (
    <DataCell
      className={classNames({ 'validation-error': validationError })}
      data-tooltip-content={validationError ? t('generalValidation.notEmpty') : ''}
      data-tooltip-id={TooltipId.error}
      editable={!disabled}
      lastRow={lastRow}
    >
      <Component dataSource={dataSource} disabled={disabled} sectionName={sectionName} />
    </DataCell>
  )
}

export default TypeOfDataSource
