import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Routes } from 'meta/routes'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'

const EmptyActivities: React.FC = () => {
  const { t } = useTranslation()

  const { assessmentName, countryIso, cycleName } = useCountryRouteParams()
  return (
    <div className="landing__activity-empty">
      <img alt="tucan" height="72" src="/img/tucan.svg" />
      <p className="landing__activity-empty-title">{t('landing.recentActivity.noRecentActivityTitle')}</p>
      <p>{t('landing.recentActivity.noRecentActivityBody')}</p>
      <Link className="btn-s btn-primary" to={Routes.Country.generatePath({ countryIso, assessmentName, cycleName })}>
        {t('landing.recentActivity.getStarted')}
      </Link>
    </div>
  )
}

export default EmptyActivities
