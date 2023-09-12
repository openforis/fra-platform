import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import { FileController } from 'server/controller/file'
import Requests from 'server/utils/requests'
import { Responses } from 'server/utils/responses'

export const getAssessmentFile = async (req: CycleRequest, res: Response) => {
  try {
    const { uuid } = req.params

    const { assessmentName } = req.query

    const assessment = await AssessmentController.getOne({ assessmentName })
    const assessmentFile = await FileController.getAssessmentFile({ assessment, uuid })

    Responses.sendAssessmentFile(res, assessmentFile)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
