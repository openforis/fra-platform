import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { DataSource, dataSourceType } from '@meta/assessment'

import Autocomplete from '@client/components/Autocomplete'
import DataColumn from '@client/components/DataGrid/DataColumn'

type Props = {
  disabled: boolean
  dataSource: DataSource
  onChange: (key: string, value: string) => void
}

type Item = {
  label: string
  value: string
}

const ColumnTypeOfDataSource: React.FC<Props> = (props: Props) => {
  const { dataSource, disabled, onChange } = props
  const { t } = useTranslation()
  const _onChange = ({ value }: Item) => onChange('type', value)

  const items = useMemo(() => {
    return Object.keys(dataSourceType).map((type) => {
      return {
        label: t(`dataSource.${type}`),
        value: type,
      }
    })
  }, [t])

  return (
    <DataColumn className="data-source-column">
      <Autocomplete
        labelKey="label"
        withArrow
        disabled={disabled}
        onSave={_onChange}
        value={dataSource.type ? t(`dataSource.${dataSource.type}`) : ''}
        items={items}
      />
    </DataColumn>
  )
}
export default ColumnTypeOfDataSource
