import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { DataSource, dataSourceTypes, RowType } from '@meta/assessment'

import { useCycle } from '@client/store/assessment'
import { useTableSections } from '@client/store/pages/assessmentSection'
import Icon from '@client/components/Icon'
import VerticallyGrowingTextField from '@client/components/VerticallyGrowingTextField'

type Props = {
  disabled: boolean
  dataSource: DataSource
  sectionName: string
  placeholder: boolean

  onChange: (dataSource: DataSource) => void
  onDelete: () => void
}

const DataSourceRow: React.FC<Props> = (props: Props) => {
  const { disabled, dataSource, sectionName, onChange, placeholder, onDelete } = props
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

  const columns = table.props.columnNames[cycle.uuid]

  const rows = table.rows
    .filter((row) => row.props.variableName && row.props.type === RowType.data)
    .map((r) => t(r.props.label?.key))

  return (
    <tr>
      <td className="fra-table__cell-left">
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
      </td>
      <td className="fra-table__cell-left">
        <select disabled={disabled} value={dataSource.type} onChange={(event) => _onChange('type', event.target.value)}>
          {dataSourceTypes.map((type) => (
            <option value={type}>{type}</option>
          ))}
        </select>
      </td>

      <td className="fra-table__cell-left">
        <select
          disabled={disabled}
          value={dataSource.fraVariable}
          onChange={(event) => _onChange('fraVariable', event.target.value)}
        >
          {rows.map((row) => (
            <option value={row}>{row}</option>
          ))}
        </select>
      </td>

      <td className="fra-table__cell-left">
        <select disabled={disabled} value={dataSource.year} onChange={(event) => _onChange('year', event.target.value)}>
          {columns.map((column) => (
            <option value={column}>{column}</option>
          ))}
        </select>
      </td>
      <td className="fra-table__cell-left">
        <VerticallyGrowingTextField
          disabled={disabled}
          onChange={(event) => _onChange('comments', event.target.value)}
        />
      </td>
    </tr>
  )
}
export default DataSourceRow
