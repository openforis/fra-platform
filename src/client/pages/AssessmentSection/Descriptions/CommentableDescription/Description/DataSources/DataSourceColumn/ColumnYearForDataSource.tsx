import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'
import { Arrays } from 'utils/arrays'

import { DataSource } from 'meta/assessment'
import { TooltipId } from 'meta/tooltip'

import { useCycle } from 'client/store/assessment'
import Autocomplete from 'client/components/Autocomplete'
import DataColumn from 'client/components/DataGrid/DataColumn'

import { datasourceValidators } from './datasourceValidators'

type Props = {
  disabled: boolean
  dataSourceValue: DataSource
  onChange: (key: string, value: string) => void
}

const ColumnVariable: React.FC<Props> = (props: Props) => {
  const { dataSourceValue, disabled, onChange } = props
  const { t } = useTranslation()
  const cycle = useCycle()
  const columns = cycle
    ? Arrays.reverse(Arrays.range(1950, Number(cycle.name))).map((col) => ({
        label: String(col),
        value: String(col),
      }))
    : []

  const _onChange = ({ value }: { value: string }) => onChange('year', value)

  const validationError = useMemo(() => {
    return datasourceValidators.year(dataSourceValue.year)
  }, [dataSourceValue.year])

  return (
    <DataColumn
      data-tooltip-id={TooltipId.error}
      data-tooltip-content={validationError ? t('generalValidation.valueMustBeYear') : ''}
      className={classNames('data-source-column', {
        'validation-error': validationError,
      })}
    >
      <Autocomplete
        readOnlyOptions
        disabled={disabled}
        onSave={_onChange}
        value={dataSourceValue.year}
        items={columns}
      />
    </DataColumn>
  )
}
export default ColumnVariable
