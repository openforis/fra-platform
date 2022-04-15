import React, { useEffect } from 'react'

import { useCountryIso } from '@client/hooks'
import { useAppDispatch } from '@client/store'
// import { useDataExportCountries, useDataExportSelection } from '@webapp/store/page/dataExport'
import { DataExportActions, useDataExportCountries } from '@client/store/pages/dataExport'
import { Objects } from '@core/utils'

import CountrySelect from './CountrySelect'
import './DataExport.scss'
// import VariableSelect from './VariableSelect'
// import ColumnSelect from './ColumnSelect'
// import ResultsTable from './ResultsTable'

const DataExport: React.FC = () => {
  const dispatch = useAppDispatch()

  const countryIso = useCountryIso()
  // const assessmentSection = useParamSection()
  const countries = useDataExportCountries()
  // const selection = useDataExportSelection(assessmentSection)

  // const hasSelection =
  //   !Objects.isEmpty(selection.countryISOs) &&
  //   !Objects.isEmpty(selection.sections[assessmentSection].columns) &&
  //   !Objects.isEmpty(selection.sections[assessmentSection].variables)

  useEffect(() => {
    dispatch(DataExportActions.reset())
  }, [countryIso])

  if (Objects.isEmpty(countries)) return null

  return (
    <div className="app-view__content export">
      <div className="export__form">
        <CountrySelect />
        {/* <VariableSelect /> */}
        {/* <ColumnSelect /> */}
      </div>

      {/* {hasSelection && <ResultsTable />} */}
    </div>
  )
}

export default DataExport
