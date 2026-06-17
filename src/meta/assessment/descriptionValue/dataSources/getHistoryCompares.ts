import { DataSource, DataSourceHistoryCompare } from 'meta/assessment/descriptionValue/dataSource'
import { UUID } from 'meta/uuid/uuid'
import { Arrays } from 'utils/arrays'

type Props = {
  dataSources: Array<DataSource>
  dataSourcesHistory: Array<DataSource>
}

type RecordDataSources = Record<UUID, DataSource>

const _getRecordDataSources = (dataSources: Array<DataSource>): RecordDataSources =>
  dataSources.reduce<RecordDataSources>((acc, dataSource) => ({ ...acc, [dataSource.uuid]: dataSource }), {})

export const getHistoryCompares = (props: Props): Array<DataSourceHistoryCompare> => {
  const { dataSources, dataSourcesHistory } = props

  const recordDataSources = _getRecordDataSources(dataSources)
  const recordDataSourcesHistory = _getRecordDataSources(dataSourcesHistory)

  const uuids = Arrays.union(Object.keys(recordDataSources), Object.keys(recordDataSourcesHistory))

  return uuids.map<DataSourceHistoryCompare>((uuid) => {
    const dataItem = recordDataSources[uuid]
    const historyItem = recordDataSourcesHistory[uuid]

    return { dataItem, historyItem }
  })
}
