import { Request, Response } from 'express'

import { CountryIso } from '@meta/area'
import { MessageTopicStatus, MessageTopicType } from '@meta/messageCenter'
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

    SocketServer.emit(Sockets.getTopicMessageEvent({ assessment, cycle, topic }), messageCreated)

    SocketServer.emit(Sockets.updateReviewSummaryEvent({ countryIso: countryIso as CountryIso, assessment, cycle }))

    if (topic.status === MessageTopicStatus.resolved) {
      const { topic: topicUpdated } = await MessageCenterController.updateTopicStatus({
        user,
        countryIso: countryIso as CountryIso,
        assessment,
        cycle,
        key,
        status: MessageTopicStatus.opened,
      })

      SocketServer.emit(
        Sockets.getTopicStatusEvent({ assessment, cycle, topic: topicUpdated }),
        MessageTopicStatus.opened
      )
    }

    Requests.sendOk(res)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
