import { Request, Response } from 'express'

import { CountryIso } from '@meta/area'
import { AssessmentName } from '@meta/assessment'

import { AssessmentController } from '@server/controller/assessment'
import { FileController } from '@server/controller/file'
import { Requests } from '@server/utils'

export const getAssessmentFiles = async (req: Request, res: Response) => {
  try {
    const { assessmentName, countryIso } = req.query as { assessmentName: AssessmentName; countryIso: CountryIso }

    const assessment = await AssessmentController.getOne({ assessmentName })

    const files = await FileController.getAssessmentFiles({
      assessment,
      countryIso,
    })

    Requests.sendOk(res, files)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
