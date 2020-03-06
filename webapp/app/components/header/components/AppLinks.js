import React from 'react';
import { NavLink } from 'react-router-dom';

const AppLinks = ({ i18n }) => {

  const isActive = (match, { pathname }) => !pathname.includes('statisticalFactsheets') ||
    match && match.isExact

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
      {i18n.t('common.fraPlatform')}
    </NavLink>
    <div className="app-header__menu-item-separator" />
  </>
}

export default AppLinks
