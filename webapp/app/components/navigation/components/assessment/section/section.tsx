import './section.less'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { matchPath, useLocation } from 'react-router-dom'
import * as BasePaths from '@webapp/main/basePaths'
import ReviewStatus from '@webapp/app/components/navigation/components/assessment/section/reviewStatus'
import Subsection from '@webapp/app/components/navigation/components/assessment/section/navigationLink'
import useI18n from '@webapp/components/hooks/useI18n'
import * as ReviewStatusState from '@webapp/app/country/reviewStatusState'
import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpecs'
import { useIsDataExportView } from '@webapp/components/hooks'

type Props = {
  assessment: any
  section: any
  showSections: boolean
  prefix: string
}
const Section = (props: Props) => {
  const {
    assessment: { type: assessmentType },
    section,
    showSections,
    prefix,
  } = props
  const i18n = useI18n()
  const isDataExport = useIsDataExportView()
  const { pathname } = useLocation()
  const childStatus = useSelector(ReviewStatusState.getStatusSectionChildren(section))
  const [expanded, setExpanded] = useState(false)
  const sectionLabel = (i18n as any).t(section.label)
  useEffect(() => {
    setExpanded(showSections)
  }, [showSections])
  // On mount check whether the location matches a child path
  useEffect(() => {
    const match = Object.values(section.children).find((subsection) => {
      const path = BasePaths.assessmentSection.replace(':section', (subsection as any).name)
      return matchPath(pathname, { path })
    })
    if (match) {
      setExpanded(true)
    }
  }, [])
  const children = Object.values(section.children)
  const filteredChildren = isDataExport
    ? children.filter(
        (subsection) => SectionSpec.getSectionSpec(assessmentType, (subsection as any).name).dataExport.included
      )
    : children
  if (!filteredChildren.length) {
    return null
  }
  filteredChildren.sort((child1, child2) =>
    (child1 as any).anchor.localeCompare((child2 as any).anchor, undefined, { numeric: true })
  )
  return (
    <div className="nav-section">
      <div
        className="nav-section__header"
        role="button"
        aria-label={sectionLabel}
        tabIndex={0}
        onClick={() => setExpanded(!expanded)}
        onKeyDown={() => {}}
      >
        <div className="nav-section__order">{prefix}</div>
        <div className="nav-section__label">{sectionLabel}</div>
        {!expanded && !isDataExport && (
          <div className="nav-section__status-content">
            <ReviewStatus status={childStatus} />
          </div>
        )}
      </div>
      <div className={`nav-section__items-${expanded ? 'visible' : 'hidden'}`}>
        {expanded &&
          filteredChildren.map((subsection) => (
            <Subsection
              prefix={(subsection as any).anchor}
              assessmentType={assessmentType}
              key={(subsection as any).anchor}
              sectionName={(subsection as any).name}
            />
          ))}
      </div>
    </div>
  )
}
export default Section
