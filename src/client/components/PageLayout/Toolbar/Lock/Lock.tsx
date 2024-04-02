import './Lock.scss'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import MediaQuery from 'react-responsive'

import classNames from 'classnames'

import { useAppDispatch } from 'client/store'
import { useIsHistoryActive } from 'client/store/data'
import { useShowOriginalDatapoints } from 'client/store/ui/assessmentSection'
import { DataLockActions, useIsDataLocked } from 'client/store/ui/dataLock'
import Icon from 'client/components/Icon'
import { Breakpoints } from 'client/utils'

const Lock: React.FC = () => {
  const dispatch = useAppDispatch()

  const locked = useIsDataLocked()
  const showOdps = useShowOriginalDatapoints()
  const [disabled, setDisabled] = useState<boolean>(false)
  const historyActive = useIsHistoryActive()
  const [over, setOver] = useState<boolean>(false)
  const lockRef = useRef<boolean>(showOdps)

  const toggleLock = useCallback(() => dispatch(DataLockActions.toggleDataLock()), [dispatch])

  useEffect(() => {
    if (historyActive || !showOdps) {
      setDisabled(true)
      if (!locked) {
        lockRef.current = locked
        toggleLock()
      }
    }
    if (!historyActive && showOdps) {
      setDisabled(false)
      if (!lockRef.current) {
        lockRef.current = true
        toggleLock()
      }
    }
  }, [historyActive, locked, showOdps, toggleLock])

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
