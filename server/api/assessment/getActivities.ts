import { Request, Response } from 'express'

import { CountryIso } from '@meta/area'
import { AssessmentName } from '@meta/assessment'

import { AssessmentController } from '@server/controller/assessment'
import { CycleDataController } from '@server/controller/cycleData'
import Requests from '@server/utils/requests'

export const getActivities = async (req: Request, res: Response) => {
  const { countryIso } = req.params as { countryIso: CountryIso }

  const { assessmentName } = req.query as { assessmentName: AssessmentName }

  try {
    const assessment = await AssessmentController.getOne({ name: assessmentName })

    const activityLog = await CycleDataController.getActivities({ assessment, countryIso })

    Requests.send(res, activityLog)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
