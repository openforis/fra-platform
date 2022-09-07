import * as path from 'path'
import { Request, Response } from 'express'

import { AssessmentName } from '@meta/assessment'

import { AssessmentController } from '@server/controller/assessment'
import Requests from '@server/utils/requests'

export const getAssessmentFile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const { assessmentName } = req.query as { assessmentName: AssessmentName }

    const assessment = await AssessmentController.getOne({ assessmentName })

    const assessmentFile = await AssessmentController.getFile({ assessment, id: Number(id) })

    if (assessmentFile && assessmentFile.file) {
      res.end(assessmentFile.file, 'binary')
    } else {
      res.sendFile(path.resolve(__dirname, '..', '..', 'static', 'avatar.png'))
    }
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
