import './style.scss'
import React, { memo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area/countryIso'
import { Labels } from 'meta/assessment'

import { useCycle } from 'client/store/assessment'
import { useSections } from 'client/store/metadata'
import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import Loading from 'client/components/Loading'
import Header from 'client/pages/Print/Header'
import TableOfContent from 'client/pages/Print/TableOfContent'
import Section from 'client/pages/Section'

import { useGetDescriptionValues } from './hooks/useGetDescriptionValues'
import { useGetTableData } from './hooks/useGetTableData'
import { useGetTableSections } from './hooks/useGetTableSections'

const Print: React.FC = () => {
  const { t } = useTranslation()
  const { assessmentName } = useCountryRouteParams<CountryIso>()
  const cycle = useCycle()
  const sections = useSections()
  const { onlyTables } = useIsPrintRoute()
  useGetTableSections()
  useGetTableData()
  useGetDescriptionValues()

  // body height is 100vh. unset height to print all pages
  useEffect(() => {
    document.body.style.height = 'unset'
  }, [])

  if (!sections || !assessmentName) {
    return <Loading />
  }

  return (
    <div className="print__container">
      <Header />

      <hr />

      {!onlyTables && <TableOfContent />}

      {sections.map((section, sectionIdx) => {
        const { subSections } = section
        const sectionIndex = section.props.index

        return (
          <div key={section.uuid} id={`section${sectionIndex}`}>
            {!onlyTables && (
              <h1 className="title only-print">
                {sectionIndex === 0 ? '' : sectionIndex}{' '}
                {Labels.getCycleLabel({ cycle, labels: section.props.labels, t })}
              </h1>
            )}

            {subSections.map((subSection, subSectionIdx) => {
              const lastSection = sectionIdx === sections.length - 1 && subSectionIdx === subSections.length - 1
              return (
                <React.Fragment key={subSection.uuid}>
                  <Section section={subSection.props.name} />
                  {!lastSection && <div className="page-break" />}
                </React.Fragment>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default memo(Print)
