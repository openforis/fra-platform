import React from 'react'

import { useAppDispatch } from '@client/store'
import { NavigationActions } from '@client/store/ui/navigation'
import { useIsAdmin, useIsCycleLanding } from '@client/hooks'
import Icon from '@client/components/Icon'

const ToggleNavigationControl: React.FC = () => {
  const dispatch = useAppDispatch()
  const isCycleLanding = useIsCycleLanding()
  const isAdmin = useIsAdmin()

  return (
    <button
      type="button"
      className="btn app-header__toggle-navigation-visible"
      disabled={isCycleLanding || isAdmin}
      onClick={() => {
        dispatch(NavigationActions.toggleNavigationVisible())
      }}
    >
      <Icon className="icon-sub" name="menu-left" />
    </button>
  )
}

export default ToggleNavigationControl
