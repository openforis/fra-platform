import * as R from 'ramda'
import React from 'react'
import { connect } from 'react-redux'
import Route from 'route-parser'
import I18n from 'i18n-iso-countries'

import { Link } from './../link'
import { follow } from './../router/actions'
import { getCountryList } from './actions'
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
    return <div className="navi__country-item" onClick={() => {
        this.setState({isOpen: R.not(this.state.isOpen)})
        if (R.isEmpty(countries)) {
          this.props.listCountries()
        }
      }}>
      <div className="navi__country-flag" style={style}></div>
      <div className="navi__country-info">
        <span className="navi__country-name">{I18n.getName(name, 'en')}</span>
        <span className="navi__country-nc">{role}</span>
      </div>
      <svg className="icon"><use xlinkHref="img/icon.svg#icon-small-down"/></svg>
      <CountryList isOpen={this.state.isOpen} countries={countries} currentCountry={name}/>
    </div>
  }
}

const CountryList = ({isOpen, countries, currentCountry}) => {
  if (!isOpen) return <noscript/>
  return <div className="navi__country-list">
    <div className="navi__country-list-content">
      {
        countries.map(c => <Link className={`navi__country-list-item ${R.equals(currentCountry, c.countryIso) ? 'selected' : ''}`} to={`/country/${c.countryIso}`} key={c.countryIso}>{c.name}</Link>)
      }
    </div>
  </div>
}

const PrimaryItem = ({label, link}) =>
  <div className="navi__primary-item">
    <span className="navi__primary-label">{label}</span>
    <Link className="navi__primary-link" to="/">{link}</Link>
  </div>

const LinkItem = ({path, countryIso, pathTemplate = '/tbd', label}) => {
  const route = new Route(pathTemplate)
  const linkTo = route.reverse({countryIso})

  return <Link className={`navi__link-item ${R.equals(path, linkTo) ? 'selected' : ''}`}
               to={ linkTo }>
      <span className="navi__link-label">{label}</span>
  </Link>
}

const SecondaryItem = ({path, countryIso, order, pathTemplate = '/tbd', label, status}) => {
  const route = new Route(pathTemplate)
  const linkTo = route.reverse({countryIso})
  const isTodoItem = pathTemplate.indexOf('/todo') !== -1
  const secondaryTextClass = isTodoItem ? 'navi__disabled-menu-item-text' : ''

  return <Link className={`navi__secondary-item ${R.equals(path, linkTo) ? 'selected' : ''}`}
               to={ linkTo }>
    <span className={`navi__secondary-order ${secondaryTextClass}`}>{order}</span>
    <div>
      <span className={`navi__secondary-label ${secondaryTextClass}`}>{label}</span>
      <span className={`navi__secondary-status ${secondaryTextClass}`}>{status}</span>
    </div>
  </Link>
}

const roleLabel = (userInfo) => {
  if (!userInfo) return null
  const reviewerFound = R.find(R.propEq('role', 'REVIEWER'))(userInfo.roles)
  if (reviewerFound) return 'Reviewer'
  const nationalCorrespondentFound = R.find(R.propEq('role', 'NATIONAL_CORRESPONDENT'))(userInfo.roles)
  if (nationalCorrespondentFound) return 'National Correspondent'
  return null
}

const Nav = ({path, country, countries, follow, getCountryList, userInfo}) => {
  return <div className="main__navigation">
    <CountryItem name={country} countries={countries} listCountries={getCountryList} role={ roleLabel(userInfo) }/>
    <LinkItem label="National Data" countryIso={country} path={path} pathTemplate="/country/:countryIso/odp" />
    <PrimaryItem label="Annually reported"/>
    {
      annualItems.map(v => <SecondaryItem path={path} key={v.label} goTo={follow} countryIso={country} {...v} />)
    }
    <PrimaryItem label="Five-year Cycle"/>
    {
      fiveYearItems.map(v => <SecondaryItem key={v.label} {...v} />)
    }
  </div>
}

const mapStateToProps = state => R.pipe(R.merge(state.navigation), R.merge(state.router))(state.user)

export default connect(mapStateToProps, {follow, getCountryList})(Nav)
