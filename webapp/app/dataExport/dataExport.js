import React from 'react'
import Header from '@webapp/app/components/header/header'
import Navigation from '@webapp/app/components/navigation/navigation'
import * as NavigationState from '@webapp/app/components/navigation/navigationState'
import { useSelector } from 'react-redux'
import { useCountryIso } from '@webapp/components/hooks'

const DataExport = () => {
  const countryIso = useCountryIso()
  const navigationVisible = useSelector(NavigationState.isVisible)

  let classNameAppView = 'app-view'
  classNameAppView += navigationVisible ? ' navigation-on' : ''
  classNameAppView += !navigationVisible && countryIso ? ' navigation-off' : ''

  return (
    <div className={classNameAppView}>
      <Header />
      <Navigation />
      <div className="app-view__content">
        <h1>DataExport</h1>
      </div>
    </div>
  )
}

export default DataExport
