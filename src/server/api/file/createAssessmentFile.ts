import { Request, Response } from 'express'

import { CountryIso } from '@meta/area'
import { AssessmentName } from '@meta/assessment'

import { AssessmentController } from '@server/controller/assessment'
import { FileController } from '@server/controller/file'
import { Requests } from '@server/utils'

export const createAssessmentFile = async (req: Request, res: Response) => {
  try {
    const assessmentFile = req.file
    const fileCountryIso = req.body.fileCountryIso as CountryIso | null
    const assessmentName = req.body.assessmentName as AssessmentName

    const user = Requests.getRequestUser(req)

    const assessment = await AssessmentController.getOne({ assessmentName })

    const updatedAssessmentFile = await FileController.createAssessmentFile({
      assessment,
      assessmentFile,
      countryIso: fileCountryIso || null,
      user,
    })

    Requests.sendOk(res, updatedAssessmentFile)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
