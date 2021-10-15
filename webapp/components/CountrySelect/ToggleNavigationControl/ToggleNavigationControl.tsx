import React from 'react'
import { useDispatch } from 'react-redux'

import { useIsAdmin, useIsHome } from '@webapp/hooks'
import Icon from '@webapp/components/icon'

import { NavigationActions } from '@webapp/store/navigation'

const ToggleNavigationControl: React.FC = () => {
  const dispatch = useDispatch()
  const isHome = useIsHome()
  const isAdmin = useIsAdmin()

  return (
    <button
      type="button"
      className="btn app-header__toggle-navigation-visible"
      disabled={isHome || isAdmin}
      onClick={() => {
        dispatch(NavigationActions.toggleNavigationVisibility())
      }}
    >
      <Icon className="icon-sub" name="menu-left" />
    </button>
  )
}

export default ToggleNavigationControl
