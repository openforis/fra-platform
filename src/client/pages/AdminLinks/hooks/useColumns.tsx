import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Link as LinkType } from 'meta/cycleData'

import { Column } from 'client/components/TablePaginated'
import LastStatus from 'client/pages/AdminLinks/LastStatus'
import LinkItem from 'client/pages/AdminLinks/Link'

const LocationsCount: React.FC<{ link: LinkType }> = (props) => {
  const { link } = props
  const { locations } = link

  return <span>{locations?.length}</span>
}

const VisitCount: React.FC<{ link: LinkType }> = (props) => {
  const { link } = props
  const { visits } = link

  return <span>{visits?.length}</span>
}

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
        component: ({ datum }) => <LocationsCount link={datum} />,
        header: t('admin.locationsCount'),
        key: 'locationsCount',
      },
      {
        component: ({ datum }) => <VisitCount link={datum} />,
        header: t('admin.visitsCount'),
        key: 'visitsCount',
      },
    ]
  }, [t])
}
