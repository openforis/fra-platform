import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request/cycleData/cycleData'
import { Sockets } from 'meta/socket/sockets'

import { MessageCenterController } from 'server/controller/messageCenter'
import { SocketServer } from 'server/service/socket'
import Requests from 'server/utils/requests'

import { sendRequestReviewUpdateEvents } from './sendRequestReviewUpdateEvents'

export const markMessageDeleted = async (
  req: CycleDataRequest<{
    topicKey: string
    messageId: string
  }>,
  res: Response
): Promise<void> => {
  try {
    const user = Requests.getUser(req)
    const { assessment, cycle } = req.context
    const { countryIso, messageId, sectionName, topicKey } = req.query

    await MessageCenterController.markMessageDeleted({
      user,
      countryIso,
      assessment,
      cycle,
      sectionName,
      id: Number(messageId),
    })

    const topic = await MessageCenterController.getTopic({
      user,
      assessment,
      cycle,
      countryIso,
      includeMessages: false,
      key: topicKey,
    })
    const messageDeleteEvent = Sockets.getTopicMessageDeleteEvent({ assessment, cycle, topic })
    SocketServer.emitToMessageTopicRooms({ cycle, eventName: messageDeleteEvent, topic }, { topicKey, messageId })

    sendRequestReviewUpdateEvents({ assessment, cycle, sectionName, topic })

    Requests.sendOk(res)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
