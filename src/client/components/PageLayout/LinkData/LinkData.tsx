import './LinkData.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import MediaQuery from 'react-responsive'
import { useNavigate } from 'react-router-dom'

import classNames from 'classnames'
import { Objects } from 'utils/objects'

import { CountryIso, Global } from 'meta/area'
import { AssessmentNames } from 'meta/assessment/assessment'
import { Routes } from 'meta/routes'
import { TooltipId } from 'meta/tooltip'

import { useSectionRouteParams } from 'client/hooks/routeParams'
import { useIsCountryRoute, useIsGeoRoute } from 'client/hooks/routes'
import LinkDataDownload from 'client/components/PageLayout/LinkDataDownload'
import { Breakpoints } from 'client/utils/breakpoints'

const LinkData: React.FC = () => {
  const { t } = useTranslation()
  const { assessmentName, countryIso, cycleName, sectionName } = useSectionRouteParams<CountryIso>()
  const isFRA = assessmentName === AssessmentNames.fra
  const isCountryRoute = useIsCountryRoute()
  const baseParams = { assessmentName, cycleName, countryIso: Global.WO, sectionName }
  const isGeoRoute = useIsGeoRoute()

  const variableDataDisabled = Objects.isNil(sectionName)

  const navigate = useNavigate()

  if (isGeoRoute || !isFRA) {
    return null
  }

  return (
    <>
      <LinkDataDownload />

      <div className="toolbar__separator" />
      <button
        className={classNames('toolbar__data-link', { disabled: variableDataDisabled })}
        data-tooltip-content={t('common.tooltip.dataExplorer')}
        data-tooltip-id={variableDataDisabled ? undefined : TooltipId.white}
        disabled={variableDataDisabled}
        onClick={(): void => {
          const state = { countryISOs: [countryIso] }
          const path = Routes.Section.generatePath(baseParams)

          navigate(path, { state })
        }}
        type="button"
      >
        {t('common.variableData')}
      </button>

      {isCountryRoute && (
        <MediaQuery minWidth={Breakpoints.laptop}>
          <div className="toolbar__separator" />
        </MediaQuery>
      )}
    </>
  )
}

export default LinkData
