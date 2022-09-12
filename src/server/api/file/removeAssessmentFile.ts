import { Response } from 'express'

import { CycleRequest } from '@meta/api/request'

import { AssessmentController } from '@server/controller/assessment'
import { FileController } from '@server/controller/file'
import Requests from '@server/utils/requests'

export const removeAssessmentFile = async (req: CycleRequest, res: Response) => {
  try {
    const { uuid } = req.params

    const { assessmentName } = req.query

    const assessment = await AssessmentController.getOne({ assessmentName })

    await FileController.removeAssessmentFile({ assessment, uuid })

    Requests.sendOk(res)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
