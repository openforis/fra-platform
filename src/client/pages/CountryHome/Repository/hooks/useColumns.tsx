import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { RepositoryItem } from 'meta/cycleData'

import { Column } from 'client/components/TablePaginated'
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
    ]
  }, [t])
}
