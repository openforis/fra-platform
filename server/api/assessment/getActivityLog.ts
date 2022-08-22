import { Request, Response } from 'express'

import { CountryIso } from '@meta/area'
import { AssessmentName } from '@meta/assessment'

import { AssessmentController } from '@server/controller/assessment'
import Requests from '@server/utils/requests'

export const getActivityLog = async (req: Request, res: Response) => {
  const { assessmentName, countryIso } = req.params as {
    assessmentName: AssessmentName
    countryIso: CountryIso
  }
  try {
    const assessment = await AssessmentController.getOne({ name: assessmentName })

    const sections = await AssessmentController.getActivityLog({ assessment, countryIso })
    Requests.send(res, sections)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
