import { AreaCode } from 'meta/area'

export interface RepositoryProps {
  hidden?: boolean // File not visible in UI
  public?: boolean // File visible for non-logged in users
}

export type Repository = {
  readonly id: number
  readonly uuid: string
  countryIso?: AreaCode
  name: string
  props?: RepositoryProps
}

export type RepositoryFile = Repository & {
  readonly fileUuid: string
  // File is populated only when reading the file content
  file?: string
}

export type RepositoryLink = Repository & {
  readonly link: string
}

export type RepositoryEntity = RepositoryFile | RepositoryLink
