import { Request, Response } from 'express'

import { CountryIso } from '@meta/area'
import { AssessmentName } from '@meta/assessment'
import { MessageTopicStatus, MessageTopicType } from '@meta/messageCenter'
import { Sockets } from '@meta/socket/sockets'

import { AssessmentController } from '@server/controller/assessment'
import { MessageCenterController } from '@server/controller/messageCenter'
import { SocketServer } from '@server/service/socket'
import Requests from '@server/utils/requests'

import { sendRequestReviewUpdateEvents } from './sendRequestReviewUpdateEvents'

export const addMessage = async (req: Request, res: Response) => {
  try {
    const { countryIso, assessmentName, cycleName, key, type } = req.query as {
      countryIso: CountryIso
      assessmentName: AssessmentName
      cycleName: string
      key: string
      type: MessageTopicType
    }
    const user = Requests.getRequestUser(req)
    const { message } = req.body

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ name: assessmentName, cycleName })

    const { topic, message: messageCreated } = await MessageCenterController.addMessage({
      message,
      user,
      countryIso,
      assessment,
      cycle,
      key,
      type,
    })

    SocketServer.emit(Sockets.getTopicMessageAddEvent({ assessment, cycle, topic }), messageCreated)

    if (topic.status === MessageTopicStatus.resolved) {
      const { topic: topicUpdated } = await MessageCenterController.updateTopicStatus({
        user,
        countryIso,
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

    sendRequestReviewUpdateEvents({ countryIso, assessmentName, cycleName, topicKey: key })

    Requests.sendOk(res)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
