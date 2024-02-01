import { AreaCode } from 'meta/area'

export interface RepositoryItemProps {
  hidden?: boolean // File not visible in UI
  public?: boolean // File visible for non-logged in users
}

export type RepositoryItem = {
  readonly id: number
  readonly uuid: string

  countryIso?: AreaCode
  fileUuid?: string
  link?: string
  name: string
  props?: RepositoryItemProps
}