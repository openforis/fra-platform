import './dataExport.less'
import React from 'react'
import { Redirect, Route, Switch } from 'react-router'

import * as BasePaths from '@webapp/main/basePaths'
import * as FRA from '@common/assessment/fra'

import useDataExportState from './useDataExportState'
import CountrySelect from './countrySelect'

const DataExport = () => {
  const { countries, selection, setSelectionCountries } = useDataExportState()

  return (
    <Switch>
      <Route path={BasePaths.dataExport} exact>
        <Redirect to={BasePaths.getDataExportSectionLink(Object.values(FRA.sections['1'].children)[0].name)} />
      </Route>

      <Route>
        <div className="app-view__content export">
          <div className="export__form">
            <CountrySelect
              countries={countries}
              selectionCountries={selection.countries}
              setSelectionCountries={setSelectionCountries}
            />
          </div>
          <div className="export__table" />
        </div>
      </Route>
    </Switch>
  )
}

export default DataExport
