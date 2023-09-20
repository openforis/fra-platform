import { Country } from 'meta/area'
import { ColName, TableName, TableNames } from 'meta/assessment'

type Props = {
  country: Country
  tableName: TableName
  colName: ColName
  odpYears: Array<string>
}

export const isODPCell = (props: Props): boolean => {
  const { country, colName, tableName, odpYears } = props

  if (![TableNames.forestCharacteristics, TableNames.extentOfForest].includes(tableName as TableNames)) {
    return false
  }

  const useOriginalDataPoint =
    tableName === TableNames.extentOfForest || country.props.forestCharacteristics.useOriginalDataPoint

  return useOriginalDataPoint && odpYears.includes(colName)
}
