import { AreaCode } from 'meta/area'
import { Lang } from 'meta/lang'

export type Translations = {
  [Lang.en]: string
} & {
  [lang in Exclude<Lang, Lang.en>]?: string
}

export interface RepositoryItemProps {
  hidden?: boolean // File not visible in UI
  public?: boolean // File visible for non-logged in users

  translations?: Translations
}

export type RepositoryItem = {
  readonly id: number
  readonly uuid: string

  countryIso?: AreaCode
  fileUuid?: string
  link?: string
  props?: RepositoryItemProps
}
