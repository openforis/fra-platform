import './navigation.less'

import React from 'react'
import { useSelector } from 'react-redux'
import * as R from 'ramda'

import { assessments } from '@common/assessmentSectionItems'

import CountrySelection from '@webapp/loggedin/countrySelection'
import NavLinkLanding from '@webapp/loggedin/navigation/components/navLinkLanding'
import Assessment from '@webapp/loggedin/navigation/components/assessment'
import NavLinkPanEuropeanIndicators from '@webapp/loggedin/navigation/components/navLinkPanEuropeanIndicators'
import NavigationFooter from '@webapp/loggedin/navigation/components/navigationFooter'

import * as CountryState from '@webapp/country/countryState'
import * as NavigationState from '@webapp/loggedin/navigation/navigationState'

const Navigation = () => {

  const countries = useSelector(CountryState.getCountries)
  const status = useSelector(CountryState.getStatus)
  const navigationVisible = useSelector(NavigationState.isVisible)

  if (!(navigationVisible || R.isNil(countries) || R.isEmpty(status))) {
    return null
  }

  return (
    <div className="fra-nav__container no-print">
      {
        !(R.isNil(countries) || R.isEmpty(status)) &&
        <div className="fra-nav">
          <CountrySelection/>

          <div className="nav__scroll-content">

            <NavLinkLanding/>
            <div className="nav__divider"/>

            {
              Object.keys(assessments).map(
                (name, i) =>
                  <Assessment
                    key={i}
                    name={name}
                  />
              )
            }

            <NavLinkPanEuropeanIndicators/>

            <div className="nav__divider"/>

            <NavigationFooter/>
          </div>
        </div>
      }
    </div>
  )
}

export default Navigation
