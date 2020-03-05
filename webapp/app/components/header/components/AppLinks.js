import React from 'react';
import { NavLink } from 'react-router-dom';

const AppLinks = ({ i18n }) => {

  const isActive = (match, { pathname }) => {
    console.log({ match, location })
    return !pathname.includes('statisticalFactsheets') || match && match.isExact
  }

  return <>
    <NavLink
      activeClassName="hidden"
      to={`/statisticalFactsheets`} className="app-header__menu-item">
      {i18n.t('common.statisticalFactsheets')}
    </NavLink>

    <NavLink
      activeClassName="hidden"
      isActive={isActive}
      to={`/`}
      className="app-header__menu-item">
      FRA Platform
    </NavLink>
  </>
}

export default AppLinks
