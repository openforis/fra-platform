import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Areas } from 'meta/area'
import { Routes } from 'meta/routes'

import { useAppDispatch } from 'client/store'
import { useAssessment, useCycle } from 'client/store/assessment'
import { NavigationActions } from 'client/store/ui/navigation'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import Icon from 'client/components/Icon'

import NavAssessment from '../NavAssessment'

const NavigationDesktop: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { countryIso } = useCountryRouteParams()
  const assessment = useAssessment()
  const cycle = useCycle()
  const assessmentName = assessment.props.name

  // Show navigation on first mount (ex. returing from Mobile view)
  useEffect(() => {
    dispatch(NavigationActions.updateNavigationVisible(true))
  }, [dispatch])

  return (
    <div className="nav no-print">
      <NavAssessment />

      {Areas.isGlobal(countryIso) && (
        <Link
          className="btn-s btn-primary nav__bulk-download"
          to={Routes.CountryDataDownload.generatePath({
            countryIso,
            assessmentName,
            cycleName: cycle.name,
          })}
        >
          <>
            <Icon className="icon-sub icon-white" name="hit-down" />
            {t('dataDownload.dataDownload')}
          </>
        </Link>
      )}
    </div>
  )
}

export default NavigationDesktop
