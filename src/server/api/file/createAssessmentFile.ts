import { Response } from 'express'

import { AssessmentFileBody, CycleRequest } from '@meta/api/request'

import { AssessmentController } from '@server/controller/assessment'
import { FileController } from '@server/controller/file'
import { Requests } from '@server/utils'

export const createAssessmentFile = async (req: CycleRequest<never, AssessmentFileBody>, res: Response) => {
  try {
    const assessmentFile = req.file

    const { assessmentName, countryIso } = req.body

    const user = Requests.getRequestUser(req)

    const assessment = await AssessmentController.getOne({ assessmentName })

    const updatedAssessmentFile = await FileController.createAssessmentFile({
      assessment,
      assessmentFile,
      countryIso: countryIso || null,
      user,
    })

    Requests.sendOk(res, updatedAssessmentFile)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
