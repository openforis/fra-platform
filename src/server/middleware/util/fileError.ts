import { Request } from 'express'
import { createI18nPromise } from 'i18n/i18nFactory'

import { AssessmentName, CycleName } from 'meta/assessment'
import { FileUsage } from 'meta/cycleData'

import { Requests } from 'server/utils'

type FileErrorParams = {
  assessmentName: AssessmentName
  cycleName: CycleName
  req: Request
  fileUsages: Array<FileUsage>
}

export const fileError = async (props: FileErrorParams): Promise<string> => {
  const { assessmentName, cycleName, req, fileUsages } = props
  const lang = Requests.getContentLanguage(req)
  const i18n = await createI18nPromise(lang)

  const sectionNames = fileUsages.reduce<string>((acc: string, item) => {
    const { key, suffixes } = item

    const suffixesStr = suffixes.map((suffix: string) => i18n.t(suffix, { assessmentName, cycleName })).join(', ')
    return `${acc}• ${i18n.t(key)} (${suffixesStr})\n`
  }, '')

  return i18n.t('landing.links.fileOperationFailed', { sectionNames })
}
