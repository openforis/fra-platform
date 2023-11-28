import { Request, Response } from 'express'

import { AssessmentName } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { FileController } from 'server/controller/file'
import { Requests } from 'server/utils'
import { Responses } from 'server/utils/responses'

type GetPrivateFileRequest = Request<never, never, never, { assessmentName: AssessmentName; fileName: string }>

export const getHiddenFile = async (req: GetPrivateFileRequest, res: Response) => {
  try {
    const { assessmentName, fileName } = req.query

    const assessment = await AssessmentController.getOne({ assessmentName })
    const assessmentFile = await FileController.getHiddenAssessmentFile({ assessment, fileName })

    Responses.sendAssessmentFile(res, assessmentFile)
  } catch (err) {
    Requests.sendErr(res, err)
  }
}
