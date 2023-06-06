import { CountryIso } from 'meta/area'

type VariableName = string
type Year = string
type ValueLegacy = string
type ValueLocal = string

// Read csv to RawFile
export type RawFileRow = Record<string, string> & { iso3: CountryIso; year: Year; variable: VariableName }
export type RawFile = Array<RawFileRow>

export type Value = Record<CountryIso, Record<Year, Record<string, string>>>

export type ValueDiff = {
  fileName: string
  countryIso: CountryIso
  variableName: VariableName
  year: Year
  valueLegacy: ValueLegacy
  valueLocal: ValueLocal
}
