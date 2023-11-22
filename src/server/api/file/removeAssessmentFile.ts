import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

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
  } catch (e) {
    if (Array.isArray(e)) {
      const err = {
        params: { sectionNames: e },
        message: 'landing.links.fileCannotBeDeleted',
      }
      Requests.sendErr(res, err, 400)
      return
    }

    Requests.sendErr(res, e)
  }
}
