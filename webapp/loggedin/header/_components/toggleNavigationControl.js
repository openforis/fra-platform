import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Icon from '@webapp/components/icon'
import useI18n from '@webapp/components/hooks/useI18n'

import * as NavigationState from '@webapp/loggedin/navigation/navigationState'

import { toggleNavigation } from '@webapp/loggedin/navigation/actions'

const ToggleNavigationControl = () => {
  const dispatch = useDispatch()
  const i18n = useI18n()
  const navigationVisible = useSelector(NavigationState.isVisible)

  const localisationKey = navigationVisible ? 'hideSidebar' : 'showSidebar'
  return (
    <div className="fra-header__toggle-navigation-visible"
         onClick={() => dispatch(toggleNavigation())}>
      <Icon className="icon-sub" name="menu-left"/>
      {i18n.t('header.' + localisationKey)}
    </div>
  )
}

export default ToggleNavigationControl
