import './navigation.less'

import React from 'react'
import { connect, useSelector } from 'react-redux'
import * as R from 'ramda'

import { assessments } from '@common/assessmentSectionItems'

import CountrySelection from '@webapp/loggedin/countrySelection'
import NavLinkLanding from '@webapp/loggedin/navigation/components/navLinkLanding'
import Assessment from '@webapp/loggedin/navigation/components/assessment'
import NavLinkPanEuropeanIndicators from '@webapp/loggedin/navigation/components/navLinkPanEuropeanIndicators'
import NavigationFooter from '@webapp/loggedin/navigation/components/navigationFooter'
import useI18n from '@webapp/components/hooks/useI18n'

import * as AppState from '@webapp/app/appState'
import * as UserState from '@webapp/user/userState'
import * as CountryState from '@webapp/country/countryState'

import {
  changeAssessment,
  toggleAllNavigationGroupsCollapse,
  toggleNavigationGroupCollapse
} from '@webapp/loggedin/navigation/actions'
import { getCountryName } from '@webapp/country/actions'
import { fetchAllCountryData } from '@webapp/app/actions'

const Nav = props => {

  const {
    userInfo, path, changeAssessment,
    navigationVisible
  } = props

  if (!navigationVisible) return null

  const countryIso = useSelector(AppState.getCountryIso)
  const countries = useSelector(CountryState.getCountries)
  const status = useSelector(CountryState.getStatus)
  const i18n = useI18n()

  const getReviewStatus = section => R.pipe(
    R.defaultTo({}),
    R.prop(section),
    R.defaultTo({ issuesCount: 0 })
  )(status.reviewStatus)

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
              Object.entries(assessments).map(
                ([assessment, sections]) =>
                  <Assessment
                    {...props}
                    key={assessment}
                    assessment={status.assessments[assessment]}
                    countryIso={countryIso}
                    changeAssessment={changeAssessment}
                    userInfo={userInfo}
                    sections={sections}
                    getReviewStatus={getReviewStatus}
                    i18n={i18n}/>
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

const mapStateToProps = state => ({
  // showOriginalDataPoints: hasOdps(R.path(['extentOfForest', 'fra'], state)),
  ...state.navigation,
  userInfo: UserState.getUserInfo(state),
})

export default connect(mapStateToProps, {
  getCountryName,
  fetchAllCountryData,
  changeAssessment,
  toggleNavigationGroupCollapse,
  toggleAllNavigationGroupsCollapse
})(Nav)
