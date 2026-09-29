import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { AnalyticsElementSummary } from 'meta/analytics/analyticsEvent'

import { Column } from 'client/components/TablePaginated'

type Returned = Array<Column<AnalyticsElementSummary>>

export const useColumns = (): Returned => {
  const { t } = useTranslation()

  return useMemo<Returned>(
    () => [
      {
        component: ({ datum }) => <span>{datum.elementId}</span>,
        header: t('common.element'),
        key: 'elementId',
        orderByProperty: 'elementId',
      },
      {
        component: ({ datum }) => <span>{datum.clickCount}</span>,
        header: t('common.clickCount'),
        key: 'clickCount',
        orderByProperty: 'clickCount',
      },
      {
        component: ({ datum }) => <span>{datum.avgDurationMs}ms</span>,
        header: t('common.averageDuration'),
        key: 'avgDurationMs',
        orderByProperty: 'avgDurationMs',
      },
    ],
    [t]
  )
}
