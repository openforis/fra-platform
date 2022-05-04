import { Request, Response } from 'express'

import { CountryIso } from '@meta/area'
import { MessageTopicStatus } from '@meta/messageCenter'
import { Sockets } from '@meta/socket/sockets'

import { AssessmentController } from '@server/controller/assessment'
import { MessageCenterController } from '@server/controller/messageCenter'
import { SocketServer } from '@server/service/socket'
import Requests from '@server/utils/requests'

export const resolveTopic = async (req: Request, res: Response) => {
  try {
    const { countryIso, assessmentName, cycleName, key } = <Record<string, string>>req.query
    const user = Requests.getRequestUser(req)

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({
      name: assessmentName,
      cycleName,
    })

    const { topic: topicUpdated } = await MessageCenterController.updateTopicStatus({
      user,
      countryIso: countryIso as CountryIso,
      assessment,
      cycle,
      key,
      status: MessageTopicStatus.resolved,
    })

    SocketServer.emit(
      Sockets.getTopicStatusEvent({ assessment, cycle, topic: topicUpdated }),
      MessageTopicStatus.resolved
    )

    const { topic, message: messageCreated } = await MessageCenterController.addMessage({
      message: 'marked as resolved',
      user,
      countryIso: countryIso as CountryIso,
      assessment,
      cycle,
      key,
      type: topicUpdated.type,
    })

    SocketServer.emit(Sockets.getTopicMessageEvent({ assessment, cycle, topic }), messageCreated)

    Requests.sendOk(res)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
