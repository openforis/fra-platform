import './TableOfContent.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area'
import { AssessmentNames } from 'meta/assessment/assessment'
import { Labels } from 'meta/assessment/labels'

import { useCountry } from 'client/store/area'
import { useCycle } from 'client/store/meta/assessment/hooks/cycles'
import { useSections } from 'client/store/metadata'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

const TableOfContent: React.FC = () => {
  const { t } = useTranslation()
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const cycle = useCycle()
  const country = useCountry(countryIso)
  const sections = useSections()

  const deskStudy = country?.props?.deskStudy

  return (
    <>
      {assessmentName === AssessmentNames.fra && (
        <div className="disclaimer print-break-before">
          <p>{t(`${assessmentName}.print.disclaimer`)}</p>
          <p>
            {deskStudy
              ? t(`${assessmentName}.print.disclaimerGeneratedDeskStudy`)
              : t(`${assessmentName}.print.disclaimerGenerated`, { cycleName })}
          </p>
        </div>
      )}

      <div className="print-break-before">
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
    </>
  )
}

export default TableOfContent
