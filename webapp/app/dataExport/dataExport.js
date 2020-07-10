import './dataExport.less'
import React from 'react'

import ResultsTable from '@webapp/app/dataExport/components/resultsTable'
import useDataExportState from './useDataExportState'
import CountrySelect from './components/countrySelect'
import VariableSelect from './components/variableSelect'
import ColumnSelect from './components/columnSelect'

const DataExport = () => {
  const {
    countries,
    selection,
    variables,
    columns,
    results,
    resultsLoading,
    hasSelection,
    setSelectionCountries,
    setSelectionVariable,
    setSelectionColumns,
  } = useDataExportState()

  return (
    <div className="app-view__content export">
      <div className="export__form">
        <CountrySelect
          countries={countries}
          selectionCountries={selection.countries}
          setSelectionCountries={setSelectionCountries}
        />
        <VariableSelect
          variables={variables}
          selectionVariable={selection.variable}
          setSelectionVariable={setSelectionVariable}
        />
        <ColumnSelect
          columns={columns}
          selectionColumns={selection.columns}
          setSelectionColumns={setSelectionColumns}
        />
      </div>
      <div className="export__table">
        {hasSelection && (
          <ResultsTable resultsLoading={resultsLoading} columns={columns} selection={selection} results={results} />
        )}
      </div>
    </div>
  )
}

export default DataExport
