import '@webapp/app/components/countrySelection/components/countryList.less'

import React from 'react'
import PropTypes from 'prop-types'
import { useI18n } from '@webapp/components/hooks'
import * as BasePaths from '@webapp/main/basePaths'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import * as CountryState from '@webapp/app/country/countryState'

const levels = {
  global: 'WO',
  region: ['AF', 'AS', 'EU', 'NA', 'OC', 'SA'],
}

const ListItem = (props) => {
  const { item } = props
  const i18n = useI18n()
  const getLabel = (key) => {
    if (key === levels.global || levels.region.includes(key)) {
      return i18n.t(`statisticalFactsheets.category.${key}`)
    }
    const country = useSelector(CountryState.getCountryByCountryIso(key))
    return country.listName[i18n.language]
  }

  return (
    <Link to={BasePaths.getStatisticalFactsheetsWithLevelIso(item)} className="country-selection-list__row">
      <span className="country-selection-list__primary-col">{getLabel(item)}</span>
    </Link>
  )
}

ListItem.propTypes = {
  item: PropTypes.string.isRequired,
}

const List = (props) => {
  const { countries = [] } = props

  return (
    <div className="country-selection-list">
      <div className="country-selection-list__content">
        <div className="country-selection-list__section">
          <ListItem item={levels.global} />
          <hr />
          {levels.region.map((region) => (
            <ListItem key={region} item={region} />
          ))}
          <hr />
          {countries.map((country) => !levels.region.includes(country) && <ListItem key={country} item={country} />)}
        </div>
      </div>
    </div>
  )
}

List.propTypes = {
  countries: PropTypes.array.isRequired,
}

export default List
