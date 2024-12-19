import './UserList.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area'
import { CountryUserSummary } from 'meta/user'
import { CountryUserSummaries } from 'meta/user/countryUserSummaries'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import TablePaginated from 'client/components/TablePaginated'

import { useColumns } from './hooks/useColumns'
import { useUserCompareFn } from './hooks/useUserCompareFn'
import Invite from './Invite'

const counter = { show: false }
const header = false
const path = ApiEndPoint.User.many()

const UserList: React.FC = () => {
  const { t } = useTranslation()
  const { countryIso } = useCountryRouteParams<CountryIso>()
  const columns = useColumns()
  const compareFn = useUserCompareFn()

  return (
    <div className="country-home__user-list">
      <Invite />

      <TablePaginated
        columns={columns}
        compareFn={compareFn}
        counter={counter}
        groups={{
          headerLabel: (roleName) => t(`user.roles.${roleName.toString()}`, { count: 2 }),
          keySelector: (user: CountryUserSummary) => CountryUserSummaries.getRoleName(user, countryIso),
        }}
        header={header}
        path={path}
      />
    </div>
  )
}

export default UserList
