import React from 'react'
import { useDispatch } from 'react-redux'
import { matchPath, useLocation } from 'react-router'

import Icon from '@webapp/components/icon'

import { toggleNavigation } from '@webapp/app/components/navigation/actions'

const ToggleNavigationControl = () => {
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const matchHome = Boolean(matchPath(pathname, { path: '/', exact: true }))

  return (
    <button
      type="button"
      className="btn app-header__toggle-navigation-visible"
      disabled={matchHome}
      onClick={() => {
        dispatch(toggleNavigation())
      }}
    >
      <Icon className="icon-sub" name="menu-left" />
    </button>
  )
}

export default ToggleNavigationControl
