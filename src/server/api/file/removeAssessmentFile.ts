import { Request, Response } from 'express'

import { AssessmentName } from '@meta/assessment'

import { AssessmentController } from '@server/controller/assessment'
import { FileController } from '@server/controller/file'
import Requests from '@server/utils/requests'

export const removeAssessmentFile = async (req: Request, res: Response) => {
  try {
    const { uuid } = req.params

    const { assessmentName } = req.query as { assessmentName: AssessmentName }

    const assessment = await AssessmentController.getOne({ assessmentName })

    await FileController.removeAssessmentFile({ assessment, uuid })

    Requests.sendOk(res)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
