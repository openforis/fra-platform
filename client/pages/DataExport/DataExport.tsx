import './DataExport.scss'
import React, { useEffect } from 'react'
import { useParams } from 'react-router'

// import { Objects } from '@core/utils'
// import { useDataExportCountries, useDataExportSelection } from '@webapp/store/page/dataExport'
import { AssessmentName } from '@meta/assessment'
import { AssessmentSectionActions } from '@client/store/pages/assessmentSection'
import { useAppDispatch } from '@client/store'
import { useCountryIso } from '@client/hooks'
import { useAssessmentSection } from '@client/store/assessment'

// import CountrySelect from './CountrySelect'
// import VariableSelect from './VariableSelect'
// import ColumnSelect from './ColumnSelect'
// import ResultsTable from './ResultsTable'

const DataExport: React.FC = () => {
  const assessmentSection = useAssessmentSection()

  const { assessmentName, cycleName, section } = useParams<{
    assessmentName: AssessmentName
    cycleName: string
    section: string
  }>()

  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()

  useEffect(() => {
    dispatch(AssessmentSectionActions.reset())
    dispatch(
      AssessmentSectionActions.getTableSections({
        assessmentName,
        cycleName,
        section,
        countryIso,
      })
    )
  }, [countryIso, assessmentSection])

  if (!assessmentSection) return null

  // const assessmentSection = useParamSection()
  // const countries = useDataExportCountries()
  // const selection = useDataExportSelection(assessmentSection)

  // const hasSelection =
  //   !Objects.isEmpty(selection.countryISOs) &&
  //   !Objects.isEmpty(selection.sections[assessmentSection].columns) &&
  //   !Objects.isEmpty(selection.sections[assessmentSection].variables)

  // if (Objects.isEmpty(countries)) return null

  return (
    <div className="app-view__content export">
      <div className="export__form">
        {/* <CountrySelect /> */}
        {/* <VariableSelect /> */}
        {/* <ColumnSelect /> */}
      </div>

      {/* {hasSelection && <ResultsTable />} */}
    </div>
  )
}

export default DataExport
