import { Request, Response } from 'express'

import { CountryIso } from '@meta/area'

import { AssessmentController } from '@server/controller/assessment'
import { MessageCenterController } from '@server/controller/messageCenter'
import Requests from '@server/utils/requests'

export const getTopic = async (req: Request, res: Response) => {
  try {
    const { countryIso, assessmentName, cycleName, key } = <Record<string, string>>req.query
    const user = Requests.getRequestUser(req)

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ name: assessmentName, cycleName })

    const topic = await MessageCenterController.getTopic({
      user,
      countryIso: countryIso as CountryIso,
      assessment,
      cycle,
      key,
    })

    Requests.sendOk(res, topic)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
