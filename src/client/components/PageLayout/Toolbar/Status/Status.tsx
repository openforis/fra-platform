import './Status.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import MediaQuery from 'react-responsive'

import classNames from 'classnames'
import { Objects } from 'utils/objects'

import { Areas } from 'meta/area'
import { AssessmentStatus } from 'meta/area/country'
import { AssessmentStatusTransitions } from 'meta/assessment/assessments'
import { Users } from 'meta/user'

import { useAppDispatch } from 'client/store'
import { AreaActions, useAssessmentCountry } from 'client/store/area'
import { useCycle } from 'client/store/assessment'
import { useUser } from 'client/store/user'
import { useCountryIso } from 'client/hooks'
import { useCycleRouteParams } from 'client/hooks/useRouteParams'
import Icon from 'client/components/Icon'
import PopoverControl, { PopoverItem } from 'client/components/PopoverControl'
import { Breakpoints } from 'client/utils/breakpoints'

import StatusConfirm from './StatusConfirm'
import { StatusTransition } from './types'

const Status: React.FC = () => {
  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const { t } = useTranslation()
  const user = useUser()
  const country = useAssessmentCountry()
  const cycle = useCycle()
  const hasRoleInCountry = Users.hasRoleInCountry({ user, cycle, countryIso })
  const { assessmentName, cycleName } = useCycleRouteParams()
  const [targetStatus, setTargetStatus] = useState<StatusTransition>(null)

  if (!country || !hasRoleInCountry) return null
  const { deskStudy } = country.props ?? {}
  const status = Areas.getStatus(country)
  const deskStudyItems: Array<PopoverItem> = [
    { divider: true },
    {
      content: (
        <div className="popover-control__checkbox-container">
          <span style={{ marginRight: '8px' }} className={classNames('fra-checkbox', { checked: deskStudy })} />
          <span>{t<string>('assessment.deskStudy')}</span>
        </div>
      ),
      onClick: () => {
        dispatch(
          AreaActions.updateCountry({
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
  if (![AssessmentStatus.changing, AssessmentStatus.notStarted].includes(status)) {
    const { next, previous } = AssessmentStatusTransitions.getAllowedTransition({
      country,
      countryIso,
      user,
      cycle,
    })

    if (next) {
      items.push({
        content: t(`assessment.status.${next}.next`),
        onClick: () => setTargetStatus({ status: next, direction: 'next' }),
      })
    }
    if (previous) {
      items.push({
        content: t(`assessment.status.${previous}.previous`),
        onClick: () => setTargetStatus({ status: previous, direction: 'previous' }),
      })
    }
    if (Users.isAdministrator(user)) items.push(...deskStudyItems)
  }

  return (
    <>
      {targetStatus && <StatusConfirm status={targetStatus} onClose={() => setTargetStatus(null)} />}
      <MediaQuery maxWidth={Breakpoints.laptop - 1}>
        <div className={`nav-header__status status-${status}`}>
          <span>{t<string>(`assessment.status.${status}.label`)}</span>
        </div>
      </MediaQuery>
      <MediaQuery minWidth={Breakpoints.laptop}>
        <PopoverControl items={items}>
          <div className={`nav-header__status status-${status} actionable-${!Objects.isEmpty(items)}`}>
            <span>{t<string>(`assessment.status.${status}.label`)}</span>
            {!Objects.isEmpty(items) && <Icon className="icon-white icon-middle" name="small-down" />}
          </div>
        </PopoverControl>
      </MediaQuery>
    </>
  )
}

export default Status
