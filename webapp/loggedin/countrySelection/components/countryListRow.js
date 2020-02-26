import React from 'react'
import * as R from 'ramda'
import { Link } from 'react-router-dom'

import { getRelativeDate } from '@webapp/utils/relativeDate'

class CountryListRow extends React.PureComponent {

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

export default CountryListRow
