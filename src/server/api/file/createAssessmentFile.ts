import { Response } from 'express'

import { AssessmentFileBody, CycleRequest } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import { FileController } from 'server/controller/file'
import { Requests } from 'server/utils'

export const createAssessmentFile = async (req: CycleRequest<never, AssessmentFileBody>, res: Response) => {
  try {
    const assessmentFile = req.file

    const { assessmentName, fileCountryIso } = req.body

    const user = Requests.getUser(req)

    const assessment = await AssessmentController.getOne({ assessmentName })

    const updatedAssessmentFile = await FileController.createAssessmentFile({
      assessment,
      assessmentFile,
      countryIso: fileCountryIso && null,
      user,
    })

    Requests.sendOk(res, updatedAssessmentFile)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
