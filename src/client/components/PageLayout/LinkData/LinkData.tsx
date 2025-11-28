import './LinkData.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import MediaQuery from 'react-responsive'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'

import { CountryIso } from 'meta/area/countryIso'
import { Global } from 'meta/area/global'
import { AssessmentNames } from 'meta/assessment/assessment'
import { Routes } from 'meta/routes/routes'
import { TooltipId } from 'meta/tooltip/id'
import { Objects } from 'utils/objects'

import { useSectionRouteParams } from 'client/hooks/routeParams'
import { useIsCountryRoute, useIsGeoRoute } from 'client/hooks/routes'
import LinkDataDownload from 'client/components/PageLayout/LinkDataDownload'
import { Breakpoints } from 'client/utils/breakpoints'

const LinkData: React.FC = () => {
  const { t } = useTranslation()
  const { assessmentName, countryIso, cycleName, sectionName } = useSectionRouteParams<CountryIso>()
  const isFRA = assessmentName === AssessmentNames.fra
  const isCountryRoute = useIsCountryRoute()
  const isGeoRoute = useIsGeoRoute()

  const baseParams = { assessmentName, cycleName, countryIso: Global.WO, sectionName: sectionName ?? '' }

  const variableDataDisabled = Objects.isNil(sectionName)

  if (isGeoRoute || !isFRA) {
    return null
  }

  return (
    <>
      <LinkDataDownload />

      <div className="toolbar__separator" />

      <NavLink
        className={classNames('toolbar__data-link', { disabled: variableDataDisabled })}
        data-tooltip-content={t('common.tooltip.dataExplorer')}
        data-tooltip-id={variableDataDisabled ? undefined : TooltipId.white}
        state={{ countryISOs: [countryIso] }}
        to={Routes.Section.generatePath(baseParams)}
      >
        {t('common.variableData')}
      </NavLink>

      {isCountryRoute && (
        <MediaQuery minWidth={Breakpoints.laptop}>
          <div className="toolbar__separator" />
        </MediaQuery>
      )}
    </>
  )
}

export default LinkData
