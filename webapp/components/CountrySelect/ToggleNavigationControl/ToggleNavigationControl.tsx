import React from 'react'
import { useDispatch } from 'react-redux'

import { useIsAdmin, useIsHome } from '@webapp/components/hooks'
import Icon from '@webapp/components/icon'

import { toggleNavigation } from '@webapp/components/Navigation/actions'

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
        dispatch(toggleNavigation())
      }}
    >
      <Icon className="icon-sub" name="menu-left" />
    </button>
  )
}

export default ToggleNavigationControl
