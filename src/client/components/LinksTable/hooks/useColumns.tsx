import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area/countryIso'
import { Link as LinkType } from 'meta/cycleData/links/link'
import { Objects } from 'utils/objects'

import LastStatus from 'client/components/LinksTable/LastStatus'
import LinkItem from 'client/components/LinksTable/Link'
import Locations from 'client/components/LinksTable/Locations'
import { Column } from 'client/components/TablePaginated'

type Props = {
  countryIso?: CountryIso
}

export const useColumns = (props: Props): Array<Column<LinkType>> => {
  const { countryIso } = props
  const { t } = useTranslation()

  return useMemo<Array<Column<LinkType>>>(() => {
    return [
      {
        component: ({ datum }) => <LinkItem countryIso={countryIso} link={datum} />,
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
        component: ({ datum }) => <Locations includeCountryIso={Objects.isEmpty(countryIso)} link={datum} />,
        header: t('admin.locationsCount'),
        key: 'locationsCount',
      },
    ]
  }, [countryIso, t])
}
