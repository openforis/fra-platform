import './section.less'

import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { matchPath, useLocation } from 'react-router-dom'

import * as BasePaths from '@webapp/main/basePaths'

import ReviewStatus from '@webapp/app/components/navigation/components/assessment/section/reviewStatus'
import Subsection from '@webapp/app/components/navigation/components/assessment/section/navigationLink'
import useI18n from '@webapp/components/hooks/useI18n'

import * as ReviewStatusState from '@webapp/app/country/reviewStatusState'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpecs'
import { useIsDataExportView } from '@webapp/components/hooks'

const Section = (props) => {
  const { assessmentType, section, showSections, prefix } = props

  const i18n = useI18n()
  const isDataExport = useIsDataExportView()
  const { pathname } = useLocation()
  const childStatus = useSelector(ReviewStatusState.getStatusSectionChildren(section))
  const [expanded, setExpanded] = useState(false)

  const sectionLabel = i18n.t(section.label)

  useEffect(() => {
    setExpanded(showSections)
  }, [showSections])

  // On mount check whether the location matches a child path
  useEffect(() => {
    const match = Object.entries(section.children).find(([_, subsection]) => {
      const path = BasePaths.assessmentSection.replace(':section', subsection.name)
      return matchPath(pathname, { path })
    })
    if (match) {
      setExpanded(true)
    }
  }, [])

  const visible = (subsection) =>
    matchPath(pathname, { path: BasePaths.dataExport }) &&
    SectionSpec.getSectionSpec(assessmentType, subsection.name).dataExport.included

  const filterDataExportChildren = (children) => children.filter((x) => visible(x))
  const children = Object.values(section.children)
  const filteredChildren = isDataExport ? filterDataExportChildren(children) : children

  if (!filteredChildren.length) {
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
              prefix={subsection.anchor}
              assessmentType={assessmentType}
              key={subsection.anchor}
              sectionName={subsection.name}
            />
          ))}
      </div>
    </div>
  )
}

Section.propTypes = {
  assessmentType: PropTypes.string.isRequired,
  section: PropTypes.object.isRequired,
  showSections: PropTypes.bool.isRequired,
  prefix: PropTypes.string.isRequired,
}

export default Section
