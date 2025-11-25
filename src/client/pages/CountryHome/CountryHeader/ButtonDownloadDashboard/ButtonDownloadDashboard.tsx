import React, { useMemo } from 'react'
import { Link, matchPath, useLocation } from 'react-router'

import { Areas } from 'meta/area/areas'
import { RegionCode } from 'meta/area/regionCode'
import { Files } from 'meta/file/files'
import { Routes } from 'meta/routes/routes'
import { SectionNames } from 'meta/routes/sectionNames'

import { useLanguage } from 'client/hooks/language'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import { ButtonSize, useButtonClassName } from 'client/components/Buttons/Button'
import Icon from 'client/components/Icon'

const sectionName = SectionNames.Country.Home.overview

const ButtonDownloadDashboard: React.FC = () => {
  const { pathname } = useLocation()

  const { assessmentName, countryIso, cycleName } = useCountryRouteParams()
  const lang = useLanguage()
  const className = useButtonClassName({ iconName: 'icon-hit-down', label: 'L', size: ButtonSize.s })

  const to = useMemo<string>(() => {
    return Files.Static.getStatisticalFactsheet({
      region: countryIso as RegionCode,
      language: lang,
      assessmentName,
      cycleName,
      countryIso,
    })
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
      <Icon className="icon-white" name="icon-table2" />
    </Link>
  )
}

export default ButtonDownloadDashboard
