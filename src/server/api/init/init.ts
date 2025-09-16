import { Request, Response } from 'express'

import { AssessmentController } from 'server/controller/assessment'
import Requests from 'server/utils/requests'

export const init = async (req: Request, res: Response): Promise<void> => {
  try {
    const assessments = await AssessmentController.getAll({})
    const user = Requests.getUser(req)

    Requests.sendOk(res, { assessments, user })
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
