import { Request, Response } from 'express'

import { CountryIso } from '@meta/area'
import { MessageTopicType } from '@meta/messageCenter'
import { Sockets } from '@meta/socket/sockets'

import { AssessmentController } from '@server/controller/assessment'
import { MessageCenterController } from '@server/controller/messageCenter'
import { SocketServer } from '@server/service/socket'
import Requests from '@server/utils/requests'

export const addMessage = async (req: Request, res: Response) => {
  try {
    const { countryIso, assessmentName, cycleName, key, type } = <Record<string, string>>req.query
    const { message } = req.body
    const user = Requests.getRequestUser(req)

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({
      name: assessmentName,
      cycleName,
    })

    const { topic, message: messageCreated } = await MessageCenterController.addMessage({
      message,
      user,
      countryIso: countryIso as CountryIso,
      assessment,
      cycle,
      key,
      type: type as MessageTopicType,
    })

    SocketServer.emit(Sockets.getTopicEvent({ assessment, cycle, topic }), messageCreated)

    Requests.sendOk(res)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
