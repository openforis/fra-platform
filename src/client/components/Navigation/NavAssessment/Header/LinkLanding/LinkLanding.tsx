import './LinkLanding.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { matchPath, NavLink, useLocation } from 'react-router-dom'

import classNames from 'classnames'

import { ClientRoutes } from 'meta/app'

import { useAssessment, useCycle } from 'client/store/assessment'
import { useCountryIso } from 'client/hooks'
import Icon from 'client/components/Icon'

const LinkLanding: React.FC = () => {
  const assessment = useAssessment()
  const countryIso = useCountryIso()
  const cycle = useCycle()
  const { pathname } = useLocation()
  const { t } = useTranslation()

  if (!assessment || !cycle) return null

  return (
    <NavLink
      to={ClientRoutes.Assessment.Cycle.Country.Landing.getLink({
        countryIso,
        assessmentName: assessment.props.name,
        cycleName: cycle.name,
      })}
      className={() => {
        return classNames('nav-section__item', {
          selected: matchPath(
            { path: ClientRoutes.Assessment.Cycle.Country.Home.Root.path.absolute, end: false },
            pathname
          ),
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
