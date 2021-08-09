import './Section.scss'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { matchPath, useLocation } from 'react-router-dom'

import { Assessment, AssessmentSection } from '@core/assessment'
import { SectionSpecs } from '@webapp/sectionSpec'
import { ReviewStatus } from '@core/reviewStatus'
import * as BasePaths from '@webapp/main/basePaths'
import * as ReviewStatusState from '@webapp/app/country/reviewStatusState'
import { useI18n, useIsDataExportView } from '@webapp/components/hooks'

import ReviewStatusMarker from './ReviewStatusMarker'
import SectionItemLink from './SectionItemLink'

type Props = {
  assessment: Assessment
  section: AssessmentSection
  showSections: boolean
  prefix: string
}

const Section: React.FC<Props> = (props) => {
  const { assessment, section, showSections, prefix } = props

  const i18n = useI18n()
  const isDataExport = useIsDataExportView()
  const { pathname } = useLocation()
  const childStatus = useSelector(ReviewStatusState.getStatusSectionChildren(section))
  const [expanded, setExpanded] = useState(false)

  const sectionLabel = i18n.t(section.label)
  const assessmentType = assessment.type
  let children = Object.values(section.children)
  if (isDataExport) {
    children = children
      .filter((subsection) => SectionSpecs.getSectionSpec(assessmentType, subsection.name)?.dataExport?.included)
      .sort((child1, child2) => child1.anchor.localeCompare(child2.anchor, undefined, { numeric: true }))
  }

  useEffect(() => {
    setExpanded(showSections)
  }, [showSections])

  // On mount check whether the location matches a child path
  useEffect(() => {
    const match = Object.values(section.children).find((subsection) => {
      const path = BasePaths.assessmentSection.replace(':section', subsection.name)
      return matchPath(pathname, { path })
    })
    if (match) {
      setExpanded(true)
    }
  }, [])

  if (!children.length) {
    return null
  }

  return (
    <div className="nav-section">
      <div
        className="nav-section__header"
        role="button"
        aria-label={sectionLabel}
        tabIndex={0}
        onClick={() => setExpanded(!expanded)}
        onKeyDown={() => setExpanded(!expanded)}
      >
        <div className="nav-section__order">{prefix}</div>
        <div className="nav-section__label">{sectionLabel}</div>
        {!expanded && !isDataExport && (
          <div className="nav-section__status-content">
            <ReviewStatusMarker status={childStatus as ReviewStatus} />
          </div>
        )}
      </div>
      <div className={`nav-section__items-${expanded ? 'visible' : 'hidden'}`}>
        {expanded &&
          children.map((sectionItem) => (
            <SectionItemLink
              prefix={sectionItem.anchor}
              assessmentType={assessmentType}
              key={sectionItem.anchor}
              sectionName={sectionItem.name}
            />
          ))}
      </div>
    </div>
  )
}

export default Section
