import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import { FileController } from 'server/controller/file'
import { Requests } from 'server/utils'

export const getAssessmentFiles = async (req: CycleRequest, res: Response) => {
  try {
    const { assessmentName, countryIso } = req.query

    const assessment = await AssessmentController.getOne({ assessmentName })

    const files = await FileController.getAssessmentFiles({ assessment, countryIso })

    Requests.sendOk(res, files)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
