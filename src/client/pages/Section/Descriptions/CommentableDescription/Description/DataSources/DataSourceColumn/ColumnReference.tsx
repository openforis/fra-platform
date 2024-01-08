import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { DataSource } from 'meta/assessment'
import { TooltipId } from 'meta/tooltip'

import { DataCell } from 'client/components/DataGrid'

import { datasourceValidators } from './datasourceValidators'

interface DataSourceReferenceColumnProps {
  dataSourceValue: DataSource
  disabled: boolean
  onChange: (key: string, value: string) => void
  lastRow: boolean
}

const ColumnReference: React.FC<DataSourceReferenceColumnProps> = (props: DataSourceReferenceColumnProps) => {
  const { dataSourceValue, disabled, onChange, lastRow } = props
  const { t } = useTranslation()

  const _onChange = useCallback(
    (value: string) => {
      onChange('reference', value)
    },
    [onChange]
  )

  const validationError = useMemo(() => {
    return datasourceValidators.referenceText(dataSourceValue.reference)
  }, [dataSourceValue.reference])

  return (
    <DataCell
      lastRow={lastRow}
      data-tooltip-id={TooltipId.error}
      data-tooltip-content={validationError ? t('generalValidation.shouldContainAtLeastOneCharacter') : ''}
      className={classNames('data-source__column-reference', {
        'validation-error': validationError,
      })}
    >
      {disabled && <div>{dataSourceValue.reference}</div>}
      {!disabled && <div>{dataSourceValue.reference}</div>}
    </DataCell>
  )
}

export default ColumnReference
