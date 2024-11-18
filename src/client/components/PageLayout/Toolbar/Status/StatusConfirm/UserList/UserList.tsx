import './UserList.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { CountryUserSummary, Users } from 'meta/user'

import { useCycle } from 'client/store/assessment'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { DataCell, DataGrid } from 'client/components/DataGrid'

interface Props {
  users: Array<CountryUserSummary>
}

interface CellProps {
  countryUserSummary: CountryUserSummary
}

const NameCell: React.FC<CellProps> = ({ countryUserSummary }) => <span>{countryUserSummary.fullName}</span>

const RoleCell: React.FC<CellProps> = ({ countryUserSummary }) => {
  const { t } = useTranslation()
  const { countryIso } = useCountryRouteParams()
  const cycle = useCycle()
  const role = Users.getRole(countryUserSummary, countryIso, cycle)
  const key = Users.getI18nRoleLabelKey(role.role)
  return <span>{t(key)}</span>
}

const EmailCell: React.FC<CellProps> = ({ countryUserSummary }) => <span>{countryUserSummary.email}</span>

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
      {users.map((countryUserSummary, j) => {
        const lastRow = users.length - 1 === j
        return headers.map((header) => {
          return (
            <DataCell key={`${countryUserSummary.email}-${header}`} lastRow={lastRow}>
              {React.createElement(Components[header], { countryUserSummary })}
            </DataCell>
          )
        })
      })}
    </DataGrid>
  )
}

export default UserList
