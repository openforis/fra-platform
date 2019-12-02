import './style.less'

import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
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
// import { hasOdps } from '../assessmentFra/extentOfForest/extentOfForestHelper'

const roleLabel = (countryIso, userInfo, i18n) => i18n.t(roleForCountry(countryIso, userInfo).labelKey)

class Nav extends React.Component {
  componentDidMount () {
    const content = ReactDOM.findDOMNode(this.refs.scroll_content)
    if (this.props.scrollPosition) {
      content.scrollTop = this.props.scrollPosition
    }
  }

  render () {
    if (!this.props.navigationVisible) return null
    const status = R.defaultTo({}, this.props.status)
    const getReviewStatus = section => R.pipe(
      R.defaultTo({}),
      R.prop(section),
      R.defaultTo({issuesCount: 0})
    )(status.reviewStatus)

    const {userInfo, i18n, path, countries, country, changeAssessment, isPanEuropeanCountry} = this.props

    return <div className="fra-nav__container no-print">
      {
        R.isNil(countries) || R.isEmpty(status)
          ? null
          : <div className="fra-nav">
            <CountrySelection
              {...this.props}
              name={country}
              countries={countries}
              role={roleLabel(country, userInfo, i18n)}
            />
            <div className="nav__scroll-content" ref="scroll_content" onScroll={() => {
              const content = ReactDOM.findDOMNode(this.refs.scroll_content)
              this.props.navigationScroll(content.scrollTop)
            }}>
              <SectionLink
                countryIso={country}
                i18n={i18n}
                path={path}
                pathTemplate="/country/:countryIso"
                label={i18n.t('landing.home')}
              />
              {
                // this.props.showOriginalDataPoints
                //   ? <NationalData
                //     label={i18n.t('nationalDataPoint.nationalData')}
                //     countryIso={country}
                //     status={R.merge(getReviewStatus('odp'), status.odpStatus)}
                //     path={path}
                //     pathTemplate="/country/:countryIso/odps"
                //     secondaryPathTemplate="/country/:countryIso/odp"
                //     userInfo={userInfo}/>
                //   : null
              }
              <div className="nav__divider"></div>
              {
                R.map(([assessment, sections]) =>
                    <Assessment
                      {...this.props}
                      key={assessment}
                      assessment={status.assessments[assessment]}
                      countryIso={country}
                      changeAssessment={changeAssessment}
                      userInfo={userInfo}
                      sections={sections}
                      getReviewStatus={getReviewStatus}
                      i18n={i18n}/>
                  , R.toPairs(assessments))
              }
              {
                isPanEuropeanCountry(country)
                  ? <div>
                    <div className="nav__divider"/>
                    <SectionLink
                      countryIso={country}
                      i18n={i18n}
                      path={path}
                      pathTemplate="/country/:countryIso/panEuropeanIndicators"
                      label={i18n.t('navigation.sectionHeaders.panEuropeanIndicators')}
                    />
                  </div>
                  : null
              }
              <div className="nav__divider"/>

              <Footer
                countryIso={country}
                {...this.props}/>
            </div>
          </div>
      }
    </div>
  }
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
