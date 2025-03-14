import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Global as GlobalType } from 'meta/area'
import { Routes } from 'meta/routes'

import { useCycleRouteParams } from 'client/hooks/useRouteParams'
import { useShowRegions } from 'client/hooks/useShowRegions'

const Global = () => {
  const { assessmentName, cycleName } = useCycleRouteParams()
  const { t } = useTranslation()

  const showRegions = useShowRegions()

  if (!showRegions) {
    return null
  }

  return (
    <div className="home-area-selector__group">
      <img alt="" src="/img/iconGlobal.svg" />
      <Link
        className="home-link m-r"
        to={Routes.Country.generatePath({ countryIso: GlobalType.WO, assessmentName, cycleName })}
      >
        {t(`area.${GlobalType.WO}.listName`)}
      </Link>
    </div>
  )
}

export default Global
