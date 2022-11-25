import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { ClientRoutes } from '@meta/app'
import { Areas } from '@meta/area'

import { useAppDispatch } from '@client/store'
import { useAssessment, useCycle } from '@client/store/assessment'
import { NavigationActions } from '@client/store/ui/navigation'
import { useCountryIso } from '@client/hooks'
import Icon from '@client/components/Icon'

import NavAssessment from '../NavAssessment'

const NavigationDesktop: React.FC = () => {
  const { i18n } = useTranslation()
  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
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
          to={ClientRoutes.Assessment.DataDownload.getLink({ countryIso, assessmentName, cycleName: cycle.name })}
        >
          <>
            <Icon className="icon-sub icon-white" name="hit-down" />
            {i18n.t('dataDownload.dataDownload')}
          </>
        </Link>
      )}
    </div>
  )
}

export default NavigationDesktop
