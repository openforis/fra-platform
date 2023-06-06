import './Lock.scss'
import React from 'react'
import MediaQuery from 'react-responsive'

import { useAppDispatch } from 'client/store'
import { DataLockActions, useIsDataLocked } from 'client/store/ui/dataLock'
import Icon from 'client/components/Icon'
import { Breakpoints } from 'client/utils'

const Lock: React.FC = () => {
  const dispatch = useAppDispatch()

  const locked = useIsDataLocked()

  return (
    <div className="lock-wrapper">
      <MediaQuery minWidth={Breakpoints.laptop}>
        <button type="button" className="btn btn-secondary btn-lock" onClick={() => dispatch(DataLockActions.toggleDataLock())}>
          <Icon name={locked ? 'lock-circle' : 'lock-circle-open'} className="icon-no-margin icon-sub" />
        </button>
      </MediaQuery>
    </div>
  )
}

export default Lock
