import React from 'react'

import classNames from 'classnames'

import { DataSource } from 'meta/assessment'

import DataColumn from 'client/components/DataGrid/DataColumn'
import VerticallyGrowingTextField from 'client/components/VerticallyGrowingTextField'

import { datasourceValidators } from './datasourceValidators'

type Props = {
  disabled: boolean
  dataSourceValue: DataSource
  onChange: (key: string, value: string) => void
}

const ColumnComments: React.FC<Props> = (props: Props) => {
  const { dataSourceValue, disabled, onChange } = props
  const _onChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => onChange('comments', event.target.value)
  return (
    <DataColumn
      className={classNames('data-source-column', {
        'validation-error': datasourceValidators.comment(dataSourceValue.comments),
      })}
    >
      <div className="data-source__text-area-wrapper">
        <VerticallyGrowingTextField disabled={disabled} onChange={_onChange} value={dataSourceValue.comments} />
      </div>
    </DataColumn>
  )
}
export default ColumnComments
