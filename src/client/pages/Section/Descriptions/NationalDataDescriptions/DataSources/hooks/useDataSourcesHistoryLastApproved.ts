import { useMemo } from 'react'

import { CommentableDescriptionName, DataSource } from 'meta/assessment'

import { useHistoryLastApprovedIsActive, useLastApprovedHistoryDescriptions } from 'client/store/data'
import { DataSourceHistoryCompare } from 'client/pages/Section/Descriptions/NationalDataDescriptions/DataSources/types'

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

    const items: Returned = []

    const dataLength = dataSources.length
    const historyLength = dataSourcesHistory.length

    let dataIndex = 0
    let historyIndex = 0
    for (let i = 0; i < Math.max(dataLength, historyLength); i += 1) {
      const dataItem = dataSources[dataIndex]
      // TODO: Handle non-empty history items by matching dataSources
      const historyItem = dataSourcesHistory[historyIndex]

      dataIndex += 1
      historyIndex += 1
      items.push({ dataItem, historyItem })
    }

    return items
  }, [dataSources, historyLastApprovedIsActive, lastApprovedHistoryDescriptions])
}
