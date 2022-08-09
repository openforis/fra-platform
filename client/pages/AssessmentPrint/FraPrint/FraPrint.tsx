import './FraPrint.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { AssessmentName } from '@meta/assessment'

import { useAssessmentSections } from '@client/store/assessment'
import { useCountryIso } from '@client/hooks'
// import { Assessment, FRA } from '@core/assessment'
// import * as CountryState from '@webapp/app/country/countryState'
// import SectionView from '@webapp/components/Assessment/SectionView'
import Loading from '@client/components/Loading'
import AssessmentSection from '@client/pages/AssessmentSection'

// import ContactPersonsPrintView from '@webapp/sectionSpec/fra/contactPersons/contactPersonsPrintView'
import TableOfContent from './TableOfContent'
// import useFraPrintDataFetch from './useFraPrintDataFetch'

const FraPrint: React.FC = () => {
  const countryIso = useCountryIso()
  const i18n = useTranslation()

  const sections = useAssessmentSections()
  console.log(sections)

  // eslint-disable-next-line no-sparse-arrays
  const [, printOnlyTablesView] = [, false] // usePrintView()
  // const { dataLoaded } = useFraPrintDataFetch(countryIso)
  // const assessment: Assessment = useSelector(CountryState.getAssessmentFra2020) as Assessment
  // const { deskStudy } = assessment

  const deskStudy = true
  const dataLoaded = true

  if (!dataLoaded || !sections) {
    return <Loading />
  }

  // @ts-ignore
  window.isReadyForPDF = true

  let title = ''
  if (printOnlyTablesView) title = i18n.t('fraReportPrint.titleTables')
  if (!printOnlyTablesView && deskStudy) title = `${i18n.t('assessment.fra2020')} ${i18n.t('assessment.deskStudy')}`
  if (!printOnlyTablesView && !deskStudy) title = i18n.t('fraReportPrint.title')

  console.log(sections)

  return (
    <div>
      <div className="fra-print__header">
        <h1>{i18n.t<string>(`area.${countryIso}.listName`)}</h1>
        <h1>{title}</h1>
      </div>

      <hr />

      {!printOnlyTablesView && <TableOfContent deskStudy={deskStudy} />}

      {Object.entries(sections).map(([key, section]) => (
        <div key={section.uuid} id={`section${key}`}>
          {!printOnlyTablesView && (
            <h1 className="title only-print">
              {Number(key) === 0 ? '' : key} {i18n.t<string>(section.props.labelKey)}
            </h1>
          )}

          {key === '0' && !deskStudy && <pre>{`<ContactPersonsPrintView />`}</pre>}

          {Object.values(section.subSections).map((sectionItem) => {
            // return <p>{JSON.stringify(key)}</p>
            return <AssessmentSection key={sectionItem.uuid} sectionNameProp={sectionItem.props.name} />
          })}
        </div>
      ))}
    </div>
  )
}

export default FraPrint
