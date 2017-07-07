import * as R from 'ramda'
import React from 'react'
import { connect } from 'react-redux'
import Route from 'route-parser'
import I18n from 'i18n-iso-countries'

import { Link } from './../link'
import { follow } from './../router/actions'
import { getCountryList, fetchNavStatus } from './actions'
import { annualItems, fiveYearItems } from './items'

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
      <svg className="icon"><use xlinkHref="img/icon.svg#icon-small-down"/></svg>
      <CountryList isOpen={this.state.isOpen} countries={countries} currentCountry={name}/>
    </div>
  }
}

const CountryList = ({isOpen, countries, currentCountry}) => {
  if (!isOpen) return <noscript/>
  return <div className="nav__country-list">
    <div className="nav__country-list-content">
      {
        countries.map(c => <Link className={`nav__country-list-item ${R.equals(currentCountry, c.countryIso) ? 'selected' : ''}`} to={`/country/${c.countryIso}`} key={c.countryIso}>{c.name}</Link>)
      }
    </div>
  </div>
}

const PrimaryItem = ({label, link}) =>
  <div className="nav__primary-item">
    <span className="nav__primary-label">{label}</span>
    <Link className="nav__primary-link" to="/">{link}</Link>
  </div>

const NationalDataItem = ({path, countryIso, pathTemplate = '/tbd', status = {count: 0}, label}) => {
  const route = new Route(pathTemplate)
  const linkTo = route.reverse({countryIso})

  return <Link className={`nav__link-item ${R.equals(path, linkTo) ? 'selected' : ''}`}
               to={ linkTo }>
    <span className="nav__link-label">{label}</span>
    <span className="nav__link-item-status">{status.count}</span>
    <span className="nav__link-error-status">
      { status.errors ? <svg className="icon icon-middle icon-red">
        <use xlinkHref="img/icon.svg#icon-alert"/>
      </svg>
        : null
      }
    </span>
  </Link>
}

const SecondaryItem = ({path, countryIso, order, pathTemplate = '/tbd', label, status = [], statusDescription = 'Not started'}) => {
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
      <span className={`nav__secondary-status ${secondaryTextClass}`}>{statusDescription}</span>
    </div>
    <div className='nav__secondary-status-content'>
      { hasOpenIssues ? <div className='nav__secondary-has-open-issue'></div> : null }
    </div>
  </Link>
}

const roleLabel = (userInfo) => {
  const hasRole = (role) => R.find(R.propEq('role', role))(userInfo.roles)
  if (!userInfo) return null
  if (hasRole('REVIEWER_ALL')) return 'Reviewer'
  if (hasRole('NATIONAL_CORRESPONDENT_ALL')) return 'National Correspondent'
  return null
}

const Nav = ({path, country, countries, follow, getCountryList, status = {}, userInfo}) => {
  return <div className="main__nav-wrapper">
    <div className="main__nav">
      <CountryItem name={country} countries={countries} listCountries={getCountryList} role={ roleLabel(userInfo) }/>
      <div className="nav__link-list">
        <NationalDataItem label="National Data" countryIso={country} status={status.odpStatus} path={path} pathTemplate="/country/:countryIso/odps" />
        <PrimaryItem label="Annually reported"/>
        {
          annualItems.map(v => <SecondaryItem path={path} key={v.label} goTo={follow}
                                              countryIso={country}
                                              status={R.filter(R.pipe(R.prop('section'), R.equals(R.defaultTo('', v.section))))(status.reviewStatus || [])}
                                              {...v} />)
        }
        <PrimaryItem label="Five-year Cycle"/>
        {
          fiveYearItems.map(v => <SecondaryItem path={path} key={v.label} goTo={follow} countryIso={country} {...v} />)
        }
      </div>
    </div>
  </div>
}

class NavigationSync extends React.Component {

  componentWillMount() {
    this.props.fetchNavStatus(this.props.country)
  }

  componentWillReceiveProps(next) {
    if (!R.equals(this.props.country, next.country)) {
      this.props.fetchNavStatus(next.country)
    }
  }

  render() {
    return <Nav {...this.props} />
  }
}

const mapStateToProps = state => R.pipe(R.merge(state.navigation), R.merge(state.router))(state.user)

export default connect(mapStateToProps, {follow, getCountryList, fetchNavStatus})(NavigationSync)
