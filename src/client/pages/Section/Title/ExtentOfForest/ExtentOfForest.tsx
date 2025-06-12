import './ExtentOfForest.scss'
import React, { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { Labels } from 'meta/assessment/labels'
import { Users } from 'meta/user'

import { useHistoryLastApprovedIsActive } from 'client/store/data/history/hooks/lastApproved'
import { useOriginalDataPointYears } from 'client/store/data/tableData/nodeValues/hooks/originalDataPointData'
import { useAppDispatch } from 'client/store/hooks'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { CountryReportActions } from 'client/store/ui/countryReport/actions'
import { useShowOriginalDatapoints } from 'client/store/ui/countryReport/hooks/originalDataPoints'
import { useUser } from 'client/store/user/hooks/user'
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
  const { onlyTables, print } = useIsPrintRoute()
  const odpYears = useOriginalDataPointYears()
  const showOdps = useShowOriginalDatapoints()

  const sectionName = subSection.props.name
  const hasOdps = Array.isArray(odpYears)
  const withToggleODPs = Users.isAdministrator(user) && hasOdps

  const historyLastApprovedIsActive = useHistoryLastApprovedIsActive()

  useEffect(() => {
    if (historyLastApprovedIsActive && !showOdps) {
      dispatch(CountryReportActions.toggleShowOriginalDataPoint())
    }
  }, [dispatch, historyLastApprovedIsActive, showOdps])

  const onClick = useCallback(() => {
    dispatch(CountryReportActions.toggleShowOriginalDataPoint())
  }, [dispatch])

  return (
    <>
      <div className={classNames('justify_start', 'section-title-extentOfForest', { withToggleODPs })}>
        <h2 className="headline no-print">{Labels.getCycleLabel({ cycle, labels: subSection.props.labels, t })}</h2>
        {withToggleODPs && (
          <Button
            disabled={historyLastApprovedIsActive}
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
