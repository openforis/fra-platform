import React from 'react'
import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
const isStatisticalFactsheets = pathname =>
  pathname.includes('statisticalFactsheets')

const AppLinks = ({ i18n }) => {
  const { pathname } = useLocation()
  const hideDivider = isStatisticalFactsheets(pathname)

  const isActive = (match, { pathname }) =>
    !isStatisticalFactsheets(pathname) || (match && match.isExact)

  return (
    <>
      <NavLink
        activeClassName="hidden"
        to="/statisticalFactsheets"
        className="app-header__menu-item"
      >
        {i18n.t('common.statisticalFactsheets')}
      </NavLink>

      <NavLink
        activeClassName="hidden"
        isActive={isActive}
        to="/"
        className="app-header__menu-item"
      >
        {i18n.t('common.fraPlatform')}
      </NavLink>
      {!hideDivider && <div className="app-header__menu-item-separator" />}
    </>
  )
}

export default AppLinks
