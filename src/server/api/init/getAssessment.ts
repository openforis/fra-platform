import { Response } from 'express'

import { InitRequest } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import { SettingsController } from 'server/controller/settings'
import Requests from 'server/utils/requests'

export const getAssessment = async (req: InitRequest, res: Response) => {
  try {
    const { assessmentName } = req.query

    const settings = await SettingsController.read()
    const props = assessmentName ? { assessmentName } : { id: settings.defaultAssessmentId }
    const assessment = await AssessmentController.getOne({ ...props, metaCache: true })

    Requests.sendOk(res, assessment)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
