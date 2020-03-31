import './fraPrintView.less'

import React from 'react'
import { useSelector } from 'react-redux'

import * as Country from '@common/country/country'
import * as Assessment from '@common/assessment/assessment'
import * as FRA from '@common/assessment/fra'

import * as AppState from '@webapp/app/appState'
import * as CountryState from '@webapp/app/country/countryState'

import Loading from '@webapp/components/loading'
import AssessmentSection from '@webapp/app/assessment/components/section/assessmentSectionView/assessmentSection'
import useCountryIso from '@webapp/components/hooks/useCountryIso'
import useI18n from '@webapp/components/hooks/useI18n'

import TableOfContent from './tableOfContent'
import useFraPrintDataFetch from './useFraPrintDataFetch'

const FraPrintView = () => {
  const countryIso = useCountryIso()
  const i18n = useI18n()

  const printOnlyTablesView = useSelector(AppState.isPrintOnlyTablesView)
  const country = useSelector(CountryState.getCountryByCountryIso(countryIso))
  const assessment = useSelector(CountryState.getAssessmentFra2020)
  const deskStudy = Assessment.getDeskStudy(assessment)

  const { dataLoaded } = useFraPrintDataFetch()

  if (!dataLoaded) {
    return <Loading />
  }

  return (
    <div>
      <div className="fra-print__header">
        <h1>{Country.getListName(i18n.language)(country)}</h1>
        <h2>{deskStudy ? i18n.t('assessment.deskStudy') : null}</h2>
        <h1>{i18n.t(`fraReportPrint.${printOnlyTablesView ? 'titleTables' : 'title'}`)}</h1>
      </div>

      <hr />

      {!printOnlyTablesView && (
        <>
          <div className="page-break" />
          <TableOfContent />
          <div className="page-break" />
        </>
      )}

      {Object.values(FRA.sections).map((section) => (
        <div key={section.label}>
          {Object.values(section.children).map((sectionItem) => (
            <AssessmentSection key={sectionItem.name} assessmentType={FRA.type} sectionName={sectionItem.name} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default FraPrintView
