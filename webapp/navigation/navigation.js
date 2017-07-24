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
import { getNextAssessmentStatus } from '../../common/assessment'

import './style.less'

class CountryItem extends React.Component {

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

const CountryList = ({isOpen, countries, currentCountry}) => {
  if (!isOpen) return <noscript/>
  return <div className="nav__country-list">
    <div className="nav__country-list-content">
      {
        countries.map(c => <Link
          className={`nav__country-list-item ${R.equals(currentCountry, c.countryIso) ? 'selected' : ''}`}
          to={`/country/${c.countryIso}`}
          key={c.countryIso}>{c.name}
        </Link>)
      }
    </div>
  </div>
}

const changeAssessmentStatusLabels =
  {
    'review': 'Accept',
    'accepted': 'Change back to editing',
    'editing': 'Send to review'
  }

const changeAssessmentStatusLabel = currentAssessmentStatus => {
  if (currentAssessmentStatus === 'changing') return 'Changing...'
  const label = changeAssessmentStatusLabels[getNextAssessmentStatus(currentAssessmentStatus)]
  return label ? label : 'Send to review'  // If nothing's stored yet, editing is considered the default
}

const PrimaryItem = ({label, countryIso, assessmentType, assessmentStatuses, changeAssessmentStatus}) => {
  const currentAssessmentStatus = R.path([assessmentType], assessmentStatuses)
  const nextAssessmentStatus = getNextAssessmentStatus(currentAssessmentStatus)
  return <div className="nav__primary-item">
    <span className="nav__primary-label">{label}</span>
    <a className={nextAssessmentStatus ? 'nav__primary-assessment-action' : 'nav__primary-assessment-action--disabled'}
       href="#"
       onClick={(evt) => {
         evt.preventDefault()
         if (nextAssessmentStatus) changeAssessmentStatus(countryIso, assessmentType, nextAssessmentStatus)
       }}>{changeAssessmentStatusLabel(currentAssessmentStatus)}</a>
  </div>
}

const NationalDataItem = ({path, countryIso, pathTemplate = '/tbd', status = {count: 0}, label}) => {
  const route = new Route(pathTemplate)
  const linkTo = route.reverse({countryIso})

  return <Link className={`nav__link-item ${R.equals(path, linkTo) ? 'selected' : ''}`}
               to={ linkTo }>
    <span className="nav__link-label">{label}</span>
    <span className="nav__link-item-status">{status.count}</span>
    <span className="nav__link-review-status">
      { R.isEmpty(status.issues) ? null : <div className='nav__secondary-has-open-issue'></div> }
    </span>
    <span className="nav__link-error-status">
      { status.errors ? <svg className="icon icon-middle icon-red">
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
               to={ linkTo }>
    <span className={`nav__secondary-order ${secondaryTextClass}`}>{order}</span>
    <div>
      <span className={`nav__secondary-label ${secondaryTextClass}`}>{label}</span>
    </div>
    <div className='nav__secondary-status-content'>
      { hasOpenIssues ? <div className='nav__secondary-has-open-issue'></div> : null }
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
      <CountryItem name={country} countries={countries} listCountries={getCountryList}
                   role={ roleLabel(country, userInfo) }/>
      <div className="nav__link-list">
        <NationalDataItem label="National Data"
                          countryIso={country}
                          status={R.merge({issues: R.filter(R.pipe(R.prop('section'), R.equals('NDP')))(status.reviewStatus || [])}, status.odpStatus)}
                          path={path} pathTemplate="/country/:countryIso/odps"/>
        <PrimaryItem label="Annually reported"
                     countryIso={country}
                     assessmentType="annuallyReported"
                     assessmentStatuses={status.assessmentStatuses}
                     changeAssessmentStatus={changeAssessmentStatus}/>
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
                     changeAssessmentStatus={changeAssessmentStatus}/>
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
