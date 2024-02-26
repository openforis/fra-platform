import './style.scss'
import React, { memo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area/countryIso'
import { Labels } from 'meta/assessment'

import { useCountry } from 'client/store/area'
import { useCycle } from 'client/store/assessment'
import { useSections } from 'client/store/metadata'
import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import Loading from 'client/components/Loading'
import TableOfContent from 'client/pages/Print/TableOfContent'
import Section from 'client/pages/Section'

import { useGetDescriptionValues } from './hooks/useGetDescriptionValues'
import { useGetTableData } from './hooks/useGetTableData'
import { useGetTableSections } from './hooks/useGetTableSections'

const Print: React.FC = () => {
  const { t } = useTranslation()
  const { assessmentName, countryIso } = useCountryRouteParams<CountryIso>()
  const cycle = useCycle()
  const country = useCountry(countryIso)
  const sections = useSections()
  const { onlyTables } = useIsPrintRoute()
  useGetTableSections()
  useGetTableData()
  useGetDescriptionValues()

  // body height is 100vh. unset height to print all pages
  useEffect(() => {
    document.body.style.height = 'unset'
  }, [])

  const deskStudy = country?.props?.deskStudy

  if (!sections || !assessmentName) {
    return <Loading />
  }

  let title = ''
  if (onlyTables) title = t(`${assessmentName}.print.titleTables`, { cycleName: cycle.name })
  if (!onlyTables && deskStudy) title = `${t(`assessment.${assessmentName}`)} ${t('assessment.deskStudy')}`
  if (!onlyTables && !deskStudy) title = t(`${assessmentName}.print.title`, { cycleName: cycle.name })

  return (
    <div className="print__container">
      <div className="print__header">
        <h1>{t(`area.${countryIso}.listName`)}</h1>
        <h1>{title}</h1>
      </div>

      <hr />

      {!onlyTables && <TableOfContent deskStudy={deskStudy} />}

      {Object.values(sections).map((section) => {
        const sectionIndex = section.props.index
        return (
          <div key={section.uuid} id={`section${sectionIndex}`}>
            {!onlyTables && (
              <h1 className="title only-print">
                {sectionIndex === 0 ? '' : sectionIndex}{' '}
                {Labels.getCycleLabel({ cycle, labels: section.props.labels, t })}
              </h1>
            )}

            {Object.values(section.subSections).map((sectionItem) => {
              return <Section key={sectionItem.uuid} section={sectionItem.props.name} />
            })}
          </div>
        )
      })}
    </div>
  )
}

export default memo(Print)
