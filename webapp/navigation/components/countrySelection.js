import React from 'react'
import * as R from 'ramda'

import { Link } from '../../reusableUiComponents/link'
import Icon from '../../reusableUiComponents/icon'

import { getRelativeDate } from '../../utils/relativeDate'
import { getRoleLabelKey } from '../../../common/countryRole'

export default class CountrySelection extends React.Component {

  constructor (props) {
    super(props)
    this.state = {isOpen: false}
    this.outsideClick = this.outsideClick.bind(this)
    window.addEventListener('click', this.outsideClick)
  }

  outsideClick (evt) {
    if (!this.refs.navCountryItem.contains(evt.target))
      this.setState({isOpen: false})
  }

  componentWillUnmount () {
    window.removeEventListener('click', this.outsideClick)
  }

  render () {
    const countryIso = this.props.name
    const {role, i18n, getCountryName} = this.props

    const style = {
      backgroundImage: `url('/img/flags/1x1/${countryIso}.svg'), url('/img/flags/1x1/ATL.svg')`
    }

    return <div className="nav__country" ref="navCountryItem" onClick={() => {
      this.setState({isOpen: R.not(this.state.isOpen)})
    }}>
      <div className="nav__country-flag" style={style}></div>
      <div className="nav__country-info">
        <span className="nav__country-name">{getCountryName(countryIso, i18n.language)}</span>
        <span className="nav__country-role">{role}</span>
      </div>
      <Icon name="small-down"/>
      <CountryList
        {...this.props}
        isOpen={this.state.isOpen}
        currentCountry={countryIso}
      />
    </div>
  }
}

const CountryList = ({isOpen, countries, ...props}) => {
  if (!isOpen) return null
  return <div className="nav__country-list">
    <div className="nav__country-list-content">
      {
        R.pipe(
          R.toPairs,
          R.map(([role, roleCountries]) =>
            <CountryRole
              {...props}
              key={role}
              role={role}
              roleCountries={roleCountries}
            />
          )
        )(countries)
      }
    </div>
  </div>
}

const CountryRole = ({role, roleCountries, currentCountry, i18n, ...props}) =>
  <div className="nav__country-list-section">
    <div className="nav__country-list-header">
      <span className="nav__country-list-primary-col">{i18n.t(getRoleLabelKey(role))}</span>
      <span className="nav__country-list-secondary-col">{i18n.t('countryListing.fra2020')}</span>
      <span className="nav__country-list-secondary-col">{i18n.t('audit.edited')}</span>
    </div>
    {
      R.map(country =>
          <CountryRow
            {...props}
            key={country.countryIso}
            country={country}
            i18n={i18n}
            selectedCountry={currentCountry}
          />
        , roleCountries)
    }
  </div>

const CountryRow = ({selectedCountry, country, fetchAllCountryData, i18n, getCountryName}) => {
  return <Link
    to={`/country/${country.countryIso}`}
    className={`nav__country-list-row ${R.equals(selectedCountry, country.countryIso) ? 'selected' : ''}`}
    onClick={() => fetchAllCountryData(country.countryIso)}>
    <span className="nav__country-list-primary-col">
      {getCountryName(country.countryIso, i18n.language)}
    </span>
    {
      country.fra2020Assessment
        ? <span className="nav__country-list-secondary-col">
            <div className={`status-${country.fra2020Assessment}`}/>
          {i18n.t(`assessment.status.${country.fra2020Assessment}.label`)}
          </span>
        : null
    }
    <span className="nav__country-list-secondary-col">
      {getRelativeDate(country.lastEdit, i18n) || i18n.t('audit.notStarted')}
    </span>
  </Link>
}
