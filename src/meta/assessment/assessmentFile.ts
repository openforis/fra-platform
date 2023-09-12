import { CountryIso } from 'meta/area'

export interface AssessmentFile {
  id: number
  uuid: string
  countryIso?: CountryIso
  fileName: string
  file?: string
}
