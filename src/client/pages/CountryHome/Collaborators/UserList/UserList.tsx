import './UserList.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area/countryIso'
import { UserCountrySummaries } from 'meta/user/countrySummaries'
import { UserCountrySummary } from 'meta/user/countrySummary'

import { useCountryRouteParams } from 'client/hooks/routeParams'
import TablePaginated from 'client/components/TablePaginated'

import { useCanExport } from './hooks/useCanExport'
import { useColumns } from './hooks/useColumns'
import { useFilters } from './hooks/useFilters'
import { useUserCompareFn } from './hooks/useUserCompareFn'
import Invite from './Invite'

const counter = { show: false }
const header = false
const path = ApiEndPoint.User.many()

const UserList: React.FC = () => {
  const { t } = useTranslation()
  const { countryIso } = useCountryRouteParams<CountryIso>()
  const canExport = useCanExport()
  const columns = useColumns()
  const compareFn = useUserCompareFn()
  const filters = useFilters()

  return (
    <div className="country-home__user-list">
      <Invite />

      <TablePaginated
        columns={columns}
        compareFn={compareFn}
        counter={counter}
        export={canExport}
        filters={filters}
        groups={{
          headerLabel: (roleName) => t(`user.roles.${roleName.toString()}`, { count: 2 }),
          keySelector: (user: UserCountrySummary) => UserCountrySummaries.getRoleName(user, countryIso),
        }}
        header={header}
        limit={-1}
        path={path}
      />
    </div>
  )
}

export default UserList
