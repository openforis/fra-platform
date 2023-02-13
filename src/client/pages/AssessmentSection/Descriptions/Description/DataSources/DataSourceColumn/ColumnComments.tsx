import React from 'react'

import classNames from 'classnames'

import { DataSource } from '@meta/assessment'

import DataColumn from '@client/components/DataGrid/DataColumn'
import VerticallyGrowingTextField from '@client/components/VerticallyGrowingTextField'
import { datasourceValidators } from '@client/pages/AssessmentSection/Descriptions/Description/DataSources/DataSourceColumn/DataSourceColumn'

type Props = {
  disabled: boolean
  dataSource: DataSource
  onChange: (key: string, value: string) => void
}

const ColumnComments: React.FC<Props> = (props: Props) => {
  const { dataSource, disabled, onChange } = props
  const _onChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => onChange('comments', event.target.value)
  return (
    <DataColumn
      className={classNames('data-source-column', {
        'validation-error': datasourceValidators.comment(dataSource.comments),
      })}
    >
      <VerticallyGrowingTextField disabled={disabled} onChange={_onChange} value={dataSource.comments} />
    </DataColumn>
  )
}
export default ColumnComments
