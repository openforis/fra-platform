import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'
import { Objects } from 'utils/objects'

import { DataSource, Labels, SectionName } from 'meta/assessment'
import { DataSourceDescription } from 'meta/assessment/description/nationalDataDataSourceDescription'
import { TooltipId } from 'meta/tooltip'

import { DataCell } from 'client/components/DataGrid'
import Select from 'client/components/Inputs/Select'
import TextArea from 'client/components/Inputs/TextArea'
import { useOnChange } from 'client/pages/Section/Descriptions/NationalDataDescriptions/DataSources/Columns/hook/useOnChange'

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
  const { dataSource, disabled, meta, lastRow, sectionName } = props

  const { t } = useTranslation()

  const validationError = useMemo(() => {
    return !dataSource.placeholder && Objects.isEmpty(dataSource.variables)
  }, [dataSource.placeholder, dataSource.variables])

  const Component = meta.table?.variables?.length > 0 ? VariablesSelect : VariablesText

  return (
    <DataCell
      className={classNames({ 'validation-error': validationError })}
      data-tooltip-content={validationError ? t('generalValidation.notEmpty') : ''}
      data-tooltip-id={TooltipId.error}
      editable={!disabled}
      lastRow={lastRow}
    >
      <Component dataSource={dataSource} disabled={disabled} meta={meta} sectionName={sectionName} />
    </DataCell>
  )
}

export default Variables
