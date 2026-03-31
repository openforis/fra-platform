import { RepositoryItemTree } from 'meta/cycleData/repository/item'
import { Lang } from 'meta/lang'
import { Translations } from 'meta/translation/translations'

export type ItemsFn = (items: Array<RepositoryItemTree>) => Array<RepositoryItemTree>

// File and link names are under translations, fallback to English label
export const _getNameTranslation = (item: RepositoryItemTree, language: Lang): string => {
  if (!item.props?.translation) return ''
  const translation = Translations.getLabel({ translation: item.props.translation, language })
  const translationEn = Translations.getLabel({ translation: item.props.translation, language: Lang.en })
  return translation || translationEn
}
