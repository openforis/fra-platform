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
  fileType?: string
  fileUuid?: string
  folderName?: string
  link?: string
  // Linked: Whether the item is used in the platform
  linked?: boolean
  parentUuid?: string
  props?: RepositoryItemProps
}

export type RepositoryItemTree = RepositoryItem & { children: Array<RepositoryItemTree> }
