import '@webapp/app/components/countrySelection/components/countryList.less'
import React from 'react'
import PropTypes from 'prop-types'
import { levels } from '@webapp/app/statisticalFactsheets/common/levels'
import ListItem from './listItem'

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
          {countries.length > 0 &&
            countries.map((country) => !levels.region.includes(country) && <ListItem key={country} item={country} />)}
        </div>
      </div>
    </div>
  )
}

List.propTypes = {
  countries: PropTypes.array.isRequired,
}

export default List
