import './countryList.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { i18n } from 'i18next'

import { Areas, CountryIso, Global, Region, RegionCode } from 'meta/area'
import { UserRoles } from 'meta/user/userRoles'

import { useCountries, useCycle, useRegionGroups } from 'client/store/assessment'
import { useIsPanEuropean } from 'client/hooks'
import { checkMatch } from 'client/utils'

import { useUserCountryISOs } from './hooks/useUserCountryISOs'
import CountryListDownload from './CountryListDownload'
import CountryListRoleSection from './CountryListRoleSection'
import CountryListRow from './CountryListRow'

type Props = {
  enableDownload: boolean
  includeCountries: boolean
  includeGlobals: boolean
  includeRegions: boolean
  onElementSelect: (countryIso: CountryIso | Global | RegionCode) => void
  selectedValue: CountryIso | Global | RegionCode
  showCountryRole: boolean
  query: string
}

const filterRegions = (props: { regions: Array<Region>; query: string; i18n: i18n }): Array<Region> => {
  const { i18n, query, regions } = props

  return regions.filter(({ regionCode }) => {
    const regionLabel = i18n.t(Areas.getTranslationKey(regionCode))
    const matchQuery = checkMatch(regionLabel, query)
    return regionCode !== RegionCode.FE && matchQuery
  })
}

const CountryList: React.FC<Props> = (props: Props) => {
  const { enableDownload, includeCountries, includeGlobals, includeRegions, selectedValue, showCountryRole, onElementSelect, query } = props

  const { i18n } = useTranslation()
  const regionGroups = useRegionGroups()
  const countryMap = useUserCountryISOs()
  const allCountries = useCountries()
  const isPanEuropean = useIsPanEuropean()
  const cycle = useCycle()

  const global = isPanEuropean ? RegionCode.FE : Global.WO

  return (
    <div className="country-selection-list">
      {enableDownload && <CountryListDownload />}

      <div className="country-selection-list__content">
        <div className="country-selection-list__global">
          {includeGlobals && checkMatch(i18n.t(Areas.getTranslationKey(global)), query) && (
            <>
              <CountryListRow
                country={{ countryIso: global }}
                onElementSelect={onElementSelect}
                role={UserRoles.noRole.role}
                selectedValue={selectedValue}
              />
              <hr />
            </>
          )}

          {includeRegions &&
            Object.entries(regionGroups).map(([order, regionGroup]) => {
              const regions = filterRegions({ regions: regionGroup.regions, query, i18n })
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

        {includeCountries && showCountryRole
          ? Object.entries(countryMap).map(([role, cycleCountries]) => (
              <CountryListRoleSection
                key={role}
                countryISOs={cycleCountries[cycle.uuid]}
                onElementSelect={onElementSelect}
                role={role}
                selectedValue={selectedValue}
                query={query}
              />
            ))
          : allCountries.map(({ countryIso }) => (
              <CountryListRow
                key={countryIso}
                country={{ countryIso }}
                onElementSelect={onElementSelect}
                role={UserRoles.noRole.role}
                selectedValue={selectedValue}
              />
            ))}
      </div>
    </div>
  )
}
export default CountryList
