import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as R from 'ramda'

import { getAllowedStatusTransitions } from '@common/assessment'
import { isAdministrator } from '@common/countryRole'

import Icon from '@webapp/components/icon'
import NavAssessmentStatusConfirm from '@webapp/loggedin/navigation/components/navAssessment/navAssessmentStatusConfirm'
import { Link } from 'react-router-dom'
import { PopoverControl } from '@webapp/components/popoverControl'
import useI18n from '@webapp/components/hooks/useI18n'
import useUserInfo from '@webapp/components/hooks/useUserInfo'

import * as AppState from '@webapp/app/appState'
import * as AssessmentState from '@webapp/country/assessmentState'

import { toggleAssessmentLock } from '@webapp/loggedin/navigation/actions'

const NavAssessmentHeader = props => {
  const {
    assessment,
    changeAssessment,
    lastUncollapseState,
    toggleAllNavigationGroupsCollapse,
  } = props

  const dispatch = useDispatch()
  const i18n = useI18n()
  const userInfo = useUserInfo()

  const isLocked = useSelector(AssessmentState.isLocked(assessment))
  const canToggleLock = useSelector(AssessmentState.canToggleLock(assessment))

  const { status: assessmentStatus } = assessment
  const countryIso = useSelector(AppState.getCountryIso)
  const [targetStatus, setTargetStatus] = useState(null)

  const allowedTransitions = getAllowedStatusTransitions(countryIso, userInfo, assessmentStatus)
  const possibleAssessmentStatuses = [
    { direction: 'next', transition: allowedTransitions.next },
    { direction: 'previous', transition: allowedTransitions.previous }
  ]

  const deskStudyItems = [{
    divider: true
  }, {
    content: <div className="popover-control__checkbox-container">
      <span
        style={{ marginRight: '8px' }}
        className={`fra-checkbox ${assessment.deskStudy ? 'checked' : ''}`}
      >
      </span>
      <span>{i18n.t('assessment.deskStudy')}</span>
    </div>,
    onClick: () => changeAssessment(countryIso, { ...assessment, deskStudy: !assessment.deskStudy })
  }]

  const popoverItems = assessmentStatus === 'changing'
    ? []
    : R.pipe(
      R.filter(R.prop('transition')),
      R.map(targetStatus => ({
        content: i18n.t(`assessment.status.${targetStatus.transition}.${targetStatus.direction}`),
        onClick: () => setTargetStatus(targetStatus)
      })),
      //adding desk study option if user is administrator
      items => isAdministrator(userInfo)
        ? R.flatten(R.append(deskStudyItems, items))
        : items
    )(possibleAssessmentStatuses)

  return <div className="nav__assessment-header">

    { // showing confirmation modal dialog before submitting the status change
      !(R.isNil(targetStatus)) &&
      <NavAssessmentStatusConfirm
        countryIso={countryIso}
        i18n={i18n}
        assessment={assessment}
        targetStatus={targetStatus}
        changeAssessment={changeAssessment}
        userInfo={userInfo}
        onClose={() => setTargetStatus(null)}
      />
    }

    <div className="nav__assessment-label">

      <div className="nav__assessment-lock">
        <div>
          {i18n.t('assessment.' + assessment.type)}
          {
            assessment.deskStudy &&
            <div className="desk-study">({i18n.t('assessment.deskStudy')})</div>

          }
        </div>
        <button className="btn-s btn-secondary nav__assessment-btn-lock"
                disabled={!canToggleLock}
                onClick={() => dispatch(toggleAssessmentLock(assessment.type))}>
          <Icon name={isLocked ? 'lock-circle' : 'lock-circle-open'} className="icon-no-margin"/>
        </button>
      </div>

      <div>
        <Link
          className="btn-s btn-secondary"
          to={`/country/${countryIso}/print/${assessment.type}?onlyTables=true`}
          target="_blank">
          <Icon name="small-print" className="icon-margin-left"/>
          <Icon name="icon-table2" className="icon-no-margin"/>
        </Link>
        <Link
          className="btn-s btn-secondary"
          to={`/country/${countryIso}/print/${assessment.type}`}
          target="_blank">
          <Icon name="small-print" className="icon-no-margin"/>
        </Link>
      </div>

    </div>

    <PopoverControl items={popoverItems}>
      <div
        className={`nav__assessment-status status-${assessmentStatus} actionable-${!R.isEmpty(popoverItems)}`}>
        <span>{i18n.t(`assessment.status.${assessmentStatus}.label`)}</span>
        {
          !R.isEmpty(popoverItems) &&
          <Icon className="icon-white icon-middle" name="small-down"/>
        }
      </div>
    </PopoverControl>

    <button
      className="btn-s nav__assessment-toggle"
      onClick={() => toggleAllNavigationGroupsCollapse()}>
      {
        lastUncollapseState
          ? i18n.t('navigation.hideAll')
          : i18n.t('navigation.showAll')
      }
    </button>
  </div>
}

export default NavAssessmentHeader
