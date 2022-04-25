import './DataExport.scss'
import React, { useEffect } from 'react'
import { useParams } from 'react-router'

import { Objects } from '@core/utils'

import { Col, Cols, ColType, Row } from '@meta/assessment'

import { useAppDispatch } from '@client/store'
import { useTableSections } from '@client/store/pages/assessmentSection'
import { DataExportActions, useDataExportCountries, useDataExportSelection } from '@client/store/pages/dataExport'
import { useCountryIso } from '@client/hooks'
import { isYearRangeUnderscore } from '@client/pages/DataExport/utils/checks'

import ColumnSelect from './ColumnSelect'
import CountrySelect from './CountrySelect'
import ResultsTable from './ResultsTable'
import VariableSelect from './VariableSelect'

const DataExport: React.FC = () => {
  const dispatch = useAppDispatch()

  const countryIso = useCountryIso()
  const { section: assessmentSection } = useParams<{
    section: string
  }>()

  const countries = useDataExportCountries()
  const selection = useDataExportSelection(assessmentSection)

  const hasSelection =
    !Objects.isEmpty(selection.countryISOs) &&
    !Objects.isEmpty(selection.sections[assessmentSection].columns) &&
    !Objects.isEmpty(selection.sections[assessmentSection].variables)

  let rows: Array<Row> = []
  let columns: Array<string> = []
  let tableName = ''
  const tableSections = useTableSections({ sectionName: assessmentSection })
  if (!Objects.isEmpty(tableSections)) {
    // if (Objects.isEmpty(tableSections)) return null
    const { tables } = tableSections.find((tableSection) => tableSection.tables.find((table) => table.props.dataExport))
    const table = tables.find((table) => table.props.dataExport)
    tableName = table.props.name
    rows = table.rows.filter((row) => !!row.props.variableName)
    const cols = rows.reduce(
      (prev: Array<Col>, curr: Row) => [...prev, ...curr.cols.filter((col) => col.props.colType !== ColType.header)],
      []
    )
    const colIndexes = Cols.getColIndexes({ rows, cols })
    columns = colIndexes.map((colIdx) => {
      const colName = Cols.getColName({ colIdx, cols })
      return isYearRangeUnderscore(colName) ? colName.replace('_', '-') : colName
    })
  }

  useEffect(() => {
    return () => {
      dispatch(DataExportActions.reset())
    }
  }, [countryIso])

  if (Objects.isEmpty(countries)) return null

  return (
    <div className="app-view__content export">
      <div className="export__form">
        <CountrySelect />
        <VariableSelect variables={rows} />
        <ColumnSelect columns={columns} />
      </div>

      {hasSelection && <ResultsTable tableName={tableName} />}
    </div>
  )
}

export default DataExport
