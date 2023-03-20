import './countryList.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { i18n } from 'i18next'

import { Areas, Global, Region, RegionCode } from '@meta/area'
import { UserRoles } from '@meta/user/userRoles'

import { useCycle, useRegionGroups } from '@client/store/assessment'
import { useIsPanEuropean } from '@client/hooks'
import { checkMatch } from '@client/utils'

import { useUserCountryISOs } from './hooks/useUserCountryISOs'
import CountryListDownload from './CountryListDownload'
import CountryListRoleSection from './CountryListRoleSection'
import CountryListRow from './CountryListRow'

type Props = {
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
  const { query } = props

  const { i18n } = useTranslation()
  const regionGroups = useRegionGroups()
  const countryMap = useUserCountryISOs()
  const isPanEuropean = useIsPanEuropean()
  const cycle = useCycle()

  return (
    <div className="country-selection-list">
      <CountryListDownload />

      <div className="country-selection-list__content">
        <div className="country-selection-list__global">
          {checkMatch(i18n.t(`area.${isPanEuropean ? RegionCode.FE : Global.WO}.listName`), query) && (
            <>
              <CountryListRow
                role={UserRoles.noRole.role}
                country={{ countryIso: isPanEuropean ? RegionCode.FE : Global.WO }}
              />
              <hr />
            </>
          )}

          {Object.entries(regionGroups).map(([order, regionGroup]) => {
            const regions = filterRegions({ regions: regionGroup.regions, query, i18n })
            return (
              <div key={order}>
                {regions.map(({ regionCode }) => (
                  <CountryListRow key={regionCode} role={UserRoles.noRole.role} country={{ countryIso: regionCode }} />
                ))}
                {regions.length > 0 && <hr />}
              </div>
            )
          })}
        </div>

        {Object.entries(countryMap).map(([role, cycleCountries]) => {
          const countries = cycleCountries[cycle.uuid]
          return <CountryListRoleSection key={role} role={role} countryISOs={countries} query={query} />
        })}
      </div>
    </div>
  )
}
export default CountryList
