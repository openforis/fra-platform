import { Lang } from 'meta/lang'
import { Translation } from 'meta/translation/translation'

const getLabel = (props: { translation: Translation; language: Lang }): string => {
  const { language, translation } = props
  return translation[language] ?? translation[Lang.en]
}

export const Translations = {
  getLabel,
}
