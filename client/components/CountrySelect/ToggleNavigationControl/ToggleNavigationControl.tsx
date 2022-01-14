import React from 'react'

import { useIsAdmin, useIsHome } from '@client/hooks'
import Icon from '@client/components/Icon'
import { UiActions } from '@client/store/ui'
import { useAppDispatch } from '@client/store'

const ToggleNavigationControl: React.FC = () => {
  const dispatch = useAppDispatch()
  const isHome = useIsHome()
  const isAdmin = useIsAdmin()

  return (
    <button
      type="button"
      className="btn app-header__toggle-navigation-visible"
      disabled={isHome || isAdmin}
      onClick={() => {
        dispatch(UiActions.toggleNavigationVisible())
      }}
    >
      <Icon className="icon-sub" name="menu-left" />
    </button>
  )
}

export default ToggleNavigationControl
