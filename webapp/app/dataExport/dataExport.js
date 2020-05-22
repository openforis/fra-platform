import './dataExport.less'
import React from 'react'
import { Redirect, Route, Switch } from 'react-router'

import * as BasePaths from '@webapp/main/basePaths'
import * as FRA from '@common/assessment/fra'

import VariableSelect from '@webapp/app/dataExport/components/variableSelect'
import useDataExportState from './useDataExportState'
import CountrySelect from './components/countrySelect'

const DataExport = () => {
  const { countries, selection, variables, setSelectionCountries, setSelectionVariable } = useDataExportState()

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
            <VariableSelect variables={variables} setSelectionVariable={setSelectionVariable} />
          </div>
          <div className="export__table" />
        </div>
      </Route>
    </Switch>
  )
}

export default DataExport
