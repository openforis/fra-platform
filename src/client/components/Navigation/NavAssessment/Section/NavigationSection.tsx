import './Section.scss'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { matchPath, useLocation } from 'react-router'

import { Labels } from 'meta/assessment/labels'
import { Section } from 'meta/assessment/section'
import { Routes } from 'meta/routes/routes'

import { useSummarySectionHasErrors } from 'client/store/data/validations/summary/hooks/summary'
import { useAssessment } from 'client/store/meta/hooks/assessments'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { useSectionReviewSummary } from 'client/store/review/hooks/review'
import { useCountryIso } from 'client/hooks/country'
import { useIsDataExportView } from 'client/hooks/dataExport'
import Flex from 'client/components/Layout/Flex'
import SectionItemLink from 'client/components/Navigation/NavAssessment/Section/SectionItemLink'
import ReviewSummaryIndicator from 'client/components/ReviewSummaryIndicator'
import ValidationErrorIndicator from 'client/components/ValidationErrorIndicator'

type Props = {
  section: Section
  showSections: boolean
}

const NavigationSection: React.FC<Props> = (props) => {
  const { section, showSections } = props

  const { t } = useTranslation()
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()
  const isDataExport = useIsDataExportView()
  const { pathname } = useLocation()
  const reviewStatus = useSectionReviewSummary(section.uuid)
  const sectionHasErrors = useSummarySectionHasErrors(section.uuid)

  const [expanded, setExpanded] = useState(false)

  const sectionLabel = Labels.getCycleLabel({ cycle, labels: section.props.labels, t })
  const assessmentName = assessment.props.name
  const prefix = section.props.anchors[cycle.uuid]
  let children = section.subSections
  if (isDataExport) {
    children = children.filter((subsection) => subsection?.props?.dataExport)
    // .sort((child1, child2) => child1.anchor.localeCompare(child2.anchor, undefined, { numeric: true }))
  }

  useEffect(() => {
    setExpanded(showSections)
  }, [showSections])

  // // On mount check whether the location matches a child path
  useEffect(() => {
    const match = section.subSections.find((subsection) => {
      const path = Routes.Section.generatePath({
        countryIso,
        cycleName: cycle.name,
        assessmentName,
        sectionName: subsection.props.name,
      })
      return matchPath({ path }, pathname)
    })
    if (match) {
      setExpanded(true)
    }
  }, [assessmentName, countryIso, cycle.name, pathname, section.subSections])

  if (!children.length) {
    return null
  }

  return (
    <div className="nav-section">
      <div
        aria-label={sectionLabel}
        className="nav-section__header"
        onClick={(): void => setExpanded(!expanded)}
        onKeyDown={(): void => setExpanded(!expanded)}
        role="button"
        tabIndex={0}
      >
        <div className="nav-section__order">{prefix}</div>
        <Flex alignItems="center">
          <div className="nav-section__label">{sectionLabel}</div>
        </Flex>
        {!expanded && !isDataExport && (
          <div className="nav-section__status-content">
            <ReviewSummaryIndicator status={reviewStatus} />
            <ValidationErrorIndicator show={sectionHasErrors} />
          </div>
        )}
      </div>
      <div className={`nav-section__items-${expanded ? 'visible' : 'hidden'}`}>
        {expanded && children.map((subSection) => <SectionItemLink key={subSection.uuid} subSection={subSection} />)}
      </div>
    </div>
  )
}

export default NavigationSection
