import { Request } from 'express'
import { createI18nPromise } from 'i18n/i18nFactory'

import { AssessmentName, CycleName } from 'meta/assessment'
import { Lang } from 'meta/lang'

type FileErrorParams = {
  assessmentName: AssessmentName
  cycleName: CycleName
  req: Request
  fileSections: Array<{ key: string; suffixes?: Array<string> }>
}

export const fileError = async (props: FileErrorParams): Promise<string> => {
  const { assessmentName, cycleName, req, fileSections } = props
  const lang = req.headers.locale || Lang.en
  const i18n = await createI18nPromise(lang)

  const sectionNames = fileSections.reduce<string>((acc: string, item) => {
    const { key, suffixes } = item

    const suffixesStr = suffixes.map((suffix: string) => i18n.t(suffix, { assessmentName, cycleName })).join(', ')
    return `${acc}• ${i18n.t(key)} (${suffixesStr})\n`
  }, '')

  return i18n.t('landing.links.fileOperationFailed', { sectionNames })
}
