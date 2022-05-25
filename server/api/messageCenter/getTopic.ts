import { Request, Response } from 'express'

import { CountryIso } from '@meta/area'
import { AssessmentName } from '@meta/assessment'

import { AssessmentController } from '@server/controller/assessment'
import { MessageCenterController } from '@server/controller/messageCenter'
import Requests from '@server/utils/requests'

import { sendRequestReviewUpdateEvents } from './sendRequestReviewUpdateEvents'

export const getTopic = async (req: Request, res: Response) => {
  try {
    const { countryIso, assessmentName, cycleName, key } = req.query as {
      countryIso: CountryIso
      assessmentName: AssessmentName
      cycleName: string
      key: string
    }
    const user = Requests.getRequestUser(req)

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ name: assessmentName, cycleName })

    const topic = await MessageCenterController.getTopic({
      user,
      countryIso,
      assessment,
      cycle,
      key,
    })

    if (topic) {
      sendRequestReviewUpdateEvents({ countryIso, assessmentName, cycleName, topicKey: key })
    }

    Requests.sendOk(res, topic)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
