import React from 'react'

import { Arrays } from '@utils/arrays'
import classNames from 'classnames'

import { DataSource } from '@meta/assessment'

import { useCycle } from '@client/store/assessment'
import Autocomplete from '@client/components/Autocomplete'
import DataColumn from '@client/components/DataGrid/DataColumn'

import { datasourceValidators } from './datasourceValidators'

type Props = {
  disabled: boolean
  dataSourceValue: DataSource
  onChange: (key: string, value: string) => void
}

const ColumnVariable: React.FC<Props> = (props: Props) => {
  const { dataSourceValue, disabled, onChange } = props
  const cycle = useCycle()
  const columns = cycle
    ? Arrays.reverse(Arrays.range(1950, Number(cycle.name))).map((col) => ({
        label: String(col),
        value: String(col),
      }))
    : []

  const _onChange = ({ value }: { value: string }) => onChange('year', value)

  return (
    <DataColumn
      className={classNames('data-source-column', {
        'validation-error': datasourceValidators.year(dataSourceValue.year),
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
