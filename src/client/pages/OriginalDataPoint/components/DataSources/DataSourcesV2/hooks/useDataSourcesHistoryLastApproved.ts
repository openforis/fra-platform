import { useMemo } from 'react'

import { DataSource, DataSourceHistoryCompare } from 'meta/assessment/descriptionValue/dataSource'

import { useHistoryLastApprovedIsActive } from 'client/store/data/history/hooks/lastApproved'
import { useLastApprovedOriginalDataPoint } from 'client/store/data/history/hooks/lastApprovedOriginalDataPoint'
import { getDataSourceHistoryCompares } from 'client/components/DataSources/_getDataSourceHistoryCompares'

type Props = {
  dataSources: Array<DataSource>
}

type Returned = Array<DataSourceHistoryCompare> | undefined

export const useDataSourcesHistoryLastApproved = (props: Props): Returned => {
  const { dataSources } = props

  const historyLastApprovedIsActive = useHistoryLastApprovedIsActive()
  const lastApprovedODP = useLastApprovedOriginalDataPoint()

  return useMemo<Returned>(() => {
    if (!historyLastApprovedIsActive) return undefined

    const dataSourcesHistory = lastApprovedODP?.dataSources ?? []
    const dataSourcesWithoutPlaceholder = dataSources.filter((ds) => !ds.placeholder)

    return getDataSourceHistoryCompares({ dataSources: dataSourcesWithoutPlaceholder, dataSourcesHistory })
  }, [dataSources, historyLastApprovedIsActive, lastApprovedODP])
}
