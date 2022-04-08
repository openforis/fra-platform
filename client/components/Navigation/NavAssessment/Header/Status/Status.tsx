import React, { useState } from 'react'
import { useAppDispatch } from '@client/store'
import { useCountryIso } from '@client/hooks'
import { useTranslation } from 'react-i18next'
import { useUser } from '@client/store/user'
import MediaQuery from 'react-responsive'
import classNames from 'classnames'
import { Objects } from '@core/utils'
import { Breakpoints } from '@webapp/utils/breakpoints'
import Icon from '@client/components/Icon'
import PopoverControl, { PopoverItem } from '@client/components/PopoverControl'

import { useAssessmentCountry } from '@client/store/assessment/hooks'
import { AssessmentName } from '@meta/assessment'
import { AssessmentStatusTransitions } from '@meta/assessment/assessments'
import { Users } from '@meta/user'
import { useParams } from 'react-router-dom'
import { AssessmentActions } from '@client/store/assessment'
import { AssessmentStatus } from '@meta/area/country'
import StatusConfirm from './StatusConfirm'
import { StatusTransition } from './types'

const Status: React.FC = () => {
  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const { i18n } = useTranslation()
  const user = useUser()
  const country = useAssessmentCountry()

  const { assessmentName, cycleName } = useParams<{ assessmentName: AssessmentName; cycleName: string }>()
  const [targetStatus, setTargetStatus] = useState<StatusTransition>(null)

  if (!country) return null
  const { deskStudy, status } = country.props ?? {}
  const deskStudyItems: Array<PopoverItem> = [
    { divider: true },
    {
      content: (
        <div className="popover-control__checkbox-container">
          <span style={{ marginRight: '8px' }} className={classNames('fra-checkbox', { checked: deskStudy })} />
          <span>{i18n.t('assessment.deskStudy')}</span>
        </div>
      ),
      onClick: () => {
        dispatch(
          AssessmentActions.updateCountry({
            country: {
              ...country,
              props: {
                ...country.props,
                deskStudy: !country.props.deskStudy,
              },
            },
            countryIso,
            cycleName,
            assessmentName,
          })
        )
      },
    },
  ]

  const items: Array<PopoverItem> = []
  if (status !== AssessmentStatus.changing) {
    const { next, previous } = AssessmentStatusTransitions.getAllowedTransition({
      status: country.props.status,
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
      {targetStatus && <StatusConfirm status={targetStatus} onClose={() => setTargetStatus(null)} />}
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
