import './style.less'

import React from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import * as R from 'ramda'

import CountrySelection from './components/countrySelection'
import Assessment from './components/assessment'
import { SectionLink, Footer } from './components/navigationComponents'

import { follow } from './../router/actions'
import {
  changeAssessment,
  navigationScroll,
  toggleNavigationGroupCollapse,
  toggleAllNavigationGroupsCollapse
} from './actions'

import { getCountryName, isPanEuropeanCountry } from '../country/actions'
import { fetchAllCountryData } from '../app/actions'
import { assessments } from '../../common/assessmentSectionItems'
import { roleForCountry } from '../../common/countryRole'

const roleLabel = (countryIso, userInfo, i18n) => i18n.t(roleForCountry(countryIso, userInfo).labelKey)

const Nav = props => {

  const {
    userInfo, i18n, path, countries, changeAssessment, isPanEuropeanCountry,
    status = {},
    navigationVisible
  } = props

  if (!navigationVisible) return null

  const { countryIso } = useParams()

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
  follow,
  getCountryName,
  isPanEuropeanCountry,
  fetchAllCountryData,
  changeAssessment,
  navigationScroll,
  toggleNavigationGroupCollapse,
  toggleAllNavigationGroupsCollapse
})(Nav)
