import './fraPrintView.less'

import React from 'react'
import { useSelector } from 'react-redux'

import * as Country from '@common/country/country'
import * as Assessment from '@common/assessment/assessment'
import * as FRA from '@common/assessment/fra'

import * as CountryState from '@webapp/app/country/countryState'

import Loading from '@webapp/components/loading'
import AssessmentSection from '@webapp/app/assessment/components/section/assessmentSectionView/assessmentSection'
import ContactPersonsPrintView from '@webapp/app/assessment/fra/sections/contactPersons/contactPersonsPrintView'
import { useCountryIso, useI18n, usePrintView } from '@webapp/components/hooks'

import TableOfContent from './tableOfContent'
import useFraPrintDataFetch from './useFraPrintDataFetch'

const FraPrintView = () => {
  const countryIso = useCountryIso()
  const i18n = useI18n()

  const [, printOnlyTablesView] = usePrintView()
  const country = useSelector(CountryState.getCountryByCountryIso(countryIso))
  const assessment = useSelector(CountryState.getAssessmentFra2020)
  const deskStudy = Assessment.getDeskStudy(assessment)

  const { dataLoaded } = useFraPrintDataFetch(countryIso)

  if (!dataLoaded) {
    return <Loading />
  }

  return (
    <div>
      <div className="fra-print__header">
        <h1>
          {Country.getListName(i18n.language)(country)}
          {deskStudy && <span className="desk-study">({i18n.t('assessment.deskStudy')})</span>}
        </h1>
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

      <ContactPersonsPrintView />
      <div className="page-break" />

      {Object.entries(FRA.sections).map(([key, section]) => (
        <div key={section.label} id={`section${key}`}>
          {Number(key) !== 0 && !printOnlyTablesView && (
            <h1 className="title only-print">
              {key} {i18n.t(section.label)}
            </h1>
          )}

          {Object.values(section.children).map((sectionItem) => (
            <AssessmentSection key={sectionItem.name} assessmentType={FRA.type} sectionName={sectionItem.name} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default FraPrintView
