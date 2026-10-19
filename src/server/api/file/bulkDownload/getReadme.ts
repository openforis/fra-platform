import type { CycleName } from 'meta/assessment/cycle'
import { CycleNames } from 'meta/assessment/cycle/names'
import { Lang } from 'meta/lang'

import { getReadmeAr } from './templates/ar'
import { getReadmeEn } from './templates/en'
import { getReadmeEs } from './templates/es'
import { getReadmeFr } from './templates/fr'
import { getReadmeRu } from './templates/ru'
import { getReadmeZh } from './templates/zh'
import type { GetReadmeTemplate } from './types'

type Props = {
  cycleName: CycleName
  lang: Lang
}

const readmeTemplatesByLanguage: Record<Lang, GetReadmeTemplate> = {
  [Lang.ar]: getReadmeAr,
  [Lang.en]: getReadmeEn,
  [Lang.es]: getReadmeEs,
  [Lang.fr]: getReadmeFr,
  [Lang.ru]: getReadmeRu,
  [Lang.zh]: getReadmeZh,
}

export const getReadme = (props: Props): string => {
  const { cycleName, lang } = props
  const readmeCycleName = cycleName === CycleNames._2020 ? CycleNames._2020 : CycleNames._2025
  const getReadmeForLanguage = readmeTemplatesByLanguage[lang]

  return getReadmeForLanguage({ cycleName: readmeCycleName })
}
