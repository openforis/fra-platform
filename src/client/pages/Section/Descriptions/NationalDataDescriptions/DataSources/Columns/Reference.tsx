import React, { useCallback } from 'react'

import classNames from 'classnames'

import { DataSource, SectionName } from 'meta/assessment'
import { TooltipId } from 'meta/tooltip'

import { DataCell } from 'client/components/DataGrid'
import { EditorWYSIWYGLinks } from 'client/components/EditorWYSIWYG'

import { useOnChange } from './hook/useOnChange'
import { useValidationError } from './hook/useValidationError'

type Props = {
  dataSource: DataSource
  disabled: boolean
  lastRow: boolean
  sectionName: SectionName
}

const Reference: React.FC<Props> = (props: Props) => {
  const { dataSource, disabled, lastRow, sectionName } = props

  const onChange = useOnChange({ sectionName, dataSource })

  const _onChange = useCallback(
    (value: string) => {
      onChange('reference', value)
    },
    [onChange]
  )

  const validationError = useValidationError({ dataSource })

  return (
    <DataCell
      className={classNames('data-source__column-reference', { 'validation-error': validationError })}
      data-tooltip-content={validationError}
      data-tooltip-id={TooltipId.error}
      editable={!disabled}
      lastRow={lastRow}
    >
      <EditorWYSIWYGLinks disabled={disabled} onChange={_onChange} repository value={dataSource.reference ?? ''} />
    </DataCell>
  )
}

export default Reference
