import './Lock.scss'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import MediaQuery from 'react-responsive'

import classNames from 'classnames'

import { HistoryActions } from 'client/store/data/history/actions'
import { useHistoryActivitiesIsActive } from 'client/store/data/history/hooks/activities'
import { useHistoryLastApprovedIsActive } from 'client/store/data/history/hooks/lastApproved'
import { useAppDispatch } from 'client/store/hooks'
import { CountryReportActions } from 'client/store/ui/countryReport/actions'
import { useIsDataLocked } from 'client/store/ui/countryReport/hooks/datalock'
import { useShowOriginalDatapoints } from 'client/store/ui/countryReport/hooks/originalDataPoints'
import { useCanEditCycleData } from 'client/store/user/hooks/auth'
import Icon from 'client/components/Icon'
import { Breakpoints } from 'client/utils'

const Lock: React.FC = () => {
  const dispatch = useAppDispatch()

  const canEditCycleData = useCanEditCycleData()
  const locked = useIsDataLocked()
  const showOdps = useShowOriginalDatapoints()
  const historyActivitiesActive = useHistoryActivitiesIsActive()
  const historyLastApprovedActive = useHistoryLastApprovedIsActive()

  const [disabled, setDisabled] = useState<boolean>(false)
  const [over, setOver] = useState<boolean>(false)
  const lockRef = useRef<boolean>(showOdps)

  const toggleLock = useCallback(() => {
    // if unlocking for editing and historyLastApproved is Active -> close history
    if (locked && historyLastApprovedActive) {
      dispatch(HistoryActions.toggleLastApproved())
    }
    dispatch(CountryReportActions.toggleDataLock())
  }, [dispatch, historyLastApprovedActive, locked])

  useEffect(() => {
    if (canEditCycleData) {
      if (historyActivitiesActive || !showOdps) {
        setDisabled(true)
        if (!locked) {
          lockRef.current = locked
          toggleLock()
        }
      }
      if (!historyActivitiesActive && showOdps) {
        setDisabled(false)
        if (!lockRef.current) {
          lockRef.current = true
          toggleLock()
        }
      }
    }
  }, [canEditCycleData, historyActivitiesActive, locked, showOdps, toggleLock])

  return (
    <MediaQuery minWidth={Breakpoints.laptop}>
      <button
        className={classNames('btn-lock', { locked })}
        disabled={disabled}
        onClick={toggleLock}
        onMouseEnter={() => setOver(true)}
        onMouseLeave={() => setOver(false)}
        type="button"
      >
        <Icon
          className="icon-no-margin icon-sub"
          name={(locked && !over) || (!locked && over) ? 'lock-circle' : 'lock-circle-open'}
        />
      </button>
    </MediaQuery>
  )
}

export default Lock
