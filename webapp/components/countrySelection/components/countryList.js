import './countryList.less'

import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { Area } from '@common/country'
import { noRole } from '@common/countryRole'
import * as CountryState from '@webapp/app/country/countryState'

import { useI18n } from '@webapp/components/hooks'
import { checkMatch } from '@webapp/components/countrySelection/utils/checkMatch'
import CountryListDownload from './countryListDownload'
import CountryListRoleSection from './countryListRoleSection'
import CountryListRow from './countryListRow'

const CountryList = (props) => {
  const { query } = props
  const countries = useSelector(CountryState.getCountries)

  const i18n = useI18n()

  const filteredRegions = Area.levels.regions.filter((region) => checkMatch(i18n.t(`area.${region}.listName`), query))

  return (
    <div className="country-selection-list">
      <CountryListDownload />

      <div className="country-selection-list__content">
        <div className="country-selection-list__global">
          {checkMatch(i18n.t(`area.${Area.levels.global}.listName`), query) && (
            <>
              <CountryListRow role={noRole.role} country={{ countryIso: Area.levels.global }} />
              <hr />
            </>
          )}
          {filteredRegions.map((region) => (
            <CountryListRow key={region} role={noRole.role} country={{ countryIso: region }} />
          ))}
          {filteredRegions.length > 0 && <hr />}
        </div>

        {Object.keys(countries).map((role) => (
          <CountryListRoleSection key={role} role={role} roleCountries={countries[role]} query={query} />
        ))}
      </div>
    </div>
  )
}

CountryList.defaultProps = {
  query: '',
}

CountryList.propTypes = {
  query: PropTypes.string,
}

export default CountryList
