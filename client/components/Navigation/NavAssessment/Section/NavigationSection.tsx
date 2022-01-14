import './Section.scss'
import React, { useEffect, useState } from 'react'
// import { useLocation } from 'react-router-dom'

// import { ReviewStatus } from '@core/reviewStatus'

import { Section } from '@meta/assessment'
import { useTranslation } from 'react-i18next'
import { useCountryIso, useIsDataExportView } from '@client/hooks'
import { useAssessment } from '@client/store/assessment'
// import ReviewStatusMarker from './ReviewStatusMarker'
import { BasePaths } from '@client/basePaths'
import { matchPath } from 'react-router-dom'
import { useLocation } from 'react-router'
import SectionItemLink from './SectionItemLink'

type Props = {
  section: Section
  showSections: boolean
  prefix: string
}

const NavigationSection: React.FC<Props> = (props) => {
  const { section, showSections, prefix } = props

  const { i18n } = useTranslation()
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const isDataExport = useIsDataExportView()
  const { pathname } = useLocation()
  // const childStatus = useSelector(ReviewStatusState.getStatusSectionChildren(section))
  const [expanded, setExpanded] = useState(false)
  //
  const sectionLabel = i18n.t(section.props.labelKey)
  const assessmentType = assessment.props.name
  const children = section.subSections
  // if (isDataExport) {
  //   children = children
  //     .filter((subsection) => SectionSpecs.getSectionSpec(assessmentType, subsection.name)?.dataExport?.included)
  //     .sort((child1, child2) => child1.anchor.localeCompare(child2.anchor, undefined, { numeric: true }))
  // }

  useEffect(() => {
    setExpanded(showSections)
  }, [showSections])

  // // On mount check whether the location matches a child path
  useEffect(() => {
    const match = section.subSections.find((subsection) => {
      const path = BasePaths.Assessment.section(countryIso, assessmentType, subsection.props.name)
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
            {/* <ReviewStatusMarker status={childStatus as ReviewStatus} /> */}
          </div>
        )}
      </div>
      <div className={`nav-section__items-${expanded ? 'visible' : 'hidden'}`}>
        {expanded &&
          children.map((subSection) => (
            <SectionItemLink
              prefix={subSection.props.anchor}
              assessmentType={assessmentType}
              key={subSection.props.anchor}
              sectionName={subSection.props.name}
            />
          ))}
      </div>
    </div>
  )
}

export default NavigationSection
