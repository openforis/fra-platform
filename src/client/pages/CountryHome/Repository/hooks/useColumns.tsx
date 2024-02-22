import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { RepositoryItem } from 'meta/cycleData'

import { Column } from 'client/components/TablePaginated'
import Actions from 'client/pages/CountryHome/Repository/Actions'
import Item from 'client/pages/CountryHome/Repository/Item'

export const useColumns = (): Array<Column<RepositoryItem>> => {
  const { t } = useTranslation()

  return useMemo<Array<Column<RepositoryItem>>>(() => {
    return [
      {
        component: ({ datum }) => <Item repositoryItem={datum} />,
        header: t('common.link'),
        key: 'link',
      },
      {
        component: ({ datum }) => <Actions repositoryItem={datum} />,
        header: t('common.name'),
        key: 'name',
      },
    ]
  }, [t])
}
