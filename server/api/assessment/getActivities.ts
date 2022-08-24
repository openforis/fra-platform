import { Request, Response } from 'express'

import { CountryIso } from '@meta/area'
import { AssessmentName } from '@meta/assessment'

import { AssessmentController } from '@server/controller/assessment'
import { CycleDataController } from '@server/controller/cycleData'
import Requests from '@server/utils/requests'

export const getActivities = async (req: Request, res: Response) => {
  const { countryIso, assessmentName, cycleName } = req.query as {
    countryIso: CountryIso
    assessmentName: AssessmentName
    cycleName: string
  }

  try {
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const activityLog = await CycleDataController.getActivities({ countryIso, assessment, cycleUuid: cycle.uuid })

    Requests.send(res, activityLog)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
