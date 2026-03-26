import './DataExport.scss'
import React, { useEffect } from 'react'

import { AssessmentName, AssessmentNames } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { Row } from 'meta/assessment/row'
import { SectionName } from 'meta/assessment/section'
import { Objects } from 'utils/objects'

import { DataExportActions } from 'client/store/dataExport/actions'
import { useDataExportCountries, useDataExportSelection } from 'client/store/dataExport/hooks/dataExport'
import { useAppDispatch } from 'client/store/hooks'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { useTableSections } from 'client/store/meta/hooks/tableSections'
import { useCountryIso } from 'client/hooks/country'
import { useSectionRouteParams } from 'client/hooks/routeParams'

import ColumnSelect from './ColumnSelect'
import CountrySelect from './CountrySelect'
import ResultsTable from './ResultsTable'
import VariableSelect from './VariableSelect'

type ExcludeFromDataExport = Partial<
  Record<AssessmentName, Partial<Record<CycleName, Record<SectionName, Array<string>>>>>
>

const columnsExcludeFromDataExport: ExcludeFromDataExport = {
  [AssessmentNames.panEuropean]: {
    '2025': {
      areaWithForestLandDegradation: ['unknownMixedDegradation'],
    },
  },
}

const DataExport: React.FC = () => {
  const dispatch = useAppDispatch()

  const countryIso = useCountryIso()
  const cycle = useCycle()

  const { assessmentName, cycleName, sectionName } = useSectionRouteParams()

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
    const columnsExclude = columnsExcludeFromDataExport[assessmentName]?.[cycleName]?.[sectionName] ?? []
    tableName = table.props.name
    rows = table.rows.filter((row) => !!row.props.variableName && !row.props.excludeFromDataExport?.[cycle.uuid])
    columns = (table.props.columnsExport[cycle.uuid] ?? table.props.columnNames[cycle.uuid]).filter(
      (col) => !columnsExclude.includes(col)
    )
  }

  useEffect(() => {
    return (): void => {
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
