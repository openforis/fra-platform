import './countryList.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'
import { i18n } from 'i18next'

import { Areas, CountryIso, Global, Region, RegionCode, RegionGroup } from 'meta/area'
import { UserRoles } from 'meta/user/userRoles'

import { useCountries, useRegionGroups } from 'client/store/area'
import { useCycle } from 'client/store/assessment'
import { useIsAreaSelectorExpanded } from 'client/store/ui/areaSelector'
import { checkMatch } from 'client/utils'

import { useUserCountryISOs } from './hooks/useUserCountryISOs'
import CountryListDownload from './CountryListDownload'
import CountryListRoleSection from './CountryListRoleSection'
import CountryListRow from './CountryListRow'

type Props = {
  enableDownload: boolean
  includeCountries: boolean
  includeRegions: Array<string>
  onElementSelect: (countryIso: CountryIso | Global | RegionCode) => void
  selectedValue: CountryIso | Global | RegionCode
  showCountryRole: boolean
  query: string
}

const filterRegions = (props: {
  i18n: i18n
  includeRegions: Array<string>
  query: string
  regionGroup: RegionGroup
}): Array<Region> => {
  const { i18n, includeRegions, query, regionGroup } = props

  // If includeRegions is empty array, include all regions
  if (includeRegions && includeRegions.length > 0 && !includeRegions.includes(regionGroup.name)) return []

  return regionGroup.regions.filter(({ regionCode }) => {
    const regionLabel = i18n.t(Areas.getTranslationKey(regionCode))
    const matchQuery = checkMatch(regionLabel, query)
    return matchQuery
  })
}

const CountryList: React.FC<Props> = (props: Props) => {
  const { enableDownload, includeCountries, includeRegions, selectedValue, showCountryRole, onElementSelect, query } =
    props

  const { i18n } = useTranslation()
  const regionGroups = useRegionGroups()
  const countryMap = useUserCountryISOs()
  const allCountries = useCountries()
  const cycle = useCycle()
  const expanded = useIsAreaSelectorExpanded()

  const showCountriesWithRoles = includeCountries && showCountryRole
  const showCountriesWithoutRoles = includeCountries && !showCountryRole

  return (
    <div className={classNames('country-selection-list', { expanded })}>
      {enableDownload && <CountryListDownload />}

      <div className="country-selection-list__content">
        <div className="country-selection-list__global">
          {includeRegions &&
            Object.entries(regionGroups).map(([order, regionGroup]) => {
              const regions = filterRegions({ regionGroup, query, i18n, includeRegions })
              return (
                <div key={order}>
                  {regions.map(({ regionCode }) => (
                    <CountryListRow
                      key={regionCode}
                      country={{ countryIso: regionCode }}
                      onElementSelect={onElementSelect}
                      role={UserRoles.noRole.role}
                      selectedValue={selectedValue}
                    />
                  ))}
                  {regions.length > 0 && <hr />}
                </div>
              )
            })}
        </div>

        {showCountriesWithRoles &&
          Object.entries(countryMap).map(([role, cycleCountries]) => (
            <CountryListRoleSection
              key={role}
              countryISOs={cycleCountries[cycle.uuid]}
              onElementSelect={onElementSelect}
              query={query}
              role={role}
              selectedValue={selectedValue}
            />
          ))}

        {showCountriesWithoutRoles &&
          allCountries.map(({ countryIso }) => {
            const countryLabel = i18n.t(Areas.getTranslationKey(countryIso))

            const matchCountry = checkMatch(countryLabel, query)

            if (!matchCountry) return null

            return (
              <CountryListRow
                key={countryIso}
                country={{ countryIso }}
                onElementSelect={onElementSelect}
                role={UserRoles.noRole.role}
                selectedValue={selectedValue}
              />
            )
          })}
      </div>
    </div>
  )
}
export default CountryList
