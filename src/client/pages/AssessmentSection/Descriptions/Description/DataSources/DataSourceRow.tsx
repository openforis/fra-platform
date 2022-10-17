import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from '@utils/objects'

import { DataSource, dataSourceTypes, RowType } from '@meta/assessment'

import { useCycle } from '@client/store/assessment'
import { useTableSections } from '@client/store/pages/assessmentSection'
import Autocomplete from '@client/components/Autocomplete'
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

  const columns = table.props.columnNames[cycle.uuid].map((c) =>
    Number.isInteger(+c) ? c : t(`${sectionName}.${Objects.camelize(c)}`)
  )

  const rows = table.rows
    .filter((row) => row.props.variableName && row.props.type === RowType.data)
    .map((r, index) => t(r.props.label?.key, { idx: index + 1 }))

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
        <Autocomplete
          withArrow
          disabled={disabled}
          onSave={(value) => _onChange('type', value)}
          value={dataSource.type}
          items={dataSourceTypes}
        />
      </td>

      <td className="fra-table__cell-left">
        <Autocomplete
          withArrow
          disabled={disabled}
          onSave={(value) => _onChange('fraVariable', value)}
          value={dataSource.fraVariable}
          items={rows}
        />
      </td>

      <td className="fra-table__cell-left">
        <Autocomplete
          withArrow
          disabled={disabled}
          onSave={(value) => _onChange('year', value)}
          value={dataSource.year}
          items={columns}
        />
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
