import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import * as CountryStatusAssessment from '@common/country/countryStatusAssessment'

import Icon from '@webapp/components/icon'
import useI18n from '@webapp/components/hooks/useI18n'
import useUserInfo from '@webapp/components/hooks/useUserInfo'

import * as AssessmentState from '@webapp/country/assessmentState'

import { toggleAssessmentLock } from '@webapp/country/actions'

const Lock = props => {
  const { assessment } = props
  const type = CountryStatusAssessment.getType(assessment)
  const deskStudy = CountryStatusAssessment.getDeskStudy(assessment)

  const dispatch = useDispatch()
  const i18n = useI18n()
  const userInfo = useUserInfo()

  const locked = useSelector(AssessmentState.isLocked(assessment))
  const canToggleLock = useSelector(AssessmentState.canToggleLock(assessment))

  return (
    <div className="nav-assessment-header__lock">
      <div>
        {
          i18n.t(`assessment.${type}`)
        }
        {
          deskStudy &&
          <div className="desk-study">
            ({i18n.t('assessment.deskStudy')})
          </div>
        }
      </div>
      {
        userInfo &&
        <button className="btn-s btn-secondary nav-assessment-header__btn-lock"
                disabled={!canToggleLock}
                onClick={() => dispatch(toggleAssessmentLock(type, !locked))}>
          <Icon name={locked ? 'lock-circle' : 'lock-circle-open'} className="icon-no-margin"/>
        </button>
      }
    </div>
  )
}

Lock.propTypes = {
  assessment: PropTypes.object.isRequired,
}

export default Lock
