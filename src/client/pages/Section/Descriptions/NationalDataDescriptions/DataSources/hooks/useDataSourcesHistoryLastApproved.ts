import { useMemo } from 'react'

import { CommentableDescriptionName, DataSource } from 'meta/assessment'

import { useHistoryLastApprovedIsActive, useLastApprovedHistoryDescriptions } from 'client/store/data'

import { DataSourceHistoryCompare } from '../types'
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
