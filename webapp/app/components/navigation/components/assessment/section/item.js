import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { getAssessmentSectionLink } from '@common/assessment/assessmentSections'

import { NavLink } from 'react-router-dom'
import ReviewStatus from '@webapp/app/components/navigation/components/assessment/section/reviewStatus'
import useCountryIso from '@webapp/components/hooks/useCountryIso'
import useI18n from '@webapp/components/hooks/useI18n'

import * as ReviewStatusState from '@webapp/app/country/reviewStatusState'

const Item = props => {
  const countryIso = useCountryIso()
  const i18n = useI18n()

  const { assessmentType, item } = props
  const { section, tableNo } = item
  const reviewStatus = useSelector(ReviewStatusState.getStatusSection(section))

  return (
    <NavLink
      to={getAssessmentSectionLink(countryIso, assessmentType, section)}
      className="nav-section__item"
      activeClassName="selected">
      <div className='nav-section__order'>{tableNo}</div>
      <div className='nav-section__label'>{i18n.t(`${section}.${section}`)}</div>
      <div className="nav-section__status-content">
        <ReviewStatus status={reviewStatus}/>
      </div>
    </NavLink>
  )
}

Item.propTypes = {
  assessmentType: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired
}

export default Item
