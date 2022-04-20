import './DataExport.scss'
import React, { useEffect } from 'react'

// import { useParams } from 'react-router'
import { Objects } from '@core/utils'

import { useAppDispatch } from '@client/store'
// import { useDataExportCountries, useDataExportSelection } from '@webapp/store/page/dataExport'
import { DataExportActions, useDataExportCountries } from '@client/store/pages/dataExport'
import { useCountryIso } from '@client/hooks'

import ColumnSelect from './ColumnSelect'
import CountrySelect from './CountrySelect'
import VariableSelect from './VariableSelect'
// import ResultsTable from './ResultsTable'

const DataExport: React.FC = () => {
  const dispatch = useAppDispatch()

  const countryIso = useCountryIso()
  // const { section: assessmentSection } = useParams<{
  //   section: string
  // }>()
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
        <VariableSelect />
        <ColumnSelect />
      </div>

      {/* {hasSelection && <ResultsTable />} */}
    </div>
  )
}

export default DataExport
