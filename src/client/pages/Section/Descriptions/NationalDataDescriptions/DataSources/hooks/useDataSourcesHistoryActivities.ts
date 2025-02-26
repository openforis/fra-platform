import { useMemo } from 'react'

import { CommentableDescription, CommentableDescriptionName, DataSource } from 'meta/assessment'

import { useHistoryActivitiesCompareItem } from 'client/store/data'

import { DataSourceHistoryCompare } from '../types'
import { getDataSourceHistoryCompares } from './_getDataSourceHistoryCompares'

type ActivityLogTarget = { description: CommentableDescription }

type Props = {
  dataSources: Array<DataSource>
}

type Returned = Array<DataSourceHistoryCompare> | undefined

export const useDataSourcesHistoryActivities = (props: Props): Returned => {
  const { dataSources } = props

  const compareItem = useHistoryActivitiesCompareItem<ActivityLogTarget>(CommentableDescriptionName.dataSources)

  return useMemo<Returned>(() => {
    if (!compareItem) return undefined

    const dataSourcesHistory = compareItem.target?.description?.value?.dataSources ?? []

    return getDataSourceHistoryCompares({ dataSources, dataSourcesHistory })
  }, [compareItem, dataSources])
}
