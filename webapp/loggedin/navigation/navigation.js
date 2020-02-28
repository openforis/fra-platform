import './navigation.less'

import React from 'react'
import { useSelector } from 'react-redux'
import * as R from 'ramda'

import { assessments } from '@common/assessmentSectionItems'

import CountrySelection from '@webapp/loggedin/countrySelection'
import Assessment from '@webapp/loggedin/navigation/components/assessment'
import LinkLanding from '@webapp/loggedin/navigation/components/linkLanding'
import LinkPanEuropeanIndicators from '@webapp/loggedin/navigation/components/linkPanEuropeanIndicators'
import Footer from '@webapp/loggedin/navigation/components/footer'

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
    <div className="nav__container no-print">
      {
        !(R.isNil(countries) || R.isEmpty(status)) &&
        <div className="nav">
          <CountrySelection/>

          <div className="nav__scroll-content">

            <LinkLanding/>
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

            <LinkPanEuropeanIndicators/>

            <div className="nav__divider"/>

            <Footer/>
          </div>
        </div>
      }
    </div>
  )
}

export default Navigation
