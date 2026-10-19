import { useMemo } from 'react'

import { CommentableDescription, CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { DataSource, DataSourceHistoryCompare } from 'meta/assessment/descriptionValue/dataSource'
import { DataSources } from 'meta/assessment/descriptionValue/dataSources'

import { useHistoryActivitiesCompareItem } from 'client/store/data/history/hooks/activities'

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

    return DataSources.getHistoryCompares({ dataSources, dataSourcesHistory })
  }, [compareItem, dataSources])
}
