import './ButtonHistory.scss'
import React, { useCallback } from 'react'
import MediaQuery from 'react-responsive'

import { useAppDispatch } from 'client/store'
import { DataActions, useHistoryLastApprovedIsActive } from 'client/store/data'
import { DataLockActions, useIsDataLocked } from 'client/store/ui/dataLock'
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
      dispatch(DataLockActions.toggleDataLock())
    }
    dispatch(DataActions.toggleHistoryLastApproved())
  }, [dispatch, historyActive, locked])

  // if navigating to a different country, close history lastApproved
  useOnUpdate(() => {
    dispatch(DataActions.toggleHistoryLastApproved(false))
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
