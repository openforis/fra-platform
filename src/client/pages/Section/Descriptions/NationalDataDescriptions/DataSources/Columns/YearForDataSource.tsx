import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'
import { Objects } from 'utils/objects'

import { DataSource, SectionName } from 'meta/assessment'
import { TooltipId } from 'meta/tooltip'

import { DataCell } from 'client/components/DataGrid'
import TextArea from 'client/components/Inputs/TextArea'

import { useOnChange } from './hook/useOnChange'

type Props = {
  dataSource: DataSource
  disabled: boolean
  highlighted?: boolean
  lastRow: boolean
  sectionName: SectionName
}

const YearForDataSource: React.FC<Props> = (props: Props) => {
  const { dataSource, disabled, highlighted, lastRow, sectionName } = props

  const { t } = useTranslation()
  const onChange = useOnChange({ sectionName, dataSource })

  const validationError = useMemo(() => {
    return !dataSource.placeholder && Objects.isEmpty(dataSource.year)
  }, [dataSource.placeholder, dataSource.year])

  const _onChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => onChange('year', event.target.value)

  return (
    <DataCell
      className={classNames({ 'validation-error': validationError })}
      data-tooltip-content={validationError ? t('generalValidation.notEmpty') : ''}
      data-tooltip-id={TooltipId.error}
      editable={!disabled}
      highlighted={highlighted}
      lastRow={lastRow}
    >
      <TextArea disabled={disabled} onChange={_onChange} value={dataSource.year} />
    </DataCell>
  )
}

YearForDataSource.defaultProps = {
  highlighted: false,
}

export default YearForDataSource
