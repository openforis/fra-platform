import './countryList.less'

import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { Area } from '@common/country'
import { noRole } from '@common/countryRole'
import * as CountryState from '@webapp/app/country/countryState'

import { useI18n } from '@webapp/components/hooks'
import { checkMatch } from '@webapp/components/countrySelection/utils/checkMatch'
import CountryListDownload from './countryListDownload'
import CountryListRoleSection from './countryListRoleSection'
import CountryListRow from './countryListRow'

const CountryList = () => {
  const countries = useSelector(CountryState.getCountries)
  const [query, setQuery] = useState('')

  const i18n = useI18n()

  return (
    <div className="country-selection-list">
      <CountryListDownload />

      <div className="country-selection-list-header">
        <input
          type="text"
          className="text-input"
          // eslint-disable-next-line
          autoFocus={true}
          placeholder={i18n.t('emoji.picker.search')}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      <hr />

      <div className="country-selection-list__content">
        <div className="country-selection-list__global">
          {checkMatch(i18n.t(`area.${Area.levels.global}.listName`), query) && (
            <CountryListRow role={noRole.role} country={{ countryIso: Area.levels.global }} />
          )}
          <hr />
          {Area.levels.regions
            .filter((region) => checkMatch(i18n.t(`area.${region}.listName`), query))
            .map((region) => (
              <CountryListRow key={region} role={noRole.role} country={{ countryIso: region }} />
            ))}
          <hr />
        </div>

        {Object.keys(countries).map((role) => (
          <CountryListRoleSection key={role} role={role} roleCountries={countries[role]} query={query} />
        ))}
      </div>
    </div>
  )
}

export default CountryList
