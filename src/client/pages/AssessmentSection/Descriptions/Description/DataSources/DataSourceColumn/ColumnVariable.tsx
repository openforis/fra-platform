import React from 'react'

import classNames from 'classnames'

import { DataSource } from '@meta/assessment'

import DataColumn from '@client/components/DataGrid/DataColumn'
import VerticallyGrowingTextField from '@client/components/VerticallyGrowingTextField'

type Props = {
  disabled: boolean
  dataSource: DataSource
  onChange: (key: string, value: string) => void
}

const ColumnVariable: React.FC<Props> = (props: Props) => {
  const { dataSource, disabled, onChange } = props
  const _onChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => onChange('variable', event.target.value)
  return (
    <DataColumn className={classNames('data-source-column')}>
      <VerticallyGrowingTextField disabled={disabled} onChange={_onChange} value={dataSource.variable} />
    </DataColumn>
  )
}
export default ColumnVariable
