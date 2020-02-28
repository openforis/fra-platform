import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import * as R from 'ramda'

import { NavLink } from 'react-router-dom'
import ReviewStatus from '@webapp/loggedin/navigation/components/assessment/section/reviewStatus'
import useCountryIso from '@webapp/components/hooks/useCountryIso'
import useI18n from '@webapp/components/hooks/useI18n'

import * as ReviewStatusState from '@webapp/country/reviewStatusState'

const getLinkTo = (pathTemplate, countryIso) => R.replace(/:countryIso/, countryIso, pathTemplate)

const Item = props => {
  const countryIso = useCountryIso()
  const i18n = useI18n()

  const { item } = props
  const { section, pathTemplate, tableNo, label } = item
  const reviewStatus = useSelector(ReviewStatusState.getStatusSection(section))

  return (
    <NavLink
      to={getLinkTo(pathTemplate, countryIso)}
      className="nav-section__item"
      activeClassName="selected">
      <div className='nav-section__order'>{tableNo}</div>
      <div className='nav-section__label'>{i18n.t(label)}</div>
      <div className="nav-section__status-content">
        <ReviewStatus status={reviewStatus}/>
      </div>
    </NavLink>
  )
}

Item.propTypes = {
  item: PropTypes.object.isRequired
}

export default Item
