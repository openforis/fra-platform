import { Lang } from 'meta/lang'

export type Translation = {
  [lang in Lang]?: string
}
