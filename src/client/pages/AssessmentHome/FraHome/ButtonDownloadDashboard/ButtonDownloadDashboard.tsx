import './ButtonDownloadDashboard.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link, matchPath, useLocation } from 'react-router-dom'

import { ApiEndPoint } from 'meta/api/endpoint'
import { AssessmentHomeRouteNames, ClientRoutes } from 'meta/app'
import { Areas } from 'meta/area'

import { useAssessment, useCycle } from 'client/store/assessment'
import { useCountryIso } from 'client/hooks'
import Icon from 'client/components/Icon'

const ButtonDownloadDashboard: React.FC = () => {
  const { pathname } = useLocation()
  const { i18n } = useTranslation()
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()

  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle
  const overviewPath = ClientRoutes.Assessment.Cycle.Country.Home.Section.getLink({
    countryIso,
    assessmentName,
    cycleName,
    sectionName: AssessmentHomeRouteNames.overview,
  })
  const matchOverview = matchPath({ path: overviewPath, end: true }, pathname)
  const renderButton = matchOverview && (Areas.isGlobal(countryIso) || Areas.isFRARegion(countryIso))

  if (!renderButton) {
    return null
  }

  return (
    <Link
      className="btn-s btn-primary landing__btn-download"
      to={`${ApiEndPoint.File.dashboard()}?assessmentName=${assessment.props.name}&countryIso=${countryIso}&cycleName=${cycle.name}&lang=${
        i18n.language
      }`}
      target="_top"
    >
      <Icon name="hit-down" className="icon-hit-down icon-white" />
      <Icon name="icon-table2" className="icon-no-margin icon-white" />
    </Link>
  )
}

export default ButtonDownloadDashboard
