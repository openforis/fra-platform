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
    return <div className="country__item" onClick={() => {
        this.setState({isOpen: R.not(this.state.isOpen)})
        if (R.isEmpty(countries)) {
          this.props.listCountries()
        }
      }}>
      <div className="country__flag" style={style}></div>
      <div className="country__info">
        <span className="country__name">{I18n.getName(name, 'en')}</span>
        <span className="country__nc">{role}</span>
      </div>
      <div className="country__change">⬍</div>
      <CountryList isOpen={this.state.isOpen} countries={countries} currentCountry={name}/>
    </div>
  }
}

const CountryList = ({isOpen, countries, currentCountry}) => {
  return <div className={`country__list ${isOpen ? '' : 'hidden'}`}>
    <div className="country__list-content">
      {
        countries.map(c => <Link className={`country__list-item ${R.equals(currentCountry, c.countryIso) ? 'selected' : ''}`} to={`/country/${c.countryIso}`} key={c.countryIso}>{c.name}</Link>)
      }
    </div>
  </div>
}

const PrimaryItem = ({label, link}) =>
  <div className="primary__item">
    <span className="primary__label">{label}</span>
    <Link className="primary__link" to="/">{link}</Link>
  </div>

const SecondaryItem = ({path, countryIso, order, pathTemplate = '/tbd', label, status}) => {
  const route = new Route(pathTemplate)
  const linkTo = route.reverse({countryIso})

  return <Link className={`secondary__item ${R.equals(path, linkTo) ? 'selected' : ''}`}
               to={ linkTo }>
    <span className="secondary__order">{order}</span>
    <div>
      <span className="secondary__label">{label}</span>
      <span className="secondary__status">{status}</span>
    </div>
  </Link>
}

const hideNav = path => !path || R.equals("/", path) || R.equals("#/", path)


const Nav = ({path, country, countries, follow, getCountryList}) => {
  return <div className={`main__navigation ${hideNav(path) ? 'hidden' : ''}`}>
    <CountryItem name={country} countries={countries} listCountries={getCountryList} role="National Correspondent"/>
    <PrimaryItem label="National Data" />
    <PrimaryItem label="Annually reported" link="Send to review"/>
    {
      annualItems.map(v => <SecondaryItem path={path} key={v.label} goTo={follow} countryIso={country} {...v} />)
    }
    <PrimaryItem label="Five-year Cycle" link="Send to review"/>
    {
      fiveYearItems.map(v => <SecondaryItem key={v.label} {...v} />)
    }
  </div>
}

const mapStateToProps = state => {
  return R.pipe(R.pick(['navigation', 'router']), R.values, R.reduce(R.merge, {}), R.defaultTo({}))(state)
}

export default connect(mapStateToProps, {follow, getCountryList})(Nav)
