import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { CountryUserSummary, Users } from 'meta/user'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { Column } from 'client/components/TablePaginated'

const RoleCell: React.FC<{ datum: CountryUserSummary }> = ({ datum }) => {
  const { t } = useTranslation()
  const { countryIso } = useCountryRouteParams()
  const cycle = useCycle()
  const role = Users.getRole(datum, countryIso, cycle)
  const key = Users.getI18nRoleLabelKey(role.role)
  return <span>{t(key)}</span>
}

export const useColumns = (): Array<Column<CountryUserSummary>> => {
  const { t } = useTranslation()

  return useMemo<Array<Column<CountryUserSummary>>>(
    () => [
      {
        header: t('common.name'),
        key: 'name',
        component: ({ datum }) => <span>{datum.fullName}</span>,
      },
      {
        header: t('common.role'),
        key: 'role',
        component: RoleCell,
      },
      {
        header: t('common.email'),
        key: 'email',
        component: ({ datum }) => <span>{datum.email}</span>,
      },
    ],
    [t]
  )
}
