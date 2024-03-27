import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import { Requests } from 'server/utils'

export const getLastUpdatedTimestamp = async (req: CycleRequest, res: Response) => {
  try {
    const { assessmentName, cycleName, countryIso } = req.query

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const countrySummary = await CycleDataController.getCountrySummary({ assessment, countryIso, cycle })
    const timestamp = { time: countrySummary?.lastEditOdpData }

    Requests.send(res, timestamp)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
