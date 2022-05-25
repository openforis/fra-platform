import './countryList.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { noRole } from '@common/countryRole'
import { i18n } from 'i18next'

import { Areas, Global, Region, RegionCode } from '@meta/area'

import { useRegionGroups } from '@client/store/assessment'

import { checkMatch } from '../utils/checkMatch'
import { useUserCountryISOs } from './hooks/useUserCountryISOs'
import CountryListRoleSection from './CountryListRoleSection'
// import CountryListDownload from './CountryListDownload'
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

  return (
    <div className="country-selection-list">
      {/* <CountryListDownload /> */}

      <div className="country-selection-list__content">
        <div className="country-selection-list__global">
          {checkMatch(i18n.t(`area.${Global.WO}.listName`), query) && (
            <>
              <CountryListRow role={noRole.role} country={{ countryIso: Global.WO }} />
              <hr />
            </>
          )}

          {Object.entries(regionGroups).map(([order, regionGroup]) => {
            const regions = filterRegions({ regions: regionGroup.regions, query, i18n })
            return (
              <div key={order}>
                {regions.map(({ regionCode }) => (
                  <CountryListRow key={regionCode} role={noRole.role} country={{ countryIso: regionCode }} />
                ))}
                {regions.length > 0 && <hr />}
              </div>
            )
          })}
        </div>

        {Object.entries(countryMap).map(([role, countries]) => {
          return <CountryListRoleSection key={role} role={role} countryISOs={countries} query={query} />
        })}
      </div>
    </div>
  )
}
export default CountryList
