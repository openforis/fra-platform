import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area'
import { Cycle } from 'meta/assessment/cycle'
import { UserFilters } from 'meta/tablePaginated'
import { CountryUserSummary, RoleName, User, Users } from 'meta/user'
import { UserRoles } from 'meta/user/userRoles'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { useUser } from 'client/store/user/hooks/user'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { StatusTransition } from 'client/components/PageLayout/Toolbar/Status/types'
import TablePaginated, { Column } from 'client/components/TablePaginated'

// ======== TODO: Remove self from the list
// ======== TODO: Clean up and separate files

const approvalRolesOrder: Partial<Record<RoleName, number>> = {
  [RoleName.ADMINISTRATOR]: 0,
  [RoleName.REVIEWER]: 1,
  [RoleName.NATIONAL_CORRESPONDENT]: 2,
  [RoleName.ALTERNATE_NATIONAL_CORRESPONDENT]: 3,
  [RoleName.COLLABORATOR]: 4,
}

const getApprovalRoleOrder = (props: { user: User; countryIso: CountryIso; cycle: Cycle }): number => {
  const { countryIso, cycle, user } = props
  const role = Users.getRole(user, countryIso, cycle)?.role
  const rolesOrderLength = Object.keys(approvalRolesOrder).length
  if (role !== undefined) return approvalRolesOrder[role as RoleName] ?? rolesOrderLength

  return rolesOrderLength
}

const approvalStatusSort = (props: { userA: User; userB: User; countryIso: CountryIso; cycle: Cycle }): number => {
  const { userA, userB, ...rest } = props
  const roleOrderA = getApprovalRoleOrder({ user: userA, ...rest })
  const roleOrderB = getApprovalRoleOrder({ user: userB, ...rest })
  if (roleOrderA !== roleOrderB) return roleOrderA - roleOrderB

  return userA.props?.name?.localeCompare(userB.props?.name) || 0
}

const NameCell: React.FC<{ datum: CountryUserSummary }> = ({ datum }) => <span>{datum.fullName}</span>

const RoleCell: React.FC<{ datum: CountryUserSummary }> = ({ datum }) => {
  const { t } = useTranslation()
  const { countryIso } = useCountryRouteParams()
  const cycle = useCycle()
  const role = Users.getRole(datum, countryIso, cycle)
  const key = Users.getI18nRoleLabelKey(role.role)
  return <span>{t(key)}</span>
}

const EmailCell: React.FC<{ datum: CountryUserSummary }> = ({ datum }) => <span>{datum.email}</span>

type Props = {
  status: StatusTransition
}

const UserList: React.FC<Props> = (props) => {
  const { status } = props
  const { t } = useTranslation()
  const user = useUser()

  const columns = useMemo<Array<Column<CountryUserSummary>>>(
    () => [
      {
        header: t('common.name'),
        key: 'name',
        component: NameCell,
      },
      {
        header: t('common.role'),
        key: 'role',
        component: RoleCell,
      },
      {
        header: t('common.email'),
        key: 'email',
        component: EmailCell,
      },
    ],
    [t]
  )

  const cycle = useCycle()
  const { countryIso } = useCountryRouteParams<CountryIso>()
  const compareFn = (userA: User, userB: User) => {
    return approvalStatusSort({ userA, userB, countryIso, cycle })
  }

  const params: UserFilters = { roles: UserRoles.getRecipientRoles(status), excludeUuids: [user.uuid] }

  return (
    <TablePaginated
      className="status-confirm__user-list"
      columns={columns}
      compareFn={compareFn}
      counter={{ show: false }}
      params={params}
      path={ApiEndPoint.User.many()}
    />
  )
}

export default UserList
