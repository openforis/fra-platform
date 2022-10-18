import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from '@utils/objects'

import { DataSource, dataSourceTypeLabelKeys, RowType } from '@meta/assessment'

import { useCycle } from '@client/store/assessment'
import { useTableSections } from '@client/store/pages/assessmentSection'
import { useCountryIso } from '@client/hooks'
import Autocomplete from '@client/components/Autocomplete'
import DataColumn from '@client/components/DataGrid/DataColumn'
import Icon from '@client/components/Icon'
import ReviewIndicator from '@client/components/ReviewIndicator'
import VerticallyGrowingTextField from '@client/components/VerticallyGrowingTextField'

type Props = {
  disabled: boolean
  dataSource: DataSource
  sectionName: string
  placeholder: boolean
  index: number

  onChange: (dataSource: DataSource) => void
  onDelete: () => void
}

const DataSourceRow: React.FC<Props> = (props: Props) => {
  const { disabled, dataSource, sectionName, onChange, placeholder, onDelete, index } = props
  const countryIso = useCountryIso()
  const cycle = useCycle()
  const tableSections = useTableSections({ sectionName })
  const { t } = useTranslation()

  const _onChange = useCallback(
    (field: string, value: string) => {
      if (dataSource[field as keyof DataSource] === value) return
      if (!value) return
      onChange({
        ...dataSource,
        [field]: value,
      })
    },
    [dataSource, onChange]
  )

  const table = tableSections?.[0]?.tables?.[0]
  if (!table) return null

  const columns = table.props.columnNames[cycle.uuid].map((c) =>
    Number.isInteger(+c) ? c : t(`${sectionName}.${Objects.camelize(c)}`)
  )

  const rows = table.rows
    .filter((row) => row.props.variableName && row.props.type === RowType.data)
    .map((r, index) => t(r.props.label?.key, { idx: index + 1 }))

  return (
    <>
      <DataColumn className="data-source-column">
        <div className="data-source__delete-wrapper">
          {!placeholder && !disabled && (
            <button type="button" onClick={onDelete}>
              <Icon name="remove" />
            </button>
          )}
          <VerticallyGrowingTextField
            disabled={disabled}
            onChange={(event) => _onChange('reference', event.target?.value)}
            value={dataSource.reference}
          />
        </div>
      </DataColumn>
      <DataColumn className="data-source-column">
        <Autocomplete
          withArrow
          disabled={disabled}
          onSave={(value) => _onChange('type', value)}
          value={dataSource.type}
          items={dataSourceTypeLabelKeys.map((type) => t(`dataSource.${type}`))}
        />
      </DataColumn>

      <DataColumn className="data-source-column">
        <Autocomplete
          withArrow
          disabled={disabled}
          onSave={(value) => _onChange('fraVariable', value)}
          value={dataSource.fraVariable}
          items={rows}
        />
      </DataColumn>

      <DataColumn className="data-source-column">
        <Autocomplete
          withArrow
          disabled={disabled}
          onSave={(value) => _onChange('year', value)}
          value={dataSource.year}
          items={columns}
        />
      </DataColumn>

      <DataColumn className="data-source-column">
        <VerticallyGrowingTextField
          disabled={disabled}
          onChange={(event) => _onChange('comments', event.target.value)}
          value={dataSource.comments}
        />
      </DataColumn>
      <DataColumn className="data-source-review-indicator">
        {!disabled && (
          <ReviewIndicator
            title={`${dataSource.fraVariable} | ${dataSource.year}`}
            topicKey={`dataSource-${countryIso}-${sectionName}-${index}`}
          />
        )}
      </DataColumn>
    </>
  )
}
export default DataSourceRow
