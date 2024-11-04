import './UserList.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { User, Users } from 'meta/user'

import { useCycle } from 'client/store/assessment'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { DataCell, DataGrid } from 'client/components/DataGrid'

interface Props {
  users: Array<User>
}

interface CellProps {
  user: User
}

const NameCell: React.FC<CellProps> = ({ user }) => <span>{Users.getFullName(user)}</span>

const RoleCell: React.FC<CellProps> = ({ user }) => {
  const { t } = useTranslation()
  const { countryIso } = useCountryRouteParams()
  const cycle = useCycle()
  const role = Users.getRole(user, countryIso, cycle)
  const key = Users.getI18nRoleLabelKey(role.role)
  return <span>{t(key)}</span>
}

const EmailCell: React.FC<CellProps> = ({ user }) => <span>{user.email}</span>

const Components: Record<string, React.FC<CellProps>> = {
  name: NameCell,
  role: RoleCell,
  email: EmailCell,
}

const UserList: React.FC<Props> = (props: Props) => {
  const { users } = props
  const { t } = useTranslation()
  const headers = Object.keys(Components)
  const gridTemplateColumns = `repeat(${headers.length}, 1fr)`

  return (
    <DataGrid className="status-confirm__user-list" gridTemplateColumns={gridTemplateColumns}>
      {headers.map((header) => {
        return (
          <DataCell key={header} header>
            {t(`common.${header}`)}
          </DataCell>
        )
      })}
      {users.map((user, j) => {
        const lastRow = users.length - 1 === j
        return headers.map((header) => {
          return (
            <DataCell key={`${user.email}-${header}`} lastRow={lastRow}>
              {React.createElement(Components[header], { user })}
            </DataCell>
          )
        })
      })}
    </DataGrid>
  )
}

export default UserList
