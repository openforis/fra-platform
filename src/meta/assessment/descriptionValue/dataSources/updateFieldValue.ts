import { DataSource } from 'meta/assessment/descriptionValue/dataSource'

type Props = {
  dataSource: DataSource
  dataSources: Array<DataSource>
  fieldName: keyof DataSource
  fieldValue: string | Array<string>
}

export const updateFieldValue = (props: Props): Array<DataSource> => {
  const { dataSource, dataSources, fieldName, fieldValue } = props

  const dataSourceUpdate: DataSource = { ...dataSource, [fieldName]: fieldValue }
  delete dataSourceUpdate.placeholder

  const dataSourcesUpdate = [...dataSources]
  const index = dataSourcesUpdate.findIndex((_dataSource) => _dataSource.uuid === dataSourceUpdate.uuid)

  if (index >= 0) {
    dataSourcesUpdate[index] = dataSourceUpdate
  } else {
    dataSourcesUpdate.push(dataSourceUpdate)
  }

  return dataSourcesUpdate
}
