import React from 'react'
import MediaQuery from 'react-responsive'

import { useAppDispatch } from '@client/store'
import { DataLockActions, useIsDataLocked } from '@client/store/ui/dataLock'
import Icon from '@client/components/Icon'
import { Breakpoints } from '@client/utils'

type Props = {
  lockEnabled: boolean
}

const Title: React.FC<Props> = (props) => {
  const { lockEnabled } = props
  const dispatch = useAppDispatch()

  const locked = useIsDataLocked()
  const canToggleLock = true // false // TODO

  return (
    <div className="nav-assessment-header__lock">
      {lockEnabled && (
        <MediaQuery minWidth={Breakpoints.laptop}>
          <button
            type="button"
            className="btn btn-secondary nav-assessment-header__btn-lock"
            disabled={!canToggleLock}
            onClick={() => dispatch(DataLockActions.toggleDataLock())}
          >
            <Icon name={locked ? 'lock-circle' : 'lock-circle-open'} className="icon-no-margin icon-sub" />
          </button>
        </MediaQuery>
      )}
    </div>
  )
}

export default Title
