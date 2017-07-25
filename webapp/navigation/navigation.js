import * as R from 'ramda'
import React from 'react'
import { connect } from 'react-redux'
import Route from 'route-parser'
import I18n from 'i18n-iso-countries'

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
    const style = {
      backgroundImage: `url('/img/flags/${(I18n.alpha3ToAlpha2(name) || '').toLowerCase()}.svg'`
    }
    return <div className="nav__country-item" onClick={() => {
      this.setState({isOpen: R.not(this.state.isOpen)})
      if (R.isEmpty(countries)) {
        this.props.listCountries()
      }
    }}>
      <div className="nav__country-flag" style={style}></div>
      <div className="nav__country-info">
        <span className="nav__country-name">{I18n.getName(name, 'en')}</span>
        <span className="nav__country-role">{role}</span>
      </div>
      <svg className="icon">
        <use xlinkHref="img/icon.svg#icon-small-down"/>
      </svg>
      <CountryList isOpen={this.state.isOpen} countries={countries} currentCountry={name}/>
    </div>
  }
}

const CountryRow = ({selectedCountry, country}) =>
  <Link
    to={`/country/${country.countryIso}`}
    className={`nav__country-list-item ${R.equals(selectedCountry, country.countryIso) ? 'selected' : ''}`}>
    <div className="nav__country-list-item-name">
      {country.name}
    </div>
    {
      // Editing is not shown at all, let's not take space from the narrow dropdown in that case
      country.assessmentStatus !== 'editing'
        ? <span
          className="nav__country-list-item-assessment-status">{assessmentStatusLabels[country.assessmentStatus]}</span>
        : null
    }

  </Link>

const CountryList = ({isOpen, countries, currentCountry}) => {
  if (!isOpen) return <noscript/>
  return <div className="nav__country-list">
    <div className="nav__country-list-content">
      {
        countries.map(c => <CountryRow key={c.countryIso} selectedCountry={currentCountry} country={c}/>)
      }
    </div>
  </div>
}

const assessmentStatusLabels = {
  'review': 'In Review',
  'accepted': 'Accepted',
  'editing': null //Currently we do not wish to show the default state at all
}

const changeAssessmentStatusLabel = (currentStatus, targetStatus, direction) => {
  const changeAssessmentStatusLabels =
    {
      'review-next': 'Send to review',
      'accepted-next': 'Accept',
      'editing-next': 'Start over (to editing)',
      'review-previous': 'Back to review',
      'accepted-previous': null,
      'editing-previous': 'remove'
    }
  if (currentStatus === 'changing') return 'Changing...'
  return changeAssessmentStatusLabels[`${targetStatus}-${direction}`]
}

const changeStateLink = (countryIso,
                         assessmentType,
                         currentStatus,
                         targetStatus,
                         changeAssessmentStatus,
                         direction) =>
  <a className={targetStatus ? 'nav__primary-assessment-action' : 'nav__primary-assessment-action--disabled'}
     href="#"
     onClick={(evt) => {
       evt.preventDefault()
       if (targetStatus) changeAssessmentStatus(countryIso, assessmentType, targetStatus)
     }}>
    {changeAssessmentStatusLabel(currentStatus, targetStatus, direction)}
  </a>

const PrimaryItem = ({label, countryIso, assessmentType, assessmentStatuses, changeAssessmentStatus, userInfo}) => {
  if (!countryIso || !userInfo) return <noscript/>
  const currentAssessmentStatus = R.path([assessmentType], assessmentStatuses)
  const currentAssessmentStatusLabel = assessmentStatusLabels[currentAssessmentStatus]
  const allowedTransitions = getAllowedStatusTransitions(mostPowerfulRole(countryIso, userInfo), currentAssessmentStatus)
  const nextAssessmentStatus = allowedTransitions.next
  const previousAssessmentStatus = allowedTransitions.previous
  return <div className="nav__primary-item">
    <span className="nav__primary-label">{label}</span>
    {
      currentAssessmentStatusLabel
        ? <span className="nav__assessment-status">{currentAssessmentStatusLabel}</span>
        : null
    }
    {
      previousAssessmentStatus
        ? <span className="nav__to-previous-assessment-status">(
          {
            changeStateLink(
              countryIso,
              assessmentType,
              currentAssessmentStatus,
              previousAssessmentStatus,
              changeAssessmentStatus,
              'previous')
          }
          )</span>
        : null
    }
    {
      changeStateLink(
        countryIso,
        assessmentType,
        currentAssessmentStatus,
        nextAssessmentStatus,
        changeAssessmentStatus,
        'next')
    }
  </div>
}

const NationalDataItem = ({path, countryIso, pathTemplate = '/tbd', status = {count: 0, issuesCount: 0}, label}) => {
  const route = new Route(pathTemplate)
  const linkTo = route.reverse({countryIso})

  return <Link className={`nav__link-item ${R.equals(path, linkTo) ? 'selected' : ''}`}
               to={linkTo}>
    <span className="nav__link-label">{label}</span>
    <span className="nav__link-item-status">{status.count}</span>
    <span className="nav__link-review-status">
      {status.issuesCount > 0 ? <div className='nav__secondary-has-open-issue'></div> : null}
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

const SecondaryItem = ({path, countryIso, order, pathTemplate = '/tbd', label, status = []}) => {
  const route = new Route(pathTemplate)
  const linkTo = route.reverse({countryIso})
  const isTodoItem = pathTemplate.indexOf('/todo') !== -1
  const secondaryTextClass = isTodoItem ? 'nav__disabled-menu-item-text' : ''

  const hasOpenIssues = R.pipe(R.filter(R.pipe(R.prop('status'), R.equals('open'))), R.isEmpty, R.not)(status)
  return <Link className={`nav__secondary-item ${R.equals(path, linkTo) ? 'selected' : ''}`}
               to={linkTo}>
    <span className={`nav__secondary-order ${secondaryTextClass}`}>{order}</span>
    <div>
      <span className={`nav__secondary-label ${secondaryTextClass}`}>{label}</span>
    </div>
    <div className='nav__secondary-status-content'>
      {hasOpenIssues ? <div className='nav__secondary-has-open-issue'></div> : null}
    </div>
  </Link>
}

const roleLabel = (countryIso, userInfo) => mostPowerfulRole(countryIso, userInfo).label

const Nav = ({
               path,
               country,
               countries,
               follow,
               getCountryList,
               changeAssessmentStatus,
               status = {},
               userInfo
             }) => {
  return <div className="main__nav-wrapper">
    <div className="main__nav">
      <CountrySelectionItem name={country} countries={countries} listCountries={getCountryList}
                            role={roleLabel(country, userInfo)}/>
      <div className="nav__link-list">
        <NationalDataItem label="National Data"
                          countryIso={country}
                          status={R.merge(status.reviewStatus, status.odpStatus)}
                          path={path} pathTemplate="/country/:countryIso/odps"/>
        <PrimaryItem label="Annually reported"
                     countryIso={country}
                     assessmentType="annuallyReported"
                     assessmentStatuses={status.assessmentStatuses}
                     changeAssessmentStatus={changeAssessmentStatus}
                     userInfo={userInfo}/>
        {
          annualItems.map(v => <SecondaryItem path={path} key={v.label} goTo={follow}
                                              countryIso={country}
                                              status={R.filter(R.pipe(R.prop('section'), R.equals(R.defaultTo('', v.section))))(status.reviewStatus || [])}
                                              {...v} />)
        }
        <PrimaryItem label="Five-year Cycle"
                     countryIso={country}
                     assessmentType="fiveYearCycle"
                     assessmentStatuses={status.assessmentStatuses}
                     changeAssessmentStatus={changeAssessmentStatus}
                     userInfo={userInfo}/>
        {
          fiveYearItems.map(v => <SecondaryItem path={path} key={v.label} goTo={follow} countryIso={country} {...v} />)
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
