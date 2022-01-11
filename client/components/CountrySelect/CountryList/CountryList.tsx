import './countryList.scss'
import React from 'react'

import { Areas, CountryIso, Global, RegionCode } from '@meta/area'
import { noRole } from '@common/countryRole'

import { useCountries, useRegionGroups } from '@client/store/assessment'
import { useTranslation } from 'react-i18next'
import { AssessmentName } from '@meta/assessment'
import { useUser, useUserCountries } from '@client/store/user'
import { RoleName, Users } from '@meta/user'
import { checkMatch } from '../utils/checkMatch'

// import CountryListDownload from './CountryListDownload'
import CountryListRow from './CountryListRow'
import CountryListRoleSection from './CountryListRoleSection'

type Props = {
  query: string
}

const CountryList: React.FC<Props> = (props: Props) => {
  const { query } = props

  const { i18n } = useTranslation()

  const allCountries = useCountries()
  const regionGroups = useRegionGroups()
  const user = useUser()
  const userCountries = useUserCountries()

  const filterRegions = (regions: any) =>
    regions
      .filter((region: any) => checkMatch(i18n.t(Areas.getTranslationKey(region.regionCode)), query))
      .filter((region: any) => region.regionCode !== RegionCode.FE)

  const countryMap: Record<string, Array<CountryIso>> = {}
  if (Users.isAdministrator(user)) {
    countryMap[RoleName.ADMINISTRATOR] = [...userCountries]
  } else {
    user.roles.forEach((role) => {
      if (!Array.isArray(countryMap[role.role])) countryMap[role.role] = []
      countryMap[role.role].push(role.countryIso)
    })
    countryMap[noRole.role] = allCountries.filter((countryIso: CountryIso) => !userCountries.includes(countryIso))
  }

  return (
    <div className="country-selection-list">
      {/* <CountryListDownload /> */}

      <div className="country-selection-list__content">
        <div className="country-selection-list__global">
          {checkMatch(i18n.t(`area.${Global.WO}.listName`), query) && (
            <>
              <CountryListRow
                role={noRole.role}
                country={{ countryIso: Global.WO }}
                assessmentType={AssessmentName.fra}
              />
              <hr />
            </>
          )}
          {Object.entries(regionGroups).map(([order, regionGroup]: any) => {
            return (
              <div key={order}>
                {filterRegions(regionGroup.regions).map(({ regionCode }: any) => (
                  <CountryListRow
                    key={regionCode}
                    role={noRole.role}
                    country={{ countryIso: regionCode }}
                    assessmentType={AssessmentName.fra}
                  />
                ))}
                {filterRegions(regionGroup.regions).length > 0 && <hr />}
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
