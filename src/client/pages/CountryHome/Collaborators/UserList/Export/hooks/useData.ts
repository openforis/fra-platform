import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { TFunction } from 'i18next'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area'
import { Cycle } from 'meta/assessment'
import { User, UserInvitationSummary, Users } from 'meta/user'

import { useCycle } from 'client/store/assessment'
import { useTablePaginatedData } from 'client/store/ui/tablePaginated'
import { useUsers } from 'client/store/ui/userManagement'
import { useCountryIso } from 'client/hooks'

const userToCsv = (t: TFunction, countryIso: CountryIso, cycle: Cycle) => (user: User) => ({
  name: Users.getFullName(user),
  role: t(Users.getI18nRoleLabelKey(Users.getRole(user, countryIso, cycle)?.role)),
  email: user.email,
})

const invitationToCsv = (t: TFunction) => (invitation: UserInvitationSummary) => ({
  name: invitation.name,
  role: `${t(Users.getI18nRoleLabelKey(invitation?.role))} - ${t('admin.invitationPending')}`,
  email: invitation.email,
})

export const useData = () => {
  const { t } = useTranslation()
  const users = useUsers() // TODO: useTablePaginatedData(ApiEndPoint.User.many())
  const invitations = useTablePaginatedData(ApiEndPoint.User.invitations())
  const cycle = useCycle()
  const countryIso = useCountryIso()

  return useMemo(() => {
    const transformUser = userToCsv(t, countryIso, cycle)
    const transformInvitation = invitationToCsv(t)

    const activeUsers = users?.map(transformUser) ?? []
    const pendingInvitations = invitations?.map(transformInvitation) ?? []

    return [...activeUsers, ...pendingInvitations]
  }, [countryIso, cycle, invitations, t, users])
}
