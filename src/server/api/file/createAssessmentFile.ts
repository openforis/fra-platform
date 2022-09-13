import { Response } from 'express'

import { CycleRequest } from '@meta/api/request'
import { CountryIso } from '@meta/area'
import { AssessmentName } from '@meta/assessment'

import { AssessmentController } from '@server/controller/assessment'
import { FileController } from '@server/controller/file'
import { Requests } from '@server/utils'

export const createAssessmentFile = async (
  req: CycleRequest<void, { assessmentName: AssessmentName; fileCountryIso: CountryIso | null }>,
  res: Response
) => {
  try {
    const assessmentFile = req.file

    const { assessmentName, fileCountryIso } = req.body

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
