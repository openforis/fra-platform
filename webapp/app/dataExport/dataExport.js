import './dataExport.less'
import React from 'react'
import { Redirect, Route, Switch } from 'react-router'

import * as BasePaths from '@webapp/main/basePaths'
import * as FRA from '@common/assessment/fra'

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
    fetchingResults,
    results,
    hasSelection,
    setSelectionCountries,
    setSelectionVariable,
    setSelectionColumns,
  } = useDataExportState()
  const displayTable = results && Object.keys(results).length > 0 && hasSelection

  return (
    <Switch>
      <Route path={BasePaths.dataExport} exact>
        <Redirect
          to={BasePaths.getDataExportSectionLink(FRA.type, Object.values(FRA.sections['1'].children)[0].name)}
        />
      </Route>

      <Route>
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
            {displayTable && (
              <ResultsTable
                columns={columns}
                selection={selection}
                results={results}
                fetchingResults={fetchingResults}
              />
            )}
          </div>
        </div>
      </Route>
    </Switch>
  )
}

export default DataExport
