import { Request, Response } from 'express'

import { CountryIso } from '@meta/area'
import { AssessmentName } from '@meta/assessment'

import { AreaController } from '@server/controller/area'
import { AssessmentController } from '@server/controller/assessment'
import { Requests } from '@server/utils'

export const getAssessmentFiles = async (req: Request, res: Response) => {
  try {
    const { assessmentName, countryIso } = req.query as { assessmentName: AssessmentName; countryIso: CountryIso }

    const assessment = await AssessmentController.getOne({ assessmentName })

    const files = await AreaController.getFiles({
      assessment,
      countryIso,
    })

    Requests.sendOk(res, files)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
