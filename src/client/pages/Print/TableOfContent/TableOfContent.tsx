import './TableOfContent.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area'
import { AssessmentNames, Labels } from 'meta/assessment'

import { useCountry } from 'client/store/area'
import { useCycle } from 'client/store/assessment'
import { useSections } from 'client/store/metadata'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

const TableOfContent: React.FC = () => {
  const { t } = useTranslation()
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const cycle = useCycle()
  const country = useCountry(countryIso)
  const sections = useSections()

  const deskStudy = country?.props?.deskStudy

  return (
    <>
      <div className="page-break" />

      {assessmentName === AssessmentNames.fra && (
        <>
          <div className="disclaimer">
            <p>{t(`${assessmentName}.print.disclaimer`)}</p>
            <p>
              {deskStudy
                ? t(`${assessmentName}.print.disclaimerGeneratedDeskStudy`)
                : t(`${assessmentName}.print.disclaimerGenerated`, { cycleName })}
            </p>
          </div>
          <div className="page-break" />
        </>
      )}

      <div>
        <h2 className="table-of-content__header">{t(`${assessmentName}.print.tableOfContent`)}</h2>

        <ol className="table-of-content__list">
          {sections.map((section) => {
            const sectionIndex = section.props.index
            return (
              <li key={sectionIndex} data-idx={sectionIndex}>
                <a href={`#section${sectionIndex}`}>
                  {Labels.getCycleLabel({ cycle, labels: section.props.labels, t })}
                </a>
              </li>
            )
          })}
        </ol>
      </div>

      <div className="page-break" />
    </>
  )
}

export default TableOfContent
