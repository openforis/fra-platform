import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useCountryIso, useI18n, useIsDataExportView } from '@webapp/components/hooks'
import Icon from '@webapp/components/icon'

import * as NavigationState from '@webapp/app/components/navigation/navigationState'
import { toggleNavigation } from '@webapp/app/components/navigation/actions'

const ToggleNavigationControl = () => {
  const dispatch = useDispatch()
  const i18n = useI18n()
  const countryIso = useCountryIso()
  const dataExportView = useIsDataExportView()
  const navigationVisible = useSelector(NavigationState.isVisible)
  const [showLabel, setShowLabel] = useState(false)

  // button is not visible in FRAPlatform view when country has not been selected
  if (!dataExportView && !countryIso) return <div />

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
