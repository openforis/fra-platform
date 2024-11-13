import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { CountryUserSummary, RoleName, Users } from 'meta/user'

import { Column } from 'client/components/TablePaginated'

import NameField from '../NameField'
import RoleField from '../RoleField'

type Returned = Array<Column<CountryUserSummary>>

export const useColumns = (): Returned => {
  const { t } = useTranslation()

  return useMemo<Returned>(() => {
    const roleColumns: Returned = Object.values(RoleName).map((roleName) => ({
      component: ({ datum }) => <RoleField roleName={roleName} userSummary={datum} />,
      header: t(Users.getI18nRoleLabelKey(roleName)),
      key: roleName,
    }))

    return [
      {
        component: ({ datum }) => <NameField userSummary={datum} />,
        header: t('common.name'),
        key: 'full_name',
        orderByProperty: 'full_name',
      },
      ...roleColumns,
    ]
  }, [t])
}
