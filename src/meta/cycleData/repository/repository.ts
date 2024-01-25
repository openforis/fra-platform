import { AreaCode } from 'meta/area'

export interface RepositoryProps {
  hidden?: boolean // File not visible in UI
  public?: boolean // File visible for non-logged in users
}

export type Repository = {
  readonly id: number
  readonly uuid: string

  countryIso?: AreaCode
  file?: string
  fileUuid?: string
  link?: string
  name: string
  props?: RepositoryProps
}
