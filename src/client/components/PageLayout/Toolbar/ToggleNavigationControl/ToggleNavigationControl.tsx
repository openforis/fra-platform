import './ToggleNavigationControl.scss'
import React from 'react'

import classNames from 'classnames'

import { useAppDispatch } from 'client/store'
import { NavigationActions, useNavigationVisible } from 'client/store/ui/navigation'
import { useIsAdminRoute, useIsCycleLandingRoute, useIsGeoRoute } from 'client/hooks'
import Icon from 'client/components/Icon'

const ToggleNavigationControl: React.FC = () => {
  const dispatch = useAppDispatch()
  const isCycleLanding = useIsCycleLandingRoute()
  const isAdmin = useIsAdminRoute()
  const isInGeoPage = useIsGeoRoute()
  const disabled = isCycleLanding || isAdmin || isInGeoPage
  const navigationVisible = useNavigationVisible()

  return (
    <button
      type="button"
      className={classNames('btn toggle-navigation-btn', { active: navigationVisible })}
      disabled={disabled}
      onClick={() => dispatch(NavigationActions.toggleNavigationVisible())}
    >
      <Icon className="icon-sub" name="menu-left" />
    </button>
  )
}

export default ToggleNavigationControl
