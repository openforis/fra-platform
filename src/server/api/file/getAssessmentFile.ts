import { Request, Response } from 'express'

import { AssessmentName } from '@meta/assessment'

import { AssessmentController } from '@server/controller/assessment'
import { FileController } from '@server/controller/file'
import Requests from '@server/utils/requests'

export const getAssessmentFile = async (req: Request, res: Response) => {
  try {
    const { uuid } = req.params

    const { assessmentName } = req.query as { assessmentName: AssessmentName }

    const assessment = await AssessmentController.getOne({ assessmentName })

    const assessmentFile = await FileController.getAssessmentFile({ assessment, uuid })

    if (assessmentFile && assessmentFile.file) {
      res.setHeader('Content-Disposition', `attachment; filename=${assessmentFile.fileName}`)
      res.end(assessmentFile.file, 'binary')
    } else {
      Requests.sendErr(res)
    }
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
