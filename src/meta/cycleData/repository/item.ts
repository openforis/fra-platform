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
  countryIso?: AreaCode
  createdAt?: string
  description?: string
  used?: boolean
  fileUuid?: string
  folderName?: string
  link?: string
  parentUuid?: string
  props?: RepositoryItemProps
}

export type RepositoryItemTree = RepositoryItem & { children: Array<RepositoryItemTree> }
