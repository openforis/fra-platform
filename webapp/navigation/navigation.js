import * as R from 'ramda'
import React from 'react'
import { connect } from 'react-redux'
import Route from 'route-parser'
import { alpha3ToAlpha2, getName as getCountryName } from 'i18n-iso-countries'

import { Link } from './../link'
import { follow } from './../router/actions'
import { getCountryList, fetchCountryOverviewStatus, changeAssessmentStatus } from './actions'
import { annualItems, fiveYearItems } from './items'
import { mostPowerfulRole } from '../../common/countryRole'
import { getAllowedStatusTransitions } from '../../common/assessment'

import './style.less'

class CountrySelectionItem extends React.Component {

  constructor (props) {
    super(props)
    this.state = {isOpen: false}
  }

  render () {
    const name = this.props.name
    const role = this.props.role
    const countries = this.props.countries || []
    const i18n = this.props.i18n
    const style = {
      backgroundImage: `url('/img/flags/${(alpha3ToAlpha2(name) || '').toLowerCase()}.svg'`
    }

    return <div className="nav__country-item" onClick={() => {
      this.setState({isOpen: R.not(this.state.isOpen)})
      if (R.isEmpty(countries)) {
        this.props.listCountries()
      }
    }}>
      <div className="nav__country-flag" style={style}></div>
      <div className="nav__country-info">
        <span className="nav__country-name">{getCountryName(name, i18n.language)}</span>
        <span className="nav__country-role">{role}</span>
      </div>
      <svg className="icon">
        <use xlinkHref="img/icon.svg#icon-small-down"/>
      </svg>
      <CountryList isOpen={this.state.isOpen} countries={countries} currentCountry={name} i18n={i18n}/>
    </div>
  }
}

const CountryList = ({isOpen, countries, currentCountry, i18n}) => {
  if (!isOpen) return <noscript/>
  return <div className="nav__country-list">
    <div className="nav__country-list-content">
      {
        R.pipe(
          R.toPairs,
          R.map(pair => <CountryRole role={pair[0]} roleCountries={pair[1]} currentCountry={currentCountry} i18n={i18n}  />
          )
        )(countries)
      }
    </div>
  </div>
}

const AssessmentStatus = ({status}) => <div className={`status-${status}`} />

const CountryRole = ({role, roleCountries, currentCountry, i18n}) =>
<div className="nav__country-list-role-countries">
  <div className="nav__country-list-role-header"><span
    className="nav__country-list-role-label">{i18n.t(`user.roles.${role.toLowerCase()}`)}</span><span
    className="nav__country-list-assessment-label">{i18n.t('countryListing.annuallyReported')}</span><span
    className="nav__country-list-assessment-label">{i18n.t('countryListing.fiveYearCycle')}</span>
  </div>
  {
    roleCountries.map(c =>
      <CountryRow key={c.countryIso} selectedCountry={currentCountry} country={c} i18n={i18n}/>
    )
  }
</div>

const CountryRow = ({selectedCountry, country, i18n}) => {
  return <Link
    to={`/country/${country.countryIso}`}
    className={`nav__country-list-item ${R.equals(selectedCountry, country.countryIso) ? 'selected' : ''}`}>
    <div className="nav__country-list-item-name">
      {getCountryName(country.countryIso, i18n.language)}
    </div>
    {
      country.annualAssesment
        ? <span
        className="nav__country-list-item-assessment-status"><AssessmentStatus
        status={country.annualAssesment}/> {i18n.t(`navigation.assessmentStatus.${country.annualAssesment}.label`)}</span>
        : null
    }
    {
      country.fiveYearAssesment
        ? <span
        className="nav__country-list-item-assessment-status"><AssessmentStatus
        status={country.fiveYearAssesment}/>{i18n.t(`navigation.assessmentStatus.${country.fiveYearAssesment}.label`)}</span>
        : null
    }

  </Link>
}

const changeStateLink = (countryIso, assessmentType, currentStatus, targetStatus, changeAssessmentStatus, direction, i18n) => {

  const label = currentStatus === 'changing'
    ? i18n.t('navigation.assessmentStatus.changing.label')
    : i18n.t(`navigation.assessmentStatus.${targetStatus}.${direction}`)

  return <a className={targetStatus ? 'nav__primary-assessment-action' : 'nav__primary-assessment-action--disabled'}
            href="#"
            onClick={(evt) => {
              evt.preventDefault()
              if (targetStatus) changeAssessmentStatus(countryIso, assessmentType, targetStatus)
            }}>{label}</a>
}

const PrimaryItem = ({label, countryIso, assessmentType, assessmentStatuses, changeAssessmentStatus, userInfo, i18n}) => {
  if (!countryIso || !userInfo)
    return <noscript/>

  const currentAssessmentStatus = R.path([assessmentType], assessmentStatuses)
  const allowedTransitions = getAllowedStatusTransitions(mostPowerfulRole(countryIso, userInfo), currentAssessmentStatus)
  const nextAssessmentStatus = allowedTransitions.next
  const previousAssessmentStatus = allowedTransitions.previous

  return <div className="nav__primary-item">
    <span className="nav__primary-label">{label}</span>
    {
      currentAssessmentStatus
        ? <span className="nav__assessment-status">{i18n.t(`navigation.assessmentStatus.${currentAssessmentStatus}.label`)}</span>
        : null
    }
    {
      previousAssessmentStatus
        ? <span className="nav__to-previous-assessment-status">(
          {
            changeStateLink(countryIso, assessmentType, currentAssessmentStatus, previousAssessmentStatus, changeAssessmentStatus, 'previous', i18n)
          }
          )</span>
        : null
    }
    {
      changeStateLink(countryIso, assessmentType, currentAssessmentStatus, nextAssessmentStatus, changeAssessmentStatus, 'next', i18n)
    }
  </div>
}

const ReviewStatus = ({status, userInfo}) =>
  status.issuesCount > 0
    ? <div
      className={`nav__secondary-has-open-issue ${R.propOr(null, 'id', userInfo) !== status.lastCommentUserId ? 'issue-last-comment-other-user' : ''}`}/>
    : null

const NationalDataItem = ({path, countryIso, pathTemplate = '/tbd', status = {count: 0}, label, userInfo}) => {
  const route = new Route(pathTemplate)
  const linkTo = route.reverse({countryIso})

  return <Link className={`nav__link-item ${R.equals(path, linkTo) ? 'selected' : ''}`}
               to={linkTo}>
    <span className="nav__link-label">{label}</span>
    <span className="nav__link-item-status">{status.count}</span>
    <span className="nav__link-review-status">
      <ReviewStatus status={status} userInfo={userInfo}/>
    </span>
    <span className="nav__link-error-status">
      {status.errors ? <svg className="icon icon-middle icon-red">
          <use xlinkHref="img/icon.svg#icon-alert"/>
        </svg>
        : null
      }
    </span>
  </Link>
}

const SecondaryItem = ({path, countryIso, order, pathTemplate = '/tbd', label, status, userInfo}) => {
  const route = new Route(pathTemplate)
  const linkTo = route.reverse({countryIso})
  const isTodoItem = pathTemplate.indexOf('/todo') !== -1
  const secondaryTextClass = isTodoItem ? 'nav__disabled-menu-item-text' : ''

  return <Link className={`nav__secondary-item ${R.equals(path, linkTo) ? 'selected' : ''}`}
               to={linkTo}>
    <span className={`nav__secondary-order ${secondaryTextClass}`}>{order}</span>
    <div>
      <span className={`nav__secondary-label ${secondaryTextClass}`}>{label}</span>
    </div>
    <div className='nav__secondary-status-content'>
      <ReviewStatus status={status} userInfo={userInfo}/>
    </div>
  </Link>
}

const roleLabel = (countryIso, userInfo, i18n) => i18n.t(mostPowerfulRole(countryIso, userInfo).labelKey)

const Nav = ({
               path,
               country,
               countries,
               follow,
               getCountryList,
               changeAssessmentStatus,
               status = {},
               userInfo,
               i18n
             }) => {

  const getReviewStatus = section => R.pipe(
    R.defaultTo({}),
    R.prop(section),
    R.defaultTo({issuesCount: 0})
  )(status.reviewStatus)

  return <div className="main__nav-wrapper">
    <div className="main__nav">
      <CountrySelectionItem name={country}
                            countries={countries}
                            listCountries={getCountryList}
                            role={roleLabel(country, userInfo, i18n)}
                            i18n={i18n}/>
      <div className="nav__link-list">
        <NationalDataItem label={i18n.t('nationalDataPoint.nationalData')}
                          countryIso={country}
                          status={R.merge(getReviewStatus('NDP'), status.odpStatus)}
                          path={path}
                          pathTemplate="/country/:countryIso/odps"
                          userInfo={userInfo}/>
        <PrimaryItem label={i18n.t('navigation.annuallyReported')}
                     countryIso={country}
                     assessmentType="annuallyReported"
                     assessmentStatuses={status.assessmentStatuses}
                     changeAssessmentStatus={changeAssessmentStatus}
                     userInfo={userInfo}
                     i18n={i18n}/>
        {
          annualItems(i18n).map(v => <SecondaryItem path={path} key={v.label} goTo={follow}
                                                    countryIso={country}
                                                    status={getReviewStatus(v.section)}
                                                    userInfo={userInfo}
                                                    {...v} />)
        }
        <PrimaryItem label={i18n.t('navigation.fiveYearCycle')}
                     countryIso={country}
                     assessmentType="fiveYearCycle"
                     assessmentStatuses={status.assessmentStatuses}
                     changeAssessmentStatus={changeAssessmentStatus}
                     userInfo={userInfo}
                     i18n={i18n}/>
        {
          fiveYearItems(i18n).map(v => <SecondaryItem path={path} key={v.label} goTo={follow}
                                                      countryIso={country}
                                                      status={getReviewStatus(v.section)}
                                                      userInfo={userInfo}
                                                      {...v} />)
        }
      </div>
    </div>
  </div>
}

class NavigationSync extends React.Component {

  componentWillMount () {
    this.props.fetchCountryOverviewStatus(this.props.country)
  }

  componentWillReceiveProps (next) {
    if (!R.equals(this.props.country, next.country)) {
      this.props.fetchCountryOverviewStatus(next.country)
    }
  }

  render () {
    return <Nav {...this.props} />
  }
}

const mapStateToProps = state => R.pipe(R.merge(state.navigation), R.merge(state.router))(state.user)

export default connect(mapStateToProps, {
  follow,
  getCountryList,
  fetchCountryOverviewStatus,
  changeAssessmentStatus
})(NavigationSync)
