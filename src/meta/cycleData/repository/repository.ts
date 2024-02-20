import { AreaCode } from 'meta/area'
import { Translation } from 'meta/translation'

export interface RepositoryItemProps {
  hidden?: boolean // File not visible in UI
  public?: boolean // File visible for non-logged in users

  translation?: Translation
}

export type RepositoryItem = {
  readonly id: number
  readonly uuid: string

  countryIso?: AreaCode
  fileUuid?: string
  link?: string
  props?: RepositoryItemProps
}
