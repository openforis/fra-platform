import './FraPrint.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Labels } from 'meta/assessment'

import { useCountry } from 'client/store/area'
import { useCycle } from 'client/store/assessment'
import { useSections } from 'client/store/metadata'
import { useCountryIso } from 'client/hooks'
import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import Loading from 'client/components/Loading'
import { useGetTableData } from 'client/pages/Print/FraPrint/hooks/useGetTableData'
import Section from 'client/pages/Section'

import { useGetDescriptionValues } from './hooks/useGetDescriptionValues'
import { useGetTableSections } from './hooks/useGetTableSections'
import TableOfContent from './TableOfContent'

const FraPrint: React.FC = () => {
  const { t } = useTranslation()
  const countryIso = useCountryIso()

  const cycle = useCycle()
  const country = useCountry(countryIso)
  const sections = useSections()
  const { onlyTables } = useIsPrintRoute()
  useGetTableSections()
  useGetTableData()
  useGetDescriptionValues()
  const deskStudy = country?.props?.deskStudy

  if (!sections) {
    return <Loading />
  }

  let title = ''
  if (onlyTables) title = t('print.titleTables', { cycleName: cycle.name })
  if (!onlyTables && deskStudy) title = `${t('assessment.fra')} ${t('assessment.deskStudy')}`
  if (!onlyTables && !deskStudy) title = t('print.title', { cycleName: cycle.name })

  return (
    <div>
      <div className="fra-print__header">
        <h1>{t(`area.${countryIso}.listName`)}</h1>
        <h1>{title}</h1>
      </div>

      <hr />

      {!onlyTables && <TableOfContent deskStudy={deskStudy} />}

      {Object.entries(sections).map(([key, section], i) => {
        return (
          <div key={section.uuid} id={`section${key}`}>
            {!onlyTables && (
              <h1 className="title only-print">
                {i === 0 ? '' : key} {Labels.getCycleLabel({ cycle, labels: section.props.labels, t })}
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

export default FraPrint
