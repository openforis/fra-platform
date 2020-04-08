import React from 'react'
import PropTypes from 'prop-types'
import { matchPath, NavLink } from 'react-router-dom'

import * as BasePaths from '@webapp/main/basePaths'

const AppLinks = props => {
  const { i18n } = props

  const isActive = (match, { pathname }) => !matchPath(pathname, { path: BasePaths.statisticalFactsheets })

  return (
    <>
      <NavLink activeClassName="hidden" to={BasePaths.statisticalFactsheets} className="app-header__app-link">
        {i18n.t('common.statisticalFactsheets')}
      </NavLink>

      <NavLink activeClassName="hidden" isActive={isActive} to={BasePaths.root} className="app-header__app-link">
        {i18n.t('common.fraPlatform')}
      </NavLink>
    </>
  )
}

AppLinks.propTypes = {
  i18n: PropTypes.object.isRequired,
}

export default AppLinks
