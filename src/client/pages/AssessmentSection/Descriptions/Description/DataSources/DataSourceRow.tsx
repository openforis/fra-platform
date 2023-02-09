import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { Arrays } from '@utils/arrays'
import { Objects } from '@utils/objects'
import classNames from 'classnames'

import { Cols, ColType, DataSource, dataSourceType, Row, RowType } from '@meta/assessment'

import { useCycle } from '@client/store/assessment'
import { useTableSections } from '@client/store/ui/assessmentSection'
import { useCountryIso } from '@client/hooks'
import Autocomplete from '@client/components/Autocomplete'
import DataColumn from '@client/components/DataGrid/DataColumn'
import MultiSelect from '@client/components/MultiSelect'
import ReviewIndicator from '@client/components/ReviewIndicator'
import VerticallyGrowingTextField from '@client/components/VerticallyGrowingTextField'
import DataSourceReferenceColumn from '@client/pages/AssessmentSection/Descriptions/Description/DataSources/DataSourceReferenceColumn'

type Props = {
  disabled: boolean
  dataSource: DataSource
  sectionName: string
  placeholder: boolean
  index: number

  onChange: (dataSource: DataSource) => void
  onDelete: () => void
}

export const datasourceValidators: Record<string, (x: string) => boolean> = {
  // check at least one character exists
  referenceText: (text) => !(Objects.isEmpty(text) || /[A-Za-z]/.test(text)),
  // check that reference link is link format
  referenceLink: (link) => !Objects.isEmpty(link) || /^https?:\/\/[^\s$.?#].[^\s]*$/i.test(link),
  // check that is number
  year: (yearString) => !(Objects.isEmpty(yearString) || Number.isInteger(Number(yearString))),
  // check at least one character exists
  comment: (commentString) => !(Objects.isEmpty(commentString) || /[A-Za-z]/.test(commentString)),
}

const DataSourceRow: React.FC<Props> = (props: Props) => {
  const { disabled, dataSource, sectionName, onChange, placeholder, onDelete, index } = props
  const countryIso = useCountryIso()
  const cycle = useCycle()
  const tableSections = useTableSections({ sectionName })
  const { t } = useTranslation()

  const _onChange = useCallback(
    (field: string, value: string | Record<string, string>) => {
      if (dataSource[field as keyof DataSource] === value) return
      onChange({
        ...dataSource,
        [field]: value,
      })
    },
    [dataSource, onChange]
  )

  const table = tableSections?.[0]?.tables?.[0]
  if (!table) return null

  const columns = cycle ? Arrays.reverse(Arrays.range(1950, Number(cycle.name))).map(String) : []

  const _allColumnsCalculated = (row: Row) =>
    row.cols.every((col) => [ColType.header, ColType.calculated].includes(col.props.colType))
  const rows = table.rows
    ?.filter((row) => row.props.variableName && row.props.type === RowType.data && !_allColumnsCalculated(row))
    .map((r) => t(Cols.getLabel({ cycle, col: r.cols[0], t })))

  return (
    <>
      <DataSourceReferenceColumn
        disabled={disabled}
        dataSource={dataSource}
        onChange={_onChange}
        placeholder={placeholder}
        onDelete={onDelete}
      />

      <DataColumn className="data-source-column">
        <Autocomplete
          withArrow
          disabled={disabled}
          onSave={(value) => _onChange('type', value)}
          value={dataSource.type}
          items={Object.keys(dataSourceType).map((type) => t(`dataSource.${type}`))}
        />
      </DataColumn>

      <DataColumn className="data-source-column">
        <MultiSelect
          disabled={disabled}
          values={dataSource.fraVariables ?? []}
          options={rows}
          onChange={(value: any) => {
            _onChange('fraVariables', value)
          }}
        />
      </DataColumn>

      <DataColumn
        className={classNames('data-source-column', { 'validation-error': datasourceValidators.year(dataSource.year) })}
      >
        <Autocomplete
          withArrow
          disabled={disabled}
          onSave={(value) => _onChange('year', value)}
          value={dataSource.year}
          items={columns}
        />
      </DataColumn>

      <DataColumn
        className={classNames('data-source-column', {
          'validation-error': datasourceValidators.comment(dataSource.comments),
        })}
      >
        {' '}
        <VerticallyGrowingTextField
          disabled={disabled}
          onChange={(event) => _onChange('comments', event.target.value)}
          value={dataSource.comments}
        />
      </DataColumn>
      <DataColumn className="data-source-review-indicator">
        {!disabled && (
          <ReviewIndicator
            title={`${dataSource.fraVariables?.join(', ')} | ${dataSource.year}`}
            topicKey={`dataSource-${countryIso}-${sectionName}-${index}`}
          />
        )}
      </DataColumn>
    </>
  )
}
export default DataSourceRow
