import { useMemo } from 'react'

import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { DataSource, DataSourceHistoryCompare } from 'meta/assessment/descriptionValue/dataSource'

import { useHistoryLastApprovedIsActive } from 'client/store/data/history/hooks/lastApproved'
import { useLastApprovedHistoryDescriptions } from 'client/store/data/history/hooks/lastApprovedDescriptions'

import { getDataSourceHistoryCompares } from './_getDataSourceHistoryCompares'

type Props = {
  dataSources: Array<DataSource>
}

type Returned = Array<DataSourceHistoryCompare> | undefined

export const useDataSourcesHistoryLastApproved = (props: Props): Returned => {
  const { dataSources } = props

  const lastApprovedHistoryDescriptions = useLastApprovedHistoryDescriptions()
  const historyLastApprovedIsActive = useHistoryLastApprovedIsActive()

  return useMemo<Returned>(() => {
    if (!historyLastApprovedIsActive) return undefined

    const dataSourcesHistory =
      lastApprovedHistoryDescriptions?.[CommentableDescriptionName.dataSources]?.dataSources ?? []

    return getDataSourceHistoryCompares({ dataSources, dataSourcesHistory })
  }, [dataSources, historyLastApprovedIsActive, lastApprovedHistoryDescriptions])
}
