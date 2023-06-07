import './ToggleNavigationControl.scss'
import React from 'react'

import classNames from 'classnames'

import { useAppDispatch } from 'client/store'
import { NavigationActions, useNavigationVisible } from 'client/store/ui/navigation'
import { useIsAdmin, useIsCycleLanding } from 'client/hooks'
import Icon from 'client/components/Icon'

const ToggleNavigationControl: React.FC = () => {
  const dispatch = useAppDispatch()
  const isCycleLanding = useIsCycleLanding()
  const isAdmin = useIsAdmin()
  const navigationVisible = useNavigationVisible()

  return (
    <button
      type="button"
      className={classNames('btn toggle-navigation-btn', { active: navigationVisible })}
      disabled={isCycleLanding || isAdmin}
      onClick={() => dispatch(NavigationActions.toggleNavigationVisible())}
    >
      <Icon className="icon-sub" name="menu-left" />
    </button>
  )
}

export default ToggleNavigationControl
