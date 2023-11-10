import { CountryIso } from 'meta/area'
import { CycleUuid } from 'meta/assessment/cycle'

export interface AssessmentFileProps {
  // Which cycles the file is visible for
  cycles?: Array<CycleUuid>
  // Don't return file when fetching normally, hidden from client
  private?: boolean
  // File visible for non-logged in users
  public?: boolean
}

export interface AssessmentFile {
  id: number
  uuid: string
  countryIso?: CountryIso
  fileName: string
  file?: string
  props: AssessmentFileProps
}
