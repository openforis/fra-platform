import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const AppLinks = ({ i18n }) => {
  const { pathname } = useLocation();
  const isStatisticalFactsheets = pathname.includes("statisticalFactsheets");
  return <NavLink
    activeClassName="hidden"
    to={`/${isStatisticalFactsheets ? '' : 'statisticalFactsheets'}`} className="app-header__menu-item">
    {isStatisticalFactsheets ? "FRA Platform" : i18n.t('common.statisticalFactsheets')}
  </NavLink>;
};

export default AppLinks
