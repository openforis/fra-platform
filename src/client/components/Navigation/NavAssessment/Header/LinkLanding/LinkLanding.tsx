import React from 'react'
import { useTranslation } from 'react-i18next'
import { matchPath, NavLink, useLocation } from 'react-router-dom'
import classNames from 'classnames'

import { Routes } from 'meta/routes/routes'

import { useCountryRouteParams } from 'client/hooks/routeParams'
import Icon from 'client/components/Icon'

const LinkLanding: React.FC = () => {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams()

  if (!assessmentName || !cycleName) return null

  return (
    <NavLink
      className={(): string => {
        return classNames('nav-section__header', {
          selected: matchPath({ path: Routes.CountryHome.path.absolute, end: false }, pathname),
        })
      }}
      to={Routes.CountryHome.generatePath({ assessmentName, cycleName, countryIso })}
    >
      <div className="nav-section__order">
        <Icon name="icon-bar-chart" />
      </div>

      <div className="nav-section__label">{t('common.dashboard')}</div>
    </NavLink>
  )
}
export default LinkLanding
