import './LinkLanding.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { matchPath, NavLink, useLocation } from 'react-router-dom'

import classNames from 'classnames'

import { Routes } from 'meta/routes'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import Icon from 'client/components/Icon'

const LinkLanding: React.FC = () => {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()

  if (!assessmentName || !cycleName) return null

  return (
    <NavLink
      to={Routes.CountryHome.generatePath({ assessmentName, cycleName, countryIso })}
      className={() => {
        return classNames('nav-section__item', {
          selected: matchPath({ path: Routes.CountryHome.path.absolute, end: false }, pathname),
        })
      }}
    >
      <div className="nav-section__order">
        <Icon name="icon-bar-chart" className="icon-sub icon-margin-right" />
      </div>

      <div className="nav-nav-section__label">{t('common.dashboard')}</div>
    </NavLink>
  )
}
export default LinkLanding
