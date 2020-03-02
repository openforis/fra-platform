import './section.less'

import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { matchPath, useLocation } from 'react-router-dom'

import ReviewStatus from '@webapp/app/components/navigation/components/assessment/section/reviewStatus'
import Item from '@webapp/app/components/navigation/components/assessment/section/item'
import useI18n from '@webapp/components/hooks/useI18n'

import * as ReviewStatusState from '@webapp/app/country/reviewStatusState'

const Section = props => {
  const { section, showSections } = props

  const i18n = useI18n()
  const { pathname } = useLocation()
  const childStatus = useSelector(ReviewStatusState.getStatusSectionChildren(section))
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    setExpanded(showSections)
  }, [showSections])

  // On mount check whether the location matches a child path
  useEffect(() => {
    const match = section.children.find(
      ({ pathTemplate: path }) => matchPath(pathname, { path })
    )
    if (match) {
      setExpanded(true)
    }
  }, [])

  return (
    <div className="nav-section">
      <div className="nav-section__header"
           onClick={() => setExpanded(!expanded)}>
        <div className="nav-section__order">{section.sectionNo}</div>
        <div className="nav-section__label">{i18n.t(section.label)}</div>
        {
          !expanded &&
          <div className="nav-section__status-content">
            <ReviewStatus status={childStatus}/>
          </div>
        }
      </div>
      <div className={`nav-section__items-${expanded ? 'visible' : 'hidden'}`}>
        {
          expanded && section.children.map(
            (item, i) => (
              <Item
                key={i}
                item={item}
              />
            )
          )
        }
      </div>
    </div>
  )
}

Section.propTypes = {
  section: PropTypes.object.isRequired,
  showSections: PropTypes.bool.isRequired,
}

export default Section
