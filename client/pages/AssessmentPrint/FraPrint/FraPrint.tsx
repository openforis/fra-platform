import './FraPrint.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { useAssessmentSections, useCountry } from '@client/store/assessment'
import { useCountryIso } from '@client/hooks'
import { useIsPrint } from '@client/hooks/useIsPath'
import Loading from '@client/components/Loading'
import AssessmentSection from '@client/pages/AssessmentSection'

import ContactPersons from './ContactPersons'
import TableOfContent from './TableOfContent'

const FraPrint: React.FC = () => {
  const countryIso = useCountryIso()
  const i18n = useTranslation()
  const country = useCountry(countryIso)

  const sections = useAssessmentSections()

  const { onlyTables } = useIsPrint()
  const deskStudy = country?.props?.deskStudy

  if (!sections) {
    return <Loading />
  }

  let title = ''
  if (onlyTables) title = i18n.t('fraReportPrint.titleTables')
  if (!onlyTables && deskStudy) title = `${i18n.t('assessment.fra')} ${i18n.t('assessment.deskStudy')}`
  if (!onlyTables && !deskStudy) title = i18n.t('fraReportPrint.title')

  return (
    <div>
      <div className="fra-print__header">
        <h1>{i18n.t<string>(`area.${countryIso}.listName`)}</h1>
        <h1>{title}</h1>
      </div>

      <hr />

      {!onlyTables && <TableOfContent deskStudy={deskStudy} />}

      {Object.entries(sections).map(([key, section], i) => {
        return (
          <div key={section.uuid} id={`section${key}`}>
            {!onlyTables && (
              <h1 className="title only-print">
                {i === 0 ? '' : key} {i18n.t<string>(section.props.labelKey)}
              </h1>
            )}

            {i === 0 && !deskStudy && <ContactPersons />}

            {Object.values(section.subSections).map((sectionItem) => {
              return <AssessmentSection key={sectionItem.uuid} section={sectionItem.props.name} />
            })}
          </div>
        )
      })}
    </div>
  )
}

export default FraPrint
