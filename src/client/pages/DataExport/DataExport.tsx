import './DataExport.scss'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Objects } from '@utils/objects'

import { Row } from '@meta/assessment'

import { useAppDispatch } from '@client/store'
import { useCycle } from '@client/store/assessment'
import { useTableSections } from '@client/store/metadata'
import { DataExportActions, useDataExportCountries, useDataExportSelection } from '@client/store/ui/dataExport'
import { useCountryIso } from '@client/hooks'

import ColumnSelect from './ColumnSelect'
import CountrySelect from './CountrySelect'
import ResultsTable from './ResultsTable'
import VariableSelect from './VariableSelect'

const DataExport: React.FC = () => {
  const dispatch = useAppDispatch()

  const countryIso = useCountryIso()
  const cycle = useCycle()

  const { sectionName } = useParams<{
    sectionName: string
  }>()

  useDataExportCountries()
  const selection = useDataExportSelection(sectionName)

  const hasSelection =
    !Objects.isEmpty(selection.countryISOs) &&
    !Objects.isEmpty(selection.sections[sectionName].columns) &&
    !Objects.isEmpty(selection.sections[sectionName].variables)

  let tableName = ''
  let rows: Array<Row> = []
  let columns: Array<string> = []
  const tableSections = useTableSections({ sectionName })
  const tableSection = tableSections.find((tableSection) => tableSection.tables.find((table) => table.props.dataExport))
  const tables = tableSection?.tables
  const table = tables?.find((table) => table.props.dataExport)
  if (table) {
    tableName = table.props.name
    rows = table.rows.filter((row) => !!row.props.variableName)
    columns = table.props.columnsExport[cycle.uuid] ?? table.props.columnNames[cycle.uuid]
  }

  useEffect(() => {
    return () => {
      dispatch(DataExportActions.reset())
    }
  }, [countryIso, dispatch])

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
