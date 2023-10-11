import './Lock.scss'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import MediaQuery from 'react-responsive'

import classNames from 'classnames'

import { useAppDispatch } from 'client/store'
import { useShowOriginalDatapoints } from 'client/store/ui/assessmentSection'
import { DataLockActions, useIsDataLocked } from 'client/store/ui/dataLock'
import Icon from 'client/components/Icon'
import { Breakpoints } from 'client/utils'

const Lock: React.FC = () => {
  const dispatch = useAppDispatch()

  const locked = useIsDataLocked()
  const showOdps = useShowOriginalDatapoints()
  const [disabled, setDisabled] = useState<boolean>(false)
  const lockedOnHideOdpRef = useRef<boolean>(showOdps)

  const toggleLock = useCallback(() => dispatch(DataLockActions.toggleDataLock()), [dispatch])

  useEffect(() => {
    if (!showOdps) {
      setDisabled(true)
      if (!locked) {
        lockedOnHideOdpRef.current = locked
        toggleLock()
      }
    }
    if (showOdps) {
      setDisabled(false)
      if (!lockedOnHideOdpRef.current) {
        lockedOnHideOdpRef.current = true
        toggleLock()
      }
    }
  }, [locked, showOdps, toggleLock])

  return (
    <div className="lock-wrapper">
      <MediaQuery minWidth={Breakpoints.laptop}>
        <button
          type="button"
          className={classNames('btn btn-secondary btn-lock', { locked })}
          disabled={disabled}
          onClick={toggleLock}
        >
          <Icon name={locked ? 'lock-circle' : 'lock-circle-open'} className="icon-no-margin icon-sub" />
        </button>
      </MediaQuery>
    </div>
  )
}

export default Lock
