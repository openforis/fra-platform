import { useMemo } from 'react'

import { DataSource, DataSourceHistoryCompare } from 'meta/assessment/descriptionValue/dataSource'
import { DataSources } from 'meta/assessment/descriptionValue/dataSources'

import { useHistoryLastApprovedIsActive } from 'client/store/data/history/hooks/lastApproved'
import { useLastApprovedOriginalDataPoint } from 'client/store/data/history/hooks/lastApprovedOriginalDataPoint'

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

    return DataSources.getHistoryCompares({ dataSources, dataSourcesHistory })
  }, [dataSources, historyLastApprovedIsActive, lastApprovedODP])
}
