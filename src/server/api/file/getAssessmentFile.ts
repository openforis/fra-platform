import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import { FileController } from 'server/controller/file'
import Requests from 'server/utils/requests'

export const getAssessmentFile = async (req: CycleRequest, res: Response) => {
  try {
    const { uuid } = req.params

    const { assessmentName } = req.query

    const assessment = await AssessmentController.getOne({ assessmentName })

    const assessmentFile = await FileController.getAssessmentFile({ assessment, uuid })

    if (assessmentFile && assessmentFile.file) {
      const fileName = encodeURIComponent(assessmentFile.fileName)

      res.setHeader('Content-Disposition', `attachment; filename*=utf-8''${fileName}`)

      res.end(assessmentFile.file, 'binary')
    } else {
      Requests.send404(res)
    }
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
