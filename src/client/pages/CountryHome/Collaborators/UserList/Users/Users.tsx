import './Users.scss'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from 'meta/api/endpoint'
import { User, Users } from 'meta/user'

import { useCycle } from 'client/store/assessment'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import TablePaginated, { Column } from 'client/components/TablePaginated'

import { GRID_TEMPLATE_COLUMNS } from '../getGridTemplateColumns'
import Actions from './Actions'
import Info from './Info'

const useColumns = (): Array<Column<User>> => {
  const { countryIso } = useCountryRouteParams()
  const cycle = useCycle()
  const { t } = useTranslation()

  return useMemo<Array<Column<User>>>(
    () => [
      {
        header: '',
        key: 'info',
        component: ({ datum }) => {
          return <Info countryUserSummary={datum} />
        },
      },
      {
        component: ({ datum }) => <span>{Users.getFullName(datum)}</span>,
        header: t('common.name'),
        key: 'name',
      },
      {
        component: ({ datum }) => {
          const { role } = Users.getRole(datum, countryIso, cycle)
          return <span>{t(Users.getI18nRoleLabelKey(role))}</span>
        },
        header: t('common.role'),
        key: 'role',
      },
      {
        component: ({ datum }) => <span>{datum.email}</span>,
        header: t('common.email'),
        key: 'email',
      },
      {
        header: '',
        key: 'actions',
        component: ({ datum }) => <Actions user={datum} />,
      },
    ],
    [countryIso, cycle, t]
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
