import './style.scss'
import React, { memo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { CountryIso } from 'meta/area/countryIso'
import { Labels } from 'meta/assessment/labels'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { useSections } from 'client/store/meta/hooks/sections'
import { useIsPrintRoute } from 'client/hooks/routes'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import Loading from 'client/components/Loading'
import Header from 'client/pages/Print/Header'
import TableOfContent from 'client/pages/Print/TableOfContent'
import Section from 'client/pages/Section'

import { useGetDescriptionValues } from './hooks/useGetDescriptionValues'
import { useGetTableData } from './hooks/useGetTableData'
import { useGetTableSections } from './hooks/useGetTableSections'
import { useLoadPrintFonts } from './hooks/useLoadPrintFonts'

const Print: React.FC = () => {
  const { t } = useTranslation()
  const { assessmentName } = useCountryRouteParams<CountryIso>()
  const cycle = useCycle()
  const sections = useSections()
  const { onlyTables } = useIsPrintRoute()
  useGetTableSections()
  useGetTableData()
  useGetDescriptionValues()
  useLoadPrintFonts()

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

      {sections.map((section) => {
        const { subSections } = section
        const sectionIndex = section.props.index

        return (
          <div key={section.uuid} className="print-break-before" id={`section${sectionIndex}`}>
            {!onlyTables && (
              <h1 className="title only-print">
                {sectionIndex === 0 ? '' : sectionIndex}{' '}
                {Labels.getCycleLabel({ cycle, labels: section.props.labels, t })}
              </h1>
            )}

            {subSections.map((subSection, subSectionIdx) => {
              return (
                <div key={subSection.uuid} className={classNames({ 'print-break-before': subSectionIdx !== 0 })}>
                  <Section key={subSection.uuid} section={subSection.props.name} />
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default memo(Print)
