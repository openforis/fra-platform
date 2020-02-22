import './style.less'

import React from 'react'
import { connect, useSelector } from 'react-redux'
import * as R from 'ramda'

import { assessments } from '@common/assessmentSectionItems'
import { roleForCountry } from '@common/countryRole'
import CountrySelection from '@webapp/loggedin/navigation/components/countrySelection'
import useI18n from '@webapp/components/hooks/useI18n'

import Assessment from '@webapp/loggedin/navigation/components/assessment'
import { Footer, SectionLink } from '@webapp/loggedin/navigation/components/navigationComponents'

import * as AppState from '@webapp/app/appState'

import {
  changeAssessment,
  toggleAllNavigationGroupsCollapse,
  toggleNavigationGroupCollapse
} from '@webapp/loggedin/navigation/actions'
import { getCountryName, isPanEuropeanCountry } from '@webapp/country/actions'
import { fetchAllCountryData } from '@webapp/app/actions'

const roleLabel = (countryIso, userInfo, i18n) => i18n.t(roleForCountry(countryIso, userInfo).labelKey)

const Nav = props => {

  const {
    userInfo, path, countries, changeAssessment, isPanEuropeanCountry,
    status = {},
    navigationVisible
  } = props

  if (!navigationVisible) return null

  const countryIso = useSelector(AppState.getCountryIso)
  const i18n = useI18n()

  const getReviewStatus = section => R.pipe(
    R.defaultTo({}),
    R.prop(section),
    R.defaultTo({ issuesCount: 0 })
  )(status.reviewStatus)

  return (
    <div className="fra-nav__container no-print">
      {
        R.isNil(countries) || R.isEmpty(status)
          ? null
          : <div className="fra-nav">
            <CountrySelection
              {...props}
              i18n={i18n}
              name={countryIso}
              countries={countries}
              role={roleLabel(countryIso, userInfo, i18n)}
            />
            <div className="nav__scroll-content">
              <SectionLink
                countryIso={countryIso}
                i18n={i18n}
                path={path}
                pathTemplate="/country/:countryIso/"
                label={i18n.t('landing.home')}
              />
              <div className="nav__divider"></div>
              {
                R.map(([assessment, sections]) =>
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
                  , R.toPairs(assessments))
              }
              {
                isPanEuropeanCountry(countryIso)
                  ? <div>
                    <div className="nav__divider"/>
                    <SectionLink
                      countryIso={countryIso}
                      i18n={i18n}
                      path={path}
                      pathTemplate="/country/:countryIso/panEuropeanIndicators/"
                      label={i18n.t('navigation.sectionHeaders.panEuropeanIndicators')}
                    />
                  </div>
                  : null
              }
              <div className="nav__divider"/>

              <Footer
                countryIso={countryIso}
                i18n={i18n}
                {...props}/>
            </div>
          </div>
      }
    </div>
  )
}

const mapStateToProps = state => ({
  // showOriginalDataPoints: hasOdps(R.path(['extentOfForest', 'fra'], state)),
  ...state.navigation,
  ...state.country,
  ...state.router,
  ...state.user
})

export default connect(mapStateToProps, {
  getCountryName,
  isPanEuropeanCountry,
  fetchAllCountryData,
  changeAssessment,
  toggleNavigationGroupCollapse,
  toggleAllNavigationGroupsCollapse
})(Nav)
