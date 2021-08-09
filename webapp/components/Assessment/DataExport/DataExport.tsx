import './DataExport.scss'
import React from 'react'

import { Objects } from '@core/utils'
import { useDataExportCountries, useDataExportSelection } from '@webapp/store/page/dataExport'
import { useParamSection } from '@webapp/components/hooks'

import CountrySelect from './CountrySelect'
import VariableSelect from './VariableSelect'
import ColumnSelect from './ColumnSelect'
import ResultsTable from './ResultsTable'

const DataExport: React.FC = () => {
  const assessmentSection = useParamSection()
  const countries = useDataExportCountries()
  const selection = useDataExportSelection(assessmentSection)

  const hasSelection =
    !Objects.isEmpty(selection.countryISOs) &&
    !Objects.isEmpty(selection.columns) &&
    !Objects.isEmpty(selection.variable)

  if (Objects.isEmpty(countries)) return null

  return (
    <div className="app-view__content export">
      <div className="export__form">
        <CountrySelect />
        <VariableSelect />
        <ColumnSelect />
      </div>

      <div className="export__table">{hasSelection && <ResultsTable />}</div>
    </div>
  )
}

export default DataExport
