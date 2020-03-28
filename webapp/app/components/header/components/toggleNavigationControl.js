import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Icon from '@webapp/components/icon'
import useI18n from '@webapp/components/hooks/useI18n'

import * as NavigationState from '@webapp/app/components/navigation/navigationState'

import { toggleNavigation } from '@webapp/app/components/navigation/actions'

const ToggleNavigationControl = () => {
  const dispatch = useDispatch()
  const i18n = useI18n()
  const navigationVisible = useSelector(NavigationState.isVisible)
  const [showLabel, setShowLabel] = useState(false)

  return (
    <button
      type="button"
      className="btn app-header__toggle-navigation-visible"
      onClick={() => {
        setShowLabel(false)
        dispatch(toggleNavigation())
      }}
      onMouseEnter={() => setShowLabel(true)}
      onMouseLeave={() => setShowLabel(false)}
    >
      <Icon className="icon-sub" name="menu-left" />
      <span className={`label${showLabel ? ' show' : ''}`}>
        {i18n.t(`header.${navigationVisible ? 'hideSidebar' : 'showSidebar'}`)}
      </span>
    </button>
  )
}

export default ToggleNavigationControl
