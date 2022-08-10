import { Request, Response } from 'express'

import { CountryIso } from '@meta/area'
import { AssessmentName } from '@meta/assessment'
import { MessageTopicType } from '@meta/messageCenter'

import { AssessmentController } from '@server/controller/assessment'
import { MessageCenterController } from '@server/controller/messageCenter'
import Requests from '@server/utils/requests'

export const getUnreadMessages = async (req: Request, res: Response) => {
  try {
    const { countryIso, assessmentName, cycleName, type } = req.query as {
      countryIso: CountryIso
      assessmentName: AssessmentName
      cycleName: string
      type: MessageTopicType
    }
    const user = Requests.getRequestUser(req)

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ name: assessmentName, cycleName })

    const data = await MessageCenterController.getUnreadMessages({ countryIso, assessment, cycle, type, user })

    const unreadMessages = data.reduce(
      (acc, item) => ({ ...acc, [item.key]: item.unreadMessages }),
      {} as Record<string, number>
    )

    Requests.sendOk(res, unreadMessages)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
