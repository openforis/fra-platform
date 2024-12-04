import React, { useMemo } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Areas } from 'meta/area'
import { Routes, SectionNames } from 'meta/routes'

import { useLanguage } from 'client/hooks/useLanguage'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { ButtonSize, useButtonClassName } from 'client/components/Buttons/Button'
import Icon from 'client/components/Icon'

const sectionName = SectionNames.Country.Home.overview

const ButtonDownloadDashboard: React.FC = () => {
  const { pathname } = useLocation()

  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()
  const lang = useLanguage()
  const className = useButtonClassName({ iconName: 'icon-hit-down', label: 'L', size: ButtonSize.s })

  const to = useMemo<string>(() => {
    const searchParams = new URLSearchParams({ assessmentName, cycleName, countryIso, lang })
    return `${ApiEndPoint.File.dashboard()}?${searchParams.toString()}`
  }, [assessmentName, countryIso, cycleName, lang])

  const renderButton = useMemo<boolean>(() => {
    const overviewPath = Routes.CountryHomeSection.generatePath({ assessmentName, cycleName, countryIso, sectionName })
    const matchOverview = matchPath({ path: overviewPath, end: true }, pathname)
    return matchOverview && (Areas.isGlobal(countryIso) || Areas.isFRARegion(countryIso))
  }, [assessmentName, countryIso, cycleName, pathname])

  if (!renderButton) {
    return null
  }

  return (
    <Link className={className} target="_top" to={to}>
      <Icon className="icon-hit-down icon-white" name="hit-down" />
      <Icon className="icon-no-margin icon-white" name="icon-table2" />
    </Link>
  )
}

export default ButtonDownloadDashboard
