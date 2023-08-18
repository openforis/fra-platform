import './ButtonDownloadDashboard.scss'
import React from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Areas } from 'meta/area'
import { Routes, SectionNames } from 'meta/routes'

import { useLanguage } from 'client/hooks/useLanguage'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import Icon from 'client/components/Icon'

const ButtonDownloadDashboard: React.FC = () => {
  const { pathname } = useLocation()

  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()
  const lang = useLanguage()
  const sectionName = SectionNames.Country.Home.overview
  const overviewPath = Routes.CountryHomeSection.generatePath({ assessmentName, cycleName, countryIso, sectionName })

  const matchOverview = matchPath({ path: overviewPath, end: true }, pathname)
  const renderButton = matchOverview && (Areas.isGlobal(countryIso) || Areas.isFRARegion(countryIso))

  if (!renderButton) {
    return null
  }

  return (
    <Link
      className="btn-s btn-primary landing__btn-download"
      to={`${ApiEndPoint.File.dashboard()}?assessmentName=${assessmentName}&countryIso=${countryIso}&cycleName=${cycleName}&lang=${lang}`}
      target="_top"
    >
      <Icon name="hit-down" className="icon-hit-down icon-white" />
      <Icon name="icon-table2" className="icon-no-margin icon-white" />
    </Link>
  )
}

export default ButtonDownloadDashboard
