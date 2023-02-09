import React from 'react'
import { useTranslation } from 'react-i18next'

import { DataSource, dataSourceType } from '@meta/assessment'

import Autocomplete from '@client/components/Autocomplete'
import DataColumn from '@client/components/DataGrid/DataColumn'

type Props = {
  disabled: boolean
  dataSource: DataSource
  onChange: (key: string, value: string) => void
}

const ColumnTypeOfDataSource: React.FC<Props> = (props: Props) => {
  const { dataSource, disabled, onChange } = props
  const { t } = useTranslation()
  const _onChange = (value: string) => onChange('type', value)
  return (
    <DataColumn className="data-source-column">
      <Autocomplete
        withArrow
        disabled={disabled}
        onSave={_onChange}
        value={dataSource.type}
        items={Object.keys(dataSourceType).map((type) => t(`dataSource.${type}`))}
      />
    </DataColumn>
  )
}
export default ColumnTypeOfDataSource
