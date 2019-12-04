import React from 'react'
import * as R from 'ramda'
import { Link } from 'react-router-dom'
import { CSVLink } from 'react-csv'

import Icon from '../../reusableUiComponents/icon'

import { isAdministrator } from '../../../common/countryRole'

import { getRelativeDate } from '../../utils/relativeDate'
import { getRoleLabelKey } from '../../../common/countryRole'

export default class CountrySelection extends React.Component {

  constructor (props) {
    super(props)
    this.state = { isOpen: false }
    this.outsideClick = this.outsideClick.bind(this)
    window.addEventListener('click', this.outsideClick)
  }

  outsideClick (evt) {
    if (!this.refs.navCountryItem.contains(evt.target))
      this.setState({ isOpen: false })
  }

  componentWillUnmount () {
    window.removeEventListener('click', this.outsideClick)
  }

  render () {
    const countryIso = this.props.name
    const { role, i18n, getCountryName } = this.props
    const { isOpen } = this.state

    const style = {
      backgroundImage: `url('/img/flags/1x1/${countryIso}.svg'), url('/img/flags/1x1/ATL.svg')`
    }

    return (
      <div className="nav__country" ref="navCountryItem" onClick={() => {
        this.setState({ isOpen: R.not(this.state.isOpen) })
      }}>
        <div className="nav__country-flag" style={style}></div>
        <div className="nav__country-info">
          <span className="nav__country-name">{getCountryName(countryIso, i18n.language)}</span>
          <span className="nav__country-role">{role}</span>
        </div>
        <Icon name="small-down"/>
        {
          isOpen &&
          <CountryList
            {...this.props}
            isOpen={this.state.isOpen}
            currentCountry={countryIso}
          />
        }
      </div>
    )
  }
}

const CountryList = ({ isOpen, countries, userInfo, ...props }) => {
  const roleCountriesPair = R.toPairs(countries)
  const { getCountryName, i18n } = props

  return (
    <div className="nav__country-list">
      {
        isAdministrator(userInfo) &&
        <div className="nav__country-list-download">
          <CSVLink
            className="btn-s btn-primary"
            target="_blank"
            filename="FRA-Countries.csv"
            data={
              R.pipe(
                R.map(
                  ([role, roleCountries]) =>
                    R.map(country => ({
                      name: getCountryName(country.countryIso, i18n.language),
                      status: i18n.t(`assessment.status.${country.fra2020Assessment}.label`),
                      edited: getRelativeDate(country.lastEdit, i18n) || i18n.t('audit.notStarted'),
                      deskStudy: i18n.t(`yesNoTextSelect.${R.propEq('fra2020DeskStudy', true, country) ? 'yes' : 'no'}`)
                    }), roleCountries)
                ),
                R.flatten
              )(roleCountriesPair)
            }
            headers={[
              { label: i18n.t('admin.country'), key: 'name' },
              { label: i18n.t('countryListing.fra2020'), key: 'status' },
              { label: i18n.t('audit.edited'), key: 'edited' },
              { label: i18n.t('assessment.deskStudy'), key: 'deskStudy' },
            ]}>
            <Icon className="icon-sub icon-white" name="hit-down"/>CSV
          </CSVLink>
        </div>
      }

      <div className="nav__country-list-content">
        {
          R.map(
            ([role, roleCountries]) =>
              <CountryRole
                {...props}
                key={role}
                role={role}
                roleCountries={roleCountries}
              />
            , roleCountriesPair
          )
        }
      </div>
    </div>
  )
}

const CountryRole = ({ role, roleCountries, currentCountry, i18n, ...props }) =>
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

class CountryRow extends React.PureComponent {

  isSelected () {
    const { selectedCountry, country } = this.props
    return R.equals(selectedCountry, country.countryIso)
  }

  componentDidMount () {
    if (this.isSelected())
      this.refs.countryNameRef.scrollIntoView(
        { behavior: 'smooth', block: 'center', inline: 'nearest' }
      )
  }

  render () {
    const { country, i18n, getCountryName } = this.props

    return (
      <Link
        to={`/country/${country.countryIso}/`}
        className={`nav__country-list-row ${this.isSelected() ? 'selected' : ''}`}>

        <span className="nav__country-list-primary-col" ref="countryNameRef">
          {getCountryName(country.countryIso, i18n.language)}
        </span>

        {
          country.fra2020Assessment ?
            <span className="nav__country-list-secondary-col">
              <div className={`status-${country.fra2020Assessment}`}/>
              {i18n.t(`assessment.status.${country.fra2020Assessment}.label`)}
            </span>
            : null
        }

        <span className="nav__country-list-secondary-col">
          {getRelativeDate(country.lastEdit, i18n) || i18n.t('audit.notStarted')}
        </span>
      </Link>
    )
  }
}
