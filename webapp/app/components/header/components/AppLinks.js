import React from 'react'
import PropTypes from 'prop-types'
import { NavLink, useLocation } from 'react-router-dom'

import basePaths from '@webapp/main/basePaths'

const isStatisticalFactsheets = pathname => pathname.includes('statisticalFactsheets')

const AppLinks = ({ i18n }) => {
  const { pathname } = useLocation()
  const hideDivider = isStatisticalFactsheets(pathname)

  const isActive = (match, { pathname: path }) => !isStatisticalFactsheets(path) || (match && match.isExact)

  return (
    <>
      <NavLink activeClassName="hidden" to={basePaths.statisticalFactsheets} className="app-header__menu-item">
        {i18n.t('common.statisticalFactsheets')}
      </NavLink>

      <NavLink activeClassName="hidden" isActive={isActive} to={basePaths.root} className="app-header__menu-item">
        {i18n.t('common.fraPlatform')}
      </NavLink>
      {!hideDivider && <div className="app-header__menu-item-separator" />}
    </>
  )
}

AppLinks.propTypes = {
  i18n: PropTypes.object.isRequired,
}

export default AppLinks
