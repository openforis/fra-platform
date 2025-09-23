import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Link as LinkType } from 'meta/cycleData'

import { Column } from 'client/components/TablePaginated'
import LastStatus from 'client/pages/AdminLinks/LastStatus'
import LinkItem from 'client/pages/AdminLinks/Link'
import Locations from 'client/pages/AdminLinks/Locations'

export const useColumns = (): Array<Column<LinkType>> => {
  const { t } = useTranslation()

  return useMemo<Array<Column<LinkType>>>(() => {
    return [
      {
        component: ({ datum }) => <LinkItem link={datum} />,
        header: t('common.link'),
        key: 'link',
        orderByProperty: 'link',
      },
      {
        component: ({ datum }) => <LastStatus link={datum} />,
        header: t('admin.lastStatus'),
        key: 'lastStatus',
        orderByProperty: 'code',
      },
      {
        component: ({ datum }) => <Locations link={datum} />,
        header: t('admin.locationsCount'),
        key: 'locationsCount',
      },
    ]
  }, [t])
}
