import './Users.scss'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area'
import { CountryUserSummary, Users } from 'meta/user'
import { CountryUserSummaries } from 'meta/user/countryUserSummaries'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import TablePaginated, { Column } from 'client/components/TablePaginated'

import { GRID_TEMPLATE_COLUMNS } from '../getGridTemplateColumns'
import Actions from './Actions'
import Info from './Info'

const useColumns = (): Array<Column<CountryUserSummary>> => {
  const { countryIso } = useCountryRouteParams<CountryIso>()
  const { t } = useTranslation()

  return useMemo<Array<Column<CountryUserSummary>>>(
    () => [
      {
        header: '',
        key: 'info',
        component: ({ datum }) => {
          return <Info countryUserSummary={datum} />
        },
      },
      {
        component: ({ datum }) => {
          const { role, invitation } = CountryUserSummaries.getCountryRoleAndInvitation(datum, countryIso)
          const label = datum.fullName
          const _classNames = { invitation: Boolean(!role && invitation) }

          return <span className={classNames(_classNames)}>{label}</span>
        },
        header: t('common.name'),
        key: 'name',
      },
      {
        component: ({ datum }) => {
          const { role, invitation } = CountryUserSummaries.getCountryRoleAndInvitation(datum, countryIso)
          const _role = role?.role ?? invitation?.role
          const label = t(Users.getI18nRoleLabelKey(_role))
          const _classNames = { invitation: Boolean(!role && invitation) }

          return <span className={classNames(_classNames)}>{label}</span>
        },
        header: t('common.role'),
        key: 'role',
      },
      {
        component: ({ datum }) => {
          const { role, invitation } = CountryUserSummaries.getCountryRoleAndInvitation(datum, countryIso)
          const label = datum.email
          const _classNames = { invitation: Boolean(!role && invitation) }

          return <span className={classNames(_classNames)}>{label}</span>
        },
        header: t('common.email'),
        key: 'email',
      },
      {
        header: '',
        key: 'actions',
        component: ({ datum }) => <Actions countryUserSummary={datum} />,
      },
    ],
    [countryIso, t]
  )
}

const UserComponent: React.FC = () => {
  const columns = useColumns()

  const counter = { show: false }
  const path = ApiEndPoint.User.many()

  return (
    <div className="users">
      <TablePaginated columns={columns} counter={counter} gridTemplateColumns={GRID_TEMPLATE_COLUMNS} path={path} />
    </div>
  )
}

export default UserComponent
