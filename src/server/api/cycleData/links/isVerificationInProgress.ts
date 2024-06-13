import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

type Request = CycleRequest

export const isVerificationInProgress = async (req: Request, res: Response) => {
  try {
    const { assessmentName, cycleName } = req.query

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const activeJobs = await CycleDataController.Links.getActiveVerifyJobs({ assessment, cycle })
    const isVerificationInProgress = activeJobs.length > 0

    Requests.send(res, isVerificationInProgress)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
