import { Country } from '@meta/area'
import { RecordCountryData } from '@meta/data'

export const getYears = (props: { countries: Country[]; tableNames: string[]; data: RecordCountryData }) => {
  const { tableNames, data, countries } = props
  return new Array(
    ...new Set(
      countries.flatMap((country) =>
        tableNames.flatMap((tableName) => Object.keys(data[country.countryIso]?.[tableName] ?? {}))
      )
    )
  )
}
