import { Request, Response } from 'express'

import { AssessmentName } from '@meta/assessment'

import { AssessmentController } from '@server/controller/assessment'
import { FileController } from '@server/controller/file'
import Requests from '@server/utils/requests'

export const getAssessmentFile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const { assessmentName } = req.query as { assessmentName: AssessmentName }

    const assessment = await AssessmentController.getOne({ assessmentName })

    const assessmentFile = await FileController.getAssessmentFile({ assessment, id: Number(id) })

    if (assessmentFile && assessmentFile.file) {
      res.end(assessmentFile.file, 'binary')
    } else {
      Requests.sendErr(res)
    }
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
