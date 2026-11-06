import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request/cycleData/cycleData'

import { MessageCenterController } from 'server/controller/messageCenter'
import Requests from 'server/utils/requests'

import { sendRequestReviewUpdateEvents } from './sendRequestReviewUpdateEvents'

export const getTopic = async (req: CycleDataRequest<{ key: string }>, res: Response): Promise<void> => {
  try {
    const user = Requests.getUser(req)
    const { assessment, cycle } = req.context
    const { countryIso, key, sectionName } = req.query

    const topic = await MessageCenterController.getTopic({
      user,
      countryIso,
      assessment,
      cycle,
      key,
    })

    if (topic) {
      sendRequestReviewUpdateEvents({ assessment, cycle, sectionName, topic })
    }

    Requests.sendOk(res, topic)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
