import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request'
import { MessageTopicStatus, MessageTopicType } from 'meta/messageCenter/messageTopic'
import { Sockets } from 'meta/socket/sockets'

import { MessageCenterController } from 'server/controller/messageCenter'
import { SocketServer } from 'server/service/socket'
import Requests from 'server/utils/requests'

import { sendRequestReviewUpdateEvents } from './sendRequestReviewUpdateEvents'

export const addMessage = async (
  req: CycleDataRequest<{ key: string; type: MessageTopicType }>,
  res: Response
): Promise<void> => {
  try {
    const { assessmentName, countryIso, cycleName, key, sectionName, type } = req.query
    const user = Requests.getUser(req)
    const { message } = req.body

    const { assessment, cycle } = req.context

    const { message: messageCreated, topic } = await MessageCenterController.addMessage({
      message,
      user,
      countryIso,
      assessment,
      cycle,
      sectionName,
      key,
      type,
    })

    SocketServer.emit(Sockets.getTopicMessageAddEvent({ assessment, cycle, topic }), messageCreated)

    if (topic.status === MessageTopicStatus.resolved) {
      const topicUpdated = await MessageCenterController.updateTopicStatus({
        user,
        countryIso,
        assessment,
        cycle,
        sectionName,
        key,
        status: MessageTopicStatus.opened,
      })

      SocketServer.emit(
        Sockets.getTopicStatusEvent({ assessment, cycle, topic: topicUpdated }),
        MessageTopicStatus.opened
      )
    }

    sendRequestReviewUpdateEvents({ countryIso, assessmentName, cycleName, sectionName, topic })

    Requests.sendOk(res)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
