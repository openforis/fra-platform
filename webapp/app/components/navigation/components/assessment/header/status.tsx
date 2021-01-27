import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import { getAllowedStatusTransitions } from '@common/assessment'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import { isAdministrator } from '@common/countryRole'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as Assessment from '@common/assessment/assessment'
import Icon from '@webapp/components/icon'
import { PopoverControl } from '@webapp/components/popoverControl'
import StatusConfirm from '@webapp/app/components/navigation/components/assessment/header/statusConfirm'
import useCountryIso from '@webapp/components/hooks/useCountryIso'
import useI18n from '@webapp/components/hooks/useI18n'
import useUserInfo from '@webapp/components/hooks/useUserInfo'
import { changeAssessment } from '@webapp/app/country/actions'
import * as AssessmentState from '@webapp/app/assessment/assessmentState'

type Props = {
  assessment: any
}
const Status = (props: Props) => {
  const {
    assessment: { type },
  } = props
  const assessment = useSelector(AssessmentState.getAssessment(type))
  const status = Assessment.getStatus(assessment)
  const deskStudy = Assessment.getDeskStudy(assessment)
  const dispatch = useDispatch()
  const countryIso = useCountryIso()
  const i18n = useI18n()
  const userInfo = useUserInfo()
  const [targetStatus, setTargetStatus] = useState(null)
  //  Hidden in public view
  if (!userInfo) {
    // Return an element as placeholder to maintain order of parent flex display
    return <div />
  }
  const deskStudyItems = [
    { divider: true },
    {
      content: (
        <div className="popover-control__checkbox-container">
          <span
            style={{ marginRight: '8px' }}
            className={`fra-checkbox ${(assessment as any).deskStudy ? 'checked' : ''}`}
          />
          <span>{(i18n as any).t('assessment.deskStudy')}</span>
        </div>
      ),
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      onClick: () => dispatch(changeAssessment(countryIso, Assessment.assocDeskStudy(!deskStudy)(assessment))),
    },
  ]
  const items = R.unless(
    R.always(Assessment.isStatusChanging(assessment)),
    R.pipe(
      (_: any) => getAllowedStatusTransitions(countryIso, userInfo, status),
      (allowedTransitions: any) => [
        { direction: 'next', transition: allowedTransitions.next },
        { direction: 'previous', transition: allowedTransitions.previous },
      ],
      R.filter(R.prop('transition')),
      R.map((statusTarget: any) => ({
        content: (i18n as any).t(`assessment.status.${statusTarget.transition}.${statusTarget.direction}`),
        onClick: () => setTargetStatus(statusTarget),
      })),
      R.when(R.always(isAdministrator(userInfo)), (_items: any) => [..._items, ...deskStudyItems])
    )
  )([])
  return (
    <>
      {
        // showing confirmation modal dialog before submitting the status change
        targetStatus && (
          <StatusConfirm assessment={assessment} targetStatus={targetStatus} onClose={() => setTargetStatus(null)} />
        )
      }
      {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: Element; items: any; }' is not a... Remove this comment to see the full error message */}
      <PopoverControl items={items}>
        <div className={`nav-assessment-header__status status-${status} actionable-${!R.isEmpty(items)}`}>
          <span>{(i18n as any).t(`assessment.status.${status}.label`)}</span>
          {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ className: string; name: string; }' is not... Remove this comment to see the full error message */}
          {!R.isEmpty(items) && <Icon className="icon-white icon-middle" name="small-down" />}
        </div>
      </PopoverControl>
    </>
  )
}
export default Status
