import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'
import { ActivityLogMessage } from 'meta/assessment'

import { ActivityLogController } from 'server/controller/activityLog'
import { AssessmentController } from 'server/controller/assessment'
import { Requests } from 'server/utils'

export const getLastUpdatedTimestamp = async (req: CycleRequest, res: Response) => {
  try {
    const { assessmentName, cycleName, countryIso } = req.query

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const timestamp = await ActivityLogController.getLastUpdatedTimestamp({
      assessment,
      cycle,
      countryIso,
      messages: [
        ActivityLogMessage.originalDataPointCreate,
        ActivityLogMessage.originalDataPointRemove,
        ActivityLogMessage.originalDataPointUpdate,
      ],
    })

    Requests.send(res, timestamp)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
