import React from 'react'

import { DataSourceDescription } from 'meta/assessment/description'

import { useHistoryLastApprovedDescriptionFetched } from 'client/store/data/history/hooks/lastApprovedDescriptions'
import DataSources from 'client/components/DataSources'
import { useSectionContext } from 'client/pages/Section/context'

import { useDataSourcesData } from './hooks/useDataSourcesData'
import { useDataSourcesHistoryActivities } from './hooks/useDataSourcesHistoryActivities'
import { useDataSourcesHistoryLastApproved } from './hooks/useDataSourcesHistoryLastApproved'
import { useGetDataSourcesLinked } from './hooks/useGetDataSourcesLinked'

type Props = {
  meta: DataSourceDescription
}

const NationalDataSources: React.FC<Props> = (props) => {
  const { meta } = props

  const { sectionName } = useSectionContext()
  const data = useDataSourcesData({ sectionName })
  const { dataSourcesLinked } = useGetDataSourcesLinked({ meta, sectionName })

  const { dataSources } = data
  const historyLastApprovedCompares = useDataSourcesHistoryLastApproved({ dataSources })
  const historyLastApprovedDescriptionFetched = useHistoryLastApprovedDescriptionFetched()

  const historyActivityCompares = useDataSourcesHistoryActivities({ dataSources })
  const historyCompares = historyLastApprovedCompares ?? historyActivityCompares

  const displayHistory = Boolean(
    (historyLastApprovedCompares && historyLastApprovedDescriptionFetched) ?? historyActivityCompares
  )

  return (
    <DataSources
      data={data}
      dataSourcesLinked={dataSourcesLinked}
      historyCompares={historyCompares}
      meta={meta}
      options={{ canCopy: true, canToggleEdit: true, canToggleHistory: true, displayHistory }}
      sectionName={sectionName}
    />
  )
}

export default NationalDataSources
