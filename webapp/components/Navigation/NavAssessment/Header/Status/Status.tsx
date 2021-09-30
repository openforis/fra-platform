import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MediaQuery from 'react-responsive'
import classNames from 'classnames'

import { Assessment, AssessmentStatus, AssessmentStatusTransitions } from '@core/assessment'
import { Users } from '@core/auth'
import { Objects } from '@core/utils'
import * as AssessmentState from '@webapp/app/assessment/assessmentState'
import { Breakpoints } from '@webapp/utils/breakpoints'
import { useCountryIso, useI18n, useUserInfo } from '@webapp/components/hooks'

import Icon from '@webapp/components/icon'
import PopoverControl, { PopoverItem } from '@webapp/components/PopoverControl'
import { CountryActions } from '@webapp/store/country'
import StatusConfirm from './StatusConfirm'
import { StatusTransition } from './types'

type Props = {
  assessment: Assessment
}

const Status: React.FC<Props> = (props: Props) => {
  const { assessment: assessmentProps } = props

  const dispatch = useDispatch()
  const countryIso = useCountryIso()
  const i18n = useI18n()
  const userInfo = useUserInfo()
  const assessment = useSelector(AssessmentState.getAssessment(assessmentProps.type)) as Assessment

  const { deskStudy, status } = assessment
  const [targetStatus, setTargetStatus] = useState<StatusTransition>(null)

  const deskStudyItems: Array<PopoverItem> = [
    { divider: true },
    {
      content: (
        <div className="popover-control__checkbox-container">
          <span style={{ marginRight: '8px' }} className={classNames('fra-checkbox', { checked: deskStudy })} />
          <span>{i18n.t('assessment.deskStudy')}</span>
        </div>
      ),
      onClick: () =>
        dispatch(
          CountryActions.changeAssessmentStatus({ countryIso, assessment: { ...assessment, deskStudy: !deskStudy } })
        ),
    },
  ]

  const items: Array<PopoverItem> = []
  if (status !== AssessmentStatus.changing) {
    const { next, previous } = AssessmentStatusTransitions.getAllowedTransition({ assessment, countryIso, userInfo })
    if (next) {
      items.push({
        content: i18n.t(`assessment.status.${next}.next`),
        onClick: () => setTargetStatus({ status: next, direction: 'next' }),
      })
    }
    if (previous) {
      items.push({
        content: i18n.t(`assessment.status.${previous}.previous`),
        onClick: () => setTargetStatus({ status: previous, direction: 'previous' }),
      })
    }
    if (Users.isAdministrator(userInfo)) items.push(...deskStudyItems)
  }

  return (
    <>
      {
        // showing confirmation modal dialog before submitting the status change
        targetStatus && (
          <StatusConfirm assessment={assessment} status={targetStatus} onClose={() => setTargetStatus(null)} />
        )
      }
      <MediaQuery maxWidth={Breakpoints.laptop - 1}>
        <div className={`nav-assessment-header__status status-${status}`}>
          <span>{i18n.t(`assessment.status.${status}.label`)}</span>
        </div>
      </MediaQuery>
      <MediaQuery minWidth={Breakpoints.laptop}>
        <PopoverControl items={items}>
          <div className={`nav-assessment-header__status status-${status} actionable-${!Objects.isEmpty(items)}`}>
            <span>{i18n.t(`assessment.status.${status}.label`)}</span>
            {!Objects.isEmpty(items) && <Icon className="icon-white icon-middle" name="small-down" />}
          </div>
        </PopoverControl>
      </MediaQuery>
    </>
  )
}

export default Status
