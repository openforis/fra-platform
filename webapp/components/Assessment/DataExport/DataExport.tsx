import './DataExport.scss'
import React from 'react'

import { Objects } from '@core/utils'
// import useDataExportState from './useDataExportState'

import CountrySelect from './CountrySelect'
import VariableSelect from './components/variableSelect'
import ColumnSelect from './components/columnSelect'
import ResultsTable from '@webapp/components/Assessment/DataExport/components/resultsTable'
import { useDataExportCountries } from '@webapp/store/page/dataExport'

const DataExport: React.FC = () => {
  // const {
  //   countries,
  //   selection,
  //   variables,
  //   columns,
  //   columnsAlwaysExport,
  //   results,
  //   resultsLoading,
  //   hasSelection,
  //   setSelectionCountries,
  //   setSelectionVariable,
  //   setSelectionColumns,
  // } = useDataExportState()

  const countries = useDataExportCountries()

  if (Objects.isEmpty(countries)) return null

  return (
    <div className="app-view__content export">
      <div className="export__form">
        <CountrySelect />
        {/*  <VariableSelect*/}
        {/*    variables={variables}*/}
        {/*    selectionVariable={selection.variable}*/}
        {/*    setSelectionVariable={setSelectionVariable}*/}
        {/*  />*/}
        {/*  <ColumnSelect*/}
        {/*    columns={columns}*/}
        {/*    selectionColumns={selection.columns}*/}
        {/*    setSelectionColumns={setSelectionColumns}*/}
        {/*  />*/}
        {/*</div>*/}
        {/*<div className="export__table">*/}
        {/*  {hasSelection && (*/}
        {/*    <ResultsTable*/}
        {/*      resultsLoading={resultsLoading}*/}
        {/*      columns={columns}*/}
        {/*      columnsAlwaysExport={columnsAlwaysExport}*/}
        {/*      selection={selection}*/}
        {/*      results={results}*/}
        {/*    />*/}
        {/*  )}*/}
      </div>
    </div>
  )
}

export default DataExport
