import './fraPrintView.less'
import React from 'react'
import { useSelector } from 'react-redux'
import * as Assessment from '@common/assessment/assessment'
import FRA from '@common/assessment/fra'
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
  const assessment = useSelector(CountryState.getAssessmentFra2020)
  const deskStudy = Assessment.getDeskStudy(assessment)
  const { dataLoaded } = useFraPrintDataFetch(countryIso)
  if (!dataLoaded) {
    return <Loading />
  }
  ;(window as any).isReadyForPDF = true
  let title = ''
  if (printOnlyTablesView) title = (i18n as any).t('fraReportPrint.titleTables')
  if (!printOnlyTablesView && deskStudy)
    title = `${(i18n as any).t('assessment.fra2020')} ${(i18n as any).t('assessment.deskStudy')}`
  if (!printOnlyTablesView && !deskStudy) title = (i18n as any).t('fraReportPrint.title')
  return (
    <div>
      <div className="fra-print__header">
        <h1>{(i18n as any).t(`area.${countryIso}.listName`)}</h1>
        <h1>{title}</h1>
      </div>

      <hr />

      {!printOnlyTablesView && <TableOfContent deskStudy={deskStudy} />}

      {Object.entries(FRA.sections).map(([key, section]) => (
        <div key={(section as any).label} id={`section${key}`}>
          {!printOnlyTablesView && (
            <h1 className="title only-print">
              {Number(key) === 0 ? '' : key} {(i18n as any).t((section as any).label)}
            </h1>
          )}

          {Number(key) === 0 && !deskStudy && <ContactPersonsPrintView />}

          {Object.values((section as any).children).map((sectionItem) => (
            <AssessmentSection
              key={(sectionItem as any).name}
              assessmentType={FRA.type}
              sectionName={(sectionItem as any).name}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
export default FraPrintView
