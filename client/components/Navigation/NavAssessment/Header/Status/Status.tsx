import React, { useState } from 'react'
import { useAppDispatch } from '@client/store'
import { useCountryIso } from '@client/hooks'
import { useTranslation } from 'react-i18next'
import { useUser } from '@client/store/user'
import MediaQuery from 'react-responsive'
import classNames from 'classnames'
//
import { Objects } from '@core/utils'
import { Breakpoints } from '@webapp/utils/breakpoints'
//
import Icon from '@client/components/Icon'
import PopoverControl, { PopoverItem } from '@client/components/PopoverControl'

import { useAssessmentCountryStatus } from '@client/store/assessment/hooks'
import { AssessmentName, AssessmentStatus } from '@meta/assessment'
import { CountryStatusTransitions } from '@meta/assessment/assessments'
import { Users } from '@meta/user'
import { useParams } from 'react-router-dom'
import { AssessmentActions } from '@client/store/assessment'
import StatusConfirm from './StatusConfirm'
import { StatusTransition } from './types'

const Status: React.FC = () => {
  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const { i18n } = useTranslation()
  const user = useUser()
  const countryStatus = useAssessmentCountryStatus()

  const { assessmentName, cycleName } = useParams<{ assessmentName: AssessmentName; cycleName: string }>()

  const { deskStudy, status } = countryStatus ?? {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [targetStatus, setTargetStatus] = useState<StatusTransition>(null)

  if (!countryStatus) return null

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
          AssessmentActions.postCountryStatus({
            countryStatus: {
              ...countryStatus,
              deskStudy: !countryStatus.deskStudy,
            },
            countryIso,
            cycleName,
            name: assessmentName,
          })
        ),
    },
  ]

  const items: Array<PopoverItem> = []
  if (status !== AssessmentStatus.changing) {
    const { next, previous } = CountryStatusTransitions.getAllowedTransition({
      countryStatus,
      countryIso,
      user,
    })
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
    if (Users.isAdministrator(user)) items.push(...deskStudyItems)
  }

  return (
    <>
      {
        // showing confirmation modal dialog before submitting the status change
        targetStatus && <StatusConfirm status={targetStatus} onClose={() => setTargetStatus(null)} />
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
