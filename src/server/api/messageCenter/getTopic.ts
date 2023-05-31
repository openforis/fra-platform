import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import { MessageCenterController } from 'server/controller/messageCenter'
import Requests from 'server/utils/requests'

import { sendRequestReviewUpdateEvents } from './sendRequestReviewUpdateEvents'

export const getTopic = async (req: CycleDataRequest<{ key: string }>, res: Response) => {
  try {
    const { countryIso, assessmentName, cycleName, key, sectionName } = req.query
    const user = Requests.getUser(req)

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const topic = await MessageCenterController.getTopic({
      user,
      countryIso,
      assessment,
      cycle,
      key,
    })

    if (topic) {
      sendRequestReviewUpdateEvents({ topic, countryIso, assessmentName, cycleName, sectionName })
    }

    Requests.sendOk(res, topic)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
