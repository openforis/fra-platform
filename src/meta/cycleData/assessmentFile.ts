import { CountryIso } from 'meta/area'

export interface FileUsage {
  key: string
  suffixes?: Array<string>
}

/**
 * @deprecated
 */
export interface AssessmentFileProps {
  hidden?: boolean // File not visible in UI
  public?: boolean // File visible for non-logged in users
}
/**
 * @deprecated
 */
export interface AssessmentFile {
  readonly id: number
  readonly uuid: string
  countryIso?: CountryIso
  fileName: string
  file?: string
  props: AssessmentFileProps
}
