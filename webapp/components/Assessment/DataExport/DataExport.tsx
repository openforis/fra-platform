import './DataExport.scss'
import React from 'react'

import { Objects } from '@core/utils'
import { useDataExportCountries } from '@webapp/store/page/dataExport'

import CountrySelect from './CountrySelect'
import VariableSelect from './VariableSelect'
import ColumnSelect from './ColumnSelect'
import ResultsTable from './components/resultsTable'

const DataExport: React.FC = () => {
  const countries = useDataExportCountries()

  if (Objects.isEmpty(countries)) return null

  return (
    <div className="app-view__content export">
      <div className="export__form">
        <CountrySelect />
        <VariableSelect />
        <ColumnSelect />
      </div>

      <div className="export__table">
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
