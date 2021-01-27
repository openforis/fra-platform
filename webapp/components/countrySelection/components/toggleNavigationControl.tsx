import React from 'react'
import { useDispatch } from 'react-redux'

import { useIsAdmin, useIsHome } from '@webapp/components/hooks'
import Icon from '@webapp/components/icon'

import { toggleNavigation } from '@webapp/app/components/navigation/actions'

const ToggleNavigationControl = () => {
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
      {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ className: string; name: string; }' is not... Remove this comment to see the full error message */}
      <Icon className="icon-sub" name="menu-left" />
    </button>
  )
}

export default ToggleNavigationControl
