import './ExtentOfForest.scss'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { Labels } from 'meta/assessment'
import { Users } from 'meta/user'

import { useAppDispatch } from 'client/store'
import { useCycle } from 'client/store/assessment'
import { useOriginalDataPointYears } from 'client/store/data'
import { AssessmentSectionActions, useShowOriginalDatapoints } from 'client/store/ui/assessmentSection'
import { useUser } from 'client/store/user'
import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import Button from 'client/components/Buttons/Button'
import OriginalDataPointsPrint from 'client/pages/Print/OriginalDataPointsPrint'

import { Props } from '../props'

const ExtentOfForest: React.FC<Props> = (props) => {
  const { subSection } = props

  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const user = useUser()
  const cycle = useCycle()
  const { print, onlyTables } = useIsPrintRoute()
  const odpYears = useOriginalDataPointYears()
  const showOdps = useShowOriginalDatapoints()

  const sectionName = subSection.props.name
  const hasOdps = Array.isArray(odpYears)
  const withToggleODPs = Users.isAdministrator(user) && hasOdps

  const onClick = useCallback(() => {
    dispatch(AssessmentSectionActions.toggleShowOriginalDataPoint())
  }, [dispatch])

  return (
    <>
      <div className={classNames('justify_start', 'section-title-extentOfForest', { withToggleODPs })}>
        <h2 className="headline no-print">{Labels.getCycleLabel({ cycle, labels: subSection.props.labels, t })}</h2>
        {withToggleODPs && (
          <Button
            inverse={showOdps}
            label={t(`extentOfForest.${showOdps ? 'hideNDPs' : 'showNDPs'}`)}
            onClick={onClick}
          />
        )}
      </div>

      {hasOdps && print && !onlyTables && <OriginalDataPointsPrint sectionName={sectionName} />}
    </>
  )
}

export default ExtentOfForest
