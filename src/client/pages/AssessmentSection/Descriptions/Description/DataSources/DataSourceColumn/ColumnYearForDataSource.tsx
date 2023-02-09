import React from 'react'

import { Arrays } from '@utils/arrays'
import classNames from 'classnames'

import { DataSource } from '@meta/assessment'

import { useCycle } from '@client/store/assessment'
import Autocomplete from '@client/components/Autocomplete'
import DataColumn from '@client/components/DataGrid/DataColumn'

import { datasourceValidators } from './DataSourceColumn'

type Props = {
  disabled: boolean
  dataSource: DataSource
  onChange: (key: string, value: string) => void
}

const ColumnVariable: React.FC<Props> = (props: Props) => {
  const { dataSource, disabled, onChange } = props
  const cycle = useCycle()
  const columns = cycle ? Arrays.reverse(Arrays.range(1950, Number(cycle.name))).map(String) : []

  const _onChange = (value: string) => onChange('year', value)

  return (
    <DataColumn
      className={classNames('data-source-column', {
        'validation-error': datasourceValidators.year(dataSource.year),
      })}
    >
      <Autocomplete withArrow disabled={disabled} onSave={_onChange} value={dataSource.year} items={columns} />
    </DataColumn>
  )
}
export default ColumnVariable
