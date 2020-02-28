import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as R from 'ramda'

export const getLinkTo = (pathTemplate, countryIso) => R.replace(/:countryIso/, countryIso, pathTemplate)

export const ReviewStatus = ({ status }) =>
  status.issueStatus === 'opened'
    ? <div className={`nav__review-status--${status.hasUnreadIssues ? 'unread' : 'open'}`}/>
    : null

const NavAssessmentSection = props => {

  const { countryIso, item, assessment, i18n, showSections } = props

  const getChildStatus = () => R.pipe(
    R.map(child => props.getReviewStatus(child.section)),
    // filtering all opened statuses
    R.reject(status => status.issuesCount === 0 || status.issueStatus !== 'opened'),
    // checking if there's an open status with unread issues
    R.or(R.find(R.propEq('hasUnreadIssues'), true), R.head),
    R.defaultTo({})
  )(item.children)

  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    setExpanded(showSections)
  }, [showSections])

  return <div className="nav__section">
    <div className="nav__section-header"
         onClick={() => setExpanded(!expanded)}>
      <div className="nav__section-order">{item.sectionNo}</div>
      <div className="nav__section-label">{i18n.t(item.label)}</div>
      {expanded
        ? null
        : <div className="nav__section-status-content">
          <ReviewStatus status={getChildStatus()}/>
        </div>
      }
    </div>
    <div className={expanded ? 'nav__section-items--visible' : 'nav__section-items--hidden'}>
      {
        expanded && item.children.map(
          (child, i) => (
            <NavLink
              key={i}
              to={getLinkTo(child.pathTemplate, countryIso)}
              className="nav__section-item"
              activeClassName="selected">
              <div className='nav__section-order'>{child.tableNo}</div>
              <div className='nav__section-label'>{i18n.t(child.label)}</div>
              <div className="nav__section-status-content">
                <ReviewStatus status={props.getReviewStatus(child.section)}/>
              </div>
            </NavLink>
          )
        )
      }
    </div>
  </div>
}

NavAssessmentSection.propTypes = {
  assessment: PropTypes.object.isRequired,
  showSections: PropTypes.bool.isRequired,
}

export default NavAssessmentSection
