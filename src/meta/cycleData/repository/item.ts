import { AreaCode } from 'meta/area/areaCode'
import { FileUsage } from 'meta/file/meta'
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
  parentUuid?: string
  props?: RepositoryItemProps
  usages?: Array<FileUsage>
}

export type RepositoryItemTree = RepositoryItem & { children: Array<RepositoryItemTree> }
