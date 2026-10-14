import React, { useMemo } from 'react'
import { Link, matchPath, useLocation } from 'react-router'

import { Areas } from 'meta/area/areas'
import { Global } from 'meta/area/global'
import { RegionCode } from 'meta/area/regionCode'
import { Files } from 'meta/file/files'
import { Routes } from 'meta/routes/routes'
import { SectionNames } from 'meta/routes/sectionNames'

import { useLanguage } from 'client/hooks/language'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import { useButtonClassName } from 'client/components/Buttons/Button'
import Icon from 'client/components/Icon'

const sectionName = SectionNames.Country.Home.overview

const ButtonDownloadDashboard: React.FC = () => {
  const { pathname } = useLocation()

  const { assessmentName, countryIso, cycleName } = useCountryRouteParams()
  const language = useLanguage()
  const className = useButtonClassName({})

  const to = useMemo<string>(() => {
    const regionCode = countryIso as RegionCode | Global.WO
    return Files.Static.getStatisticalFactsheet({ assessmentName, cycleName, language, regionCode })
  }, [assessmentName, countryIso, cycleName, language])

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
      <Icon className="icon-hit-down" name="hit-down" />
      <Icon name="icon-table2" />
    </Link>
  )
}

export default ButtonDownloadDashboard
