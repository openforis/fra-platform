import { AreaCode } from 'meta/area/areaCode'
import { Translation } from 'meta/translation/translation'

export interface RepositoryItemProps {
  hidden?: boolean // File not visible in UI
  public?: boolean // File visible for non-logged in users
  translation?: Translation
}

export type RepositoryItem = {
  readonly id: number
  readonly uuid: string
  assessmentUuid?: string
  cycleUuid?: string
  countryIso?: AreaCode
  fileUuid?: string
  link?: string
  props?: RepositoryItemProps
}
