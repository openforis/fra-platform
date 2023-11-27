import { CountryIso } from 'meta/area'

export interface FileUsage {
  key: string
  suffixes?: Array<string>
}

export interface AssessmentFileProps {
  hidden?: boolean // File not visible in UI
  public?: boolean // File visible for non-logged in users
}

export interface AssessmentFile {
  readonly id: number
  readonly uuid: string
  countryIso?: CountryIso
  fileName: string
  file?: string
  props: AssessmentFileProps
}
