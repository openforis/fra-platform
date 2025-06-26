import './ButtonHistory.scss'
import React, { useCallback } from 'react'
import MediaQuery from 'react-responsive'

import { HistoryActions } from 'client/store/data/history/actions'
import { useHistoryLastApprovedIsActive } from 'client/store/data/history/hooks/lastApproved'
import { useAppDispatch } from 'client/store/hooks'
import { CountryReportActions } from 'client/store/ui/countryReport/actions'
import { useIsDataLocked } from 'client/store/ui/countryReport/hooks/datalock'
import { useOnUpdate } from 'client/hooks'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'
import { Breakpoints } from 'client/utils'

const ButtonHistory: React.FC = () => {
  const { countryIso } = useCountryRouteParams()
  const dispatch = useAppDispatch()
  const locked = useIsDataLocked()
  const historyActive = useHistoryLastApprovedIsActive()

  const toggleHistory = useCallback(() => {
    // if activating historyLastApproved and data edit is unlocked -> lock data edit
    if (!historyActive && !locked) {
      dispatch(CountryReportActions.toggleDataLock())
    }
    dispatch(HistoryActions.resetActivities())
    dispatch(HistoryActions.toggleLastApproved())
  }, [dispatch, historyActive, locked])

  // if navigating to a different country, close history lastApproved
  useOnUpdate(() => {
    dispatch(HistoryActions.toggleLastApproved(false))
  }, [countryIso])

  return (
    <MediaQuery minWidth={Breakpoints.laptop}>
      <Button
        className="btn-history-last-approved"
        iconName="history"
        inverse={!historyActive}
        onClick={() => toggleHistory()}
        size={ButtonSize.m}
        type={ButtonType.black}
      />
    </MediaQuery>
  )
}

export default ButtonHistory
