import { CountryIso } from 'meta/area'

export interface AssessmentFile {
  readonly id: number
  readonly uuid: string
  countryIso?: CountryIso
  fileName: string
  file?: string
}
