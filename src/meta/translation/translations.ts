import { Lang } from 'meta/lang'
import { Translation } from 'meta/translation'

const getLabel = (props: { translation: Translation; language: Lang }) => {
  const { translation, language } = props
  return translation[language] ?? translation[Lang.en]
}

export const Translations = {
  getLabel,
}
