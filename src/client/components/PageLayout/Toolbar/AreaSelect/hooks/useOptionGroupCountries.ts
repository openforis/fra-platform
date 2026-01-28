import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Areas } from 'meta/area/areas'
import { CountryIso } from 'meta/area/countryIso'
import { Cycles } from 'meta/assessment/cycles'
import { RoleName } from 'meta/user/role/name'
import { UserRole } from 'meta/user/role/role'
import { UserRoles } from 'meta/user/roles'
import { Users } from 'meta/user/users'
import { Dates } from 'utils/dates'
import { Objects } from 'utils/objects'

import { useCountriesRecord } from 'client/store/area/hooks/countries'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { useAreaSelectorFilters } from 'client/store/ui/areaSelector/hooks/areaSelector'
import { AreaSelectorSortDirection } from 'client/store/ui/areaSelector/state'
import { useUser } from 'client/store/user/hooks/user'
import { useLanguage } from 'client/hooks/language'
import { OptionsGroup } from 'client/components/Inputs/Select'
import { OptionArea, OptionsGroupArea } from 'client/components/PageLayout/Toolbar/AreaSelect/types'

type Props = {
  regionGroupsLength: number
}

export const useOptionGroupCountries = (props: Props): ReadonlyArray<OptionsGroup> => {
  const { regionGroupsLength } = props

  const { t } = useTranslation()
  const cycle = useCycle()
  const user = useUser()
  const countriesRecord = useCountriesRecord()
  const lang = useLanguage()
  const { orderBy } = useAreaSelectorFilters()

  return useMemo<ReadonlyArray<OptionsGroup>>(() => {
    if (Objects.isEmpty(countriesRecord)) {
      return []
    }

    let order: number = regionGroupsLength
    let rolesGrouped: Record<string, Array<UserRole>> = {}
    const countryISOs = Object.keys(countriesRecord) as Array<CountryIso>
    const userCountryISOs: Array<CountryIso> = []

    // 1. group countryISOs by user role
    if (user) {
      const roles = Users.isAdministrator(user)
        ? countryISOs.map<UserRole>((countryIso) => {
            return { role: RoleName.ADMINISTRATOR, countryIso } as UserRole
          })
        : user.roles.filter((role) => role.cycleUuid === cycle.uuid)

      rolesGrouped = Object.groupBy(roles, (role) => {
        userCountryISOs.push(role.countryIso)
        return role.role
      })
    }

    // 2. add no roles group (with remaining countries) to groups if cycle is published
    if (!user || Cycles.isPublished(cycle)) {
      rolesGrouped[UserRoles.noRole.role] = countryISOs.reduce<Array<UserRole>>((acc, countryIso) => {
        if (!userCountryISOs.includes(countryIso) && !Areas.isAtlantis(countryIso)) {
          acc.push({ role: UserRoles.noRole.role, countryIso } as UserRole)
        }
        return acc
      }, [])
    }

    // 3. create the array of OptionsGroup
    return Object.entries(rolesGrouped).map<OptionsGroupArea>(([roleName, roles]) => {
      const roleOrderBy = orderBy[roleName]

      const options = roles
        .sort((r1, r2) => {
          if (roleOrderBy?.sortBy) {
            const a = countriesRecord[r1.countryIso][roleOrderBy.sortBy]
            const b = countriesRecord[r2.countryIso][roleOrderBy.sortBy]
            const direction = roleOrderBy.sortDirection === AreaSelectorSortDirection.asc ? 1 : -1
            return Dates.isAfter(a, b) ? direction : -direction
          }

          const area1 = countriesRecord[r1.countryIso]
          const area2 = countriesRecord[r2.countryIso]
          return Areas.getCompareListName(area1, area2, lang)
        })
        .map<OptionArea>((role) => {
          const { countryIso } = role
          const country = countriesRecord[countryIso]
          return { country, label: t(Areas.getTranslationKey(countryIso)), value: countryIso }
        })

      const group = { options, order, roleName: roleName as RoleName }
      order += 1
      return group
    })
  }, [countriesRecord, cycle, lang, orderBy, regionGroupsLength, t, user])
}
