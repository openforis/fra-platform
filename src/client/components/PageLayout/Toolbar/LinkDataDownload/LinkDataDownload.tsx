import React from 'react'
import { useTranslation } from 'react-i18next'
import { matchPath, NavLink, useLocation } from 'react-router-dom'

import classNames from 'classnames'

import { Global } from 'meta/area'
import { Routes } from 'meta/routes'
import { TooltipId } from 'meta/tooltip'

import { useCycleRouteParams } from 'client/hooks/useRouteParams'
import Icon from 'client/components/Icon'

const LinkDataDownload: React.FC = () => {
  const { assessmentName, cycleName } = useCycleRouteParams()
  const baseParams = { assessmentName, cycleName, countryIso: Global.WO }
  const { pathname } = useLocation()

  const { t } = useTranslation()

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
