import './Section.scss'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate } from 'react-router-dom'

import { Labels, SubSections } from 'meta/assessment'
import { Routes } from 'meta/routes'

import { useCycle } from 'client/store/assessment'
import { useIsSectionDataEmpty } from 'client/store/data'
import { useSection, useTableSections } from 'client/store/metadata'
import { useIsEditTableDataEnabled } from 'client/store/user/hooks'
import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'
import { SectionContext, SectionContextValue } from 'client/pages/Section/context'
import Introduction from 'client/pages/Section/Introduction'

import { useGetDescriptionValues } from './hooks/useGetDescriptionValues'
import { useGetTableData } from './hooks/useGetTableData'
import { useListenNodeUpdates } from './hooks/useListenNodeUpdates'
import DataTable from './DataTable'
import Descriptions, { GeneralComments } from './Descriptions'
import SectionHeader from './SectionHeader'
import Title from './Title'

type Props = {
  section?: string
}

const Section: React.FC<Props> = (props: Props) => {
  const { section: sectionProp } = props

  const { t } = useTranslation()
  const { assessmentName, cycleName, countryIso } = useSectionRouteParams()
  const cycle = useCycle()
  const subSection = useSection(sectionProp)
  const tableSections = useTableSections({ sectionName: subSection?.props.name })
  useGetTableData({ sectionName: subSection?.props.name })
  useGetDescriptionValues({ sectionName: subSection?.props.name })
  const canEditTableData = useIsEditTableDataEnabled(sectionProp)
  const { print, onlyTables } = useIsPrintRoute()
  useListenNodeUpdates({ countryIso, assessmentName, cycleName: cycle.name })

  const { showTitle, descriptions, name: sectionName } = subSection?.props ?? {}
  const contextValue = useMemo<SectionContextValue>(() => ({ sectionName }), [sectionName])
  // Hide the whole section if no tables have data
  const isSectionDataEmpty = useIsSectionDataEmpty(tableSections)

  if (!subSection) {
    return <Navigate replace to={Routes.Country.generatePath({ assessmentName, cycleName, countryIso })} />
  }

  if (onlyTables && isSectionDataEmpty) {
    return null
  }

  const anchor = SubSections.getAnchor({ cycle, subSection })
  const renderGeneralComments = !onlyTables && descriptions[cycle.uuid].comments
  const renderIntroductoryText = !onlyTables && descriptions[cycle.uuid].introductoryText

  return (
    <SectionContext.Provider value={contextValue}>
      <div className={`app-view__content assessment-section section__${sectionName}`}>
        {showTitle && print && (
          <h2 className="title only-print">
            {`${onlyTables ? '' : `${anchor} `}${Labels.getCycleLabel({ cycle, labels: subSection.props.labels, t })}`}
          </h2>
        )}

        <SectionHeader />

        <Descriptions descriptions={descriptions[cycle.uuid]} />
        {showTitle && <Title subSection={subSection} />}

        {tableSections.map((tableSection) => {
          const label = Labels.getCycleLabel({ cycle, labels: tableSection.props.labels, t })
          const description = Labels.getCycleLabel({ cycle, labels: tableSection.props.descriptions, t })
          return (
            <React.Fragment key={tableSection.uuid}>
              {label && <h3 className="subhead assessment-section__table-title">{label}</h3>}
              {description && (
                <div className="app-view__section-toolbar no-print">
                  <div className="support-text">{description}</div>
                </div>
              )}

              {tableSection.tables.map((table) => (
                <React.Fragment key={table.props.name}>
                  <DataTable
                    assessmentName={assessmentName}
                    disabled={!canEditTableData}
                    sectionAnchor={anchor}
                    sectionName={sectionName}
                    table={table}
                  />
                  {table.props.print?.pageBreakAfter && <div className="page-break" />}
                </React.Fragment>
              ))}
            </React.Fragment>
          )
        })}

        {renderIntroductoryText && <Introduction />}

        {renderGeneralComments && <GeneralComments />}
      </div>
    </SectionContext.Provider>
  )
}

Section.defaultProps = {
  section: undefined,
}

export default Section
