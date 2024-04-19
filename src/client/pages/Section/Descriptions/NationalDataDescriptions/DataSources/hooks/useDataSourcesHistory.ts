import { useMemo } from 'react'

import { CommentableDescription, CommentableDescriptionName, DataSource } from 'meta/assessment'

import { useHistoryCompareItem } from 'client/store/data'

export type DataSourceHistoryCompare = {
  dataItem?: DataSource
  historyItem?: DataSource
}
type ActivityLogTarget = { description: CommentableDescription }

type Props = {
  dataSources: Array<DataSource>
}
type Returned = Array<DataSourceHistoryCompare> | undefined

export const useDataSourcesHistory = (props: Props): Returned => {
  const { dataSources } = props

  const compareItem = useHistoryCompareItem<ActivityLogTarget>(CommentableDescriptionName.dataSources)

  return useMemo<Returned>(() => {
    if (!compareItem) return undefined

    const items: Returned = []
    const dataSourcesHistory = compareItem.target?.description?.value?.dataSources ?? []

    const dataLength = dataSources.length
    const historyLength = dataSourcesHistory.length

    let dataIndex = 0
    let historyIndex = 0
    for (let i = 0; i < Math.max(dataLength, historyLength); i += 1) {
      let dataItem: DataSource
      let historyItem: DataSource

      const data = dataSources[dataIndex]
      const history = dataSourcesHistory[historyIndex]
      if (data?.uuid === history?.uuid) {
        dataItem = data
        dataIndex += 1
        historyItem = history
        historyIndex += 1
      } else {
        const onlyData = Boolean(data?.uuid) && !dataSourcesHistory.some((d) => d.uuid === data.uuid)

        if (onlyData) {
          dataItem = data
          dataIndex += 1
        } else {
          historyItem = history
          historyIndex += 1
        }
      }

      items.push({ dataItem, historyItem })
    }

    return items
  }, [compareItem, dataSources])
}
