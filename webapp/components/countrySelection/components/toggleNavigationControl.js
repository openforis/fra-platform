import React from 'react'
import { useDispatch } from 'react-redux'

import { useIsHome } from '@webapp/components/hooks'
import Icon from '@webapp/components/icon'

import { toggleNavigation } from '@webapp/app/components/navigation/actions'

const ToggleNavigationControl = () => {
  const dispatch = useDispatch()
  const isHome = useIsHome()

  return (
    <button
      type="button"
      className="btn app-header__toggle-navigation-visible"
      disabled={isHome}
      onClick={() => {
        dispatch(toggleNavigation())
      }}
    >
      <Icon className="icon-sub" name="menu-left" />
    </button>
  )
}

export default ToggleNavigationControl
