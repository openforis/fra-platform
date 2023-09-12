import { Request, Response } from 'express'

import { AssessmentController } from 'server/controller/assessment'
import { SettingsController } from 'server/controller/settings'
import Requests from 'server/utils/requests'

export const init = async (req: Request, res: Response) => {
  try {
    const [assessments, settings] = await Promise.all([AssessmentController.getAll({}), SettingsController.read()])
    const user = Requests.getUser(req)

    Requests.sendOk(res, { assessments, settings, user })
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
