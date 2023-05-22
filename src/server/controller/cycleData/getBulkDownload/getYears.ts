import { Country } from '@meta/area'
import { RecordCountryData, TableData } from '@meta/data'

export const getYears = (props: {
  countries: Country[]
  tableNames: string[]
  data: TableData | RecordCountryData
}) => {
  const { tableNames, data, countries } = props
  return new Array(
    ...new Set(
      countries.flatMap((country) =>
        tableNames.flatMap((tableName) => Object.keys(data[country.countryIso]?.[tableName] ?? {}))
      )
    )
  )
}
