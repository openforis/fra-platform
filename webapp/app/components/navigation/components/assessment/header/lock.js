import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import * as Assessment from '@common/assessment/assessment'

import Icon from '@webapp/components/icon'
import useUserInfo from '@webapp/components/hooks/useUserInfo'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'

import { toggleAssessmentLock } from '@webapp/app/assessment/actions'
import AssessmentTitle from './title'

const Lock = (props) => {
  const { assessment } = props
  const type = Assessment.getType(assessment)
  const deskStudy = Assessment.getDeskStudy(assessment)

  const dispatch = useDispatch()
  const userInfo = useUserInfo()

  const locked = useSelector(AssessmentState.isLocked(assessment))
  const canToggleLock = useSelector(AssessmentState.canToggleLock(assessment))

  return (
    <div className="nav-assessment-header__lock">
      <AssessmentTitle deskStudy={deskStudy} type={type} />
      {userInfo && (
        <button
          type="button"
          className="btn-s btn-secondary nav-assessment-header__btn-lock"
          disabled={!canToggleLock}
          onClick={() => dispatch(toggleAssessmentLock(type, !locked))}
        >
          <Icon name={locked ? 'lock-circle' : 'lock-circle-open'} className="icon-no-margin" />
        </button>
      )}
    </div>
  )
}

Lock.propTypes = {
  assessment: PropTypes.object.isRequired,
}

export default Lock
