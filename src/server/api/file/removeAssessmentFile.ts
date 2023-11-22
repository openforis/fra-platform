import { Response } from 'express'
import { createI18nPromise } from 'i18n/i18nFactory'

import { CycleRequest } from 'meta/api/request'
import { Lang } from 'meta/lang'

import { AssessmentController } from 'server/controller/assessment'
import { FileController } from 'server/controller/file'
import Requests from 'server/utils/requests'

export const removeAssessmentFile = async (req: CycleRequest, res: Response) => {
  try {
    const { uuid } = req.params

    const user = Requests.getUser(req)

    const { assessmentName, cycleName } = req.query

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    await FileController.removeAssessmentFile({ assessment, cycle, uuid, user })

    Requests.sendOk(res)
  } catch (error) {
    if (Array.isArray(error)) {
      const { assessmentName, cycleName } = req.query
      const lang = req.headers.locale || Lang.en
      const i18n = await createI18nPromise(lang)

      const sectionNames = error.reduce<string>((acc: string, item: { key: string; suffixes: string[] }) => {
        const { key, suffixes } = item

        const suffixesStr = suffixes.map((suffix: string) => i18n.t(suffix, { assessmentName, cycleName })).join(', ')
        return `${acc}• ${i18n.t(key)} (${suffixesStr})\n`
      }, '')

      const msg = i18n.t('landing.links.fileCannotBeDeleted', { sectionNames })
      const err = { message: msg }

      Requests.sendErr(res, err, 400)
      return
    }

    Requests.sendErr(res, error)
  }
}
