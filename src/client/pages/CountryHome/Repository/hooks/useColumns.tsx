import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Repository as RepositoryType } from 'meta/cycleData'

import { Column } from 'client/components/TablePaginated'
import Actions from 'client/pages/CountryHome/Repository/Actions'
import RepositoryLink from 'client/pages/CountryHome/Repository/RepositoryLink'

export const useColumns = (): Array<Column<RepositoryType>> => {
  const { t } = useTranslation()

  return useMemo<Array<Column<RepositoryType>>>(() => {
    return [
      {
        component: ({ datum }) => <RepositoryLink datum={datum} />,
        header: t('common.link'),
        key: 'link',
      },
      {
        component: () => <Actions />,
        header: t('common.name'),
        key: 'name',
      },
    ]
  }, [t])
}
