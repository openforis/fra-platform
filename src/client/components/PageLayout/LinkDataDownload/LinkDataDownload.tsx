import React from 'react'
import { useTranslation } from 'react-i18next'
import { matchPath, NavLink, useLocation } from 'react-router-dom'

import classNames from 'classnames'

import { Global } from 'meta/area/global'
import { Routes } from 'meta/routes/routes'
import { TooltipId } from 'meta/tooltip'

import { useCountryRouteParams } from 'client/hooks/routeParams'
import Icon from 'client/components/Icon'

const LinkDataDownload: React.FC = () => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams()
  const baseParams = { assessmentName, cycleName, countryIso: Global.WO }
  const { pathname } = useLocation()

  const { t } = useTranslation()

  if (!countryIso) {
    return null
  }

  return (
    <>
      <Icon name="hit-down" />
      <NavLink
        className={(): string => {
          return classNames('toolbar__data-link', {
            disabled: matchPath({ path: Routes.CountryDataDownload.path.absolute, end: true }, pathname),
          })
        }}
        data-tooltip-content={t('common.tooltip.dataDownload')}
        data-tooltip-id={TooltipId.white}
        to={Routes.CountryDataDownload.generatePath(baseParams)}
      >
        {t('dataDownload.dataDownload')}
      </NavLink>
    </>
  )
}
export default LinkDataDownload
